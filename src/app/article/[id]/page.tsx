import Image from "next/image";
import { notFound } from "next/navigation";

type BodyBlock =
  | {
      type: "image";
      url: string;
      width: number;
      height: number;
      caption?: string | null;
      altText?: string | null;
      copyrightHolder?: string | null;
    }
  | {
      type: "text";
      text: string;
    }
  | {
      type: "subheading";
      text: string;
    };

type Article = {
  id: string;
  title: string;
  description:
    | {
        blocks?: {
          type: string;
          model?: {
            blocks?: {
              type: string;
              model?: {
                text?: string;
              };
            }[];
          };
        }[];
      }
    | string
    | null;
  imageUrl: string | null;
  imageAlt: string | null;
  category: string;
  body?: BodyBlock[];
  firstPublished: string | null;
  lastPublished?: string | null;
  byline?: {
    name: string;
    role: string | null;
  }[];
  topics?: {
    id: string;
    name: string;
  }[];
  tags?: string[];
  source?: string;
};

function getDescriptionText(
  description: Article["description"]
): string | null {
  if (typeof description === "string") {
    return description;
  }

  if (!description?.blocks) {
    return null;
  }

  for (const block of description.blocks) {
    const paragraphBlocks = block.model?.blocks ?? [];

    for (const paragraph of paragraphBlocks) {
      if (paragraph.model?.text) {
        return paragraph.model.text;
      }
    }
  }

  return null;
}

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${id}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const news: Article | undefined = data.data;

  if (!news) {
    notFound();
  }

  const descriptionText = getDescriptionText(news.description);

  return (
    <main className="mx-auto max-w-4xl px-3 py-6 sm:px-5">
      <article>
        {/* Category */}
        <p className="mb-3 text-sm font-semibold text-red-600">
          {news.category}
        </p>

        {/* Title */}
        <h1 className="text-2xl font-bold leading-9 text-gray-900 sm:text-4xl">
          {news.title}
        </h1>

        {/* Description */}
        {descriptionText && (
          <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
            {descriptionText}
          </p>
        )}

        {/* Published date */}
        {news.firstPublished && (
          <p className="mt-4 border-b border-gray-200 pb-4 text-xs text-gray-500">
            {new Date(news.firstPublished).toLocaleDateString("bn-BD", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}

        {/* Author */}
        {news.byline && news.byline.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-semibold">লেখক: </span>

            {news.byline.map((person, index) => (
              <span key={index}>
                {person.name}
                {index !== news.byline!.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        )}



        {/* Article body */}
        <div className="mt-8">
          {news.body?.map((block, index) => {
            if (block.type === "text") {
              return (
                <p
                  key={index}
                  className="mb-5 whitespace-pre-line text-base leading-8 text-gray-800 sm:text-lg"
                >
                  {block.text}
                </p>
              );
            }

            if (block.type === "subheading") {
              return (
                <h2
                  key={index}
                  className="mb-4 mt-9 text-xl font-bold leading-8 text-gray-900 sm:text-2xl"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "image") {
              return (
                <figure key={index} className="my-8">
                  <Image
                    src={block.url}
                    alt={block.altText || news.title}
                    width={block.width}
                    height={block.height}
                    className="h-auto w-full rounded-lg object-cover"
                    unoptimized
                  />

                  {block.caption && (
                    <figcaption className="mt-2 text-xs leading-5 text-gray-500">
                      {block.caption}
                    </figcaption>
                  )}

                  {block.copyrightHolder && (
                    <p className="mt-1 text-[11px] text-gray-400">
                      ছবি: {block.copyrightHolder}
                    </p>
                  )}
                </figure>
              );
            }

            return null;
          })}
        </div>

        {/* Topics */}
        {news.topics && news.topics.length > 0 && (
          <div className="mt-8 border-t border-gray-200 pt-5">
            <h3 className="mb-3 text-sm font-bold text-gray-800">
              বিষয়
            </h3>

            <div className="flex flex-wrap gap-2">
              {news.topics.map((topic) => (
                <span
                  key={topic.id}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                >
                  {topic.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {news.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Source */}
        {news.source && (
          <p className="mt-6 border-t border-gray-200 pt-4 text-xs text-gray-400">
            সূত্র: {news.source}
          </p>
        )}
      </article>
    </main>
  );
};

export default NewsDetails;