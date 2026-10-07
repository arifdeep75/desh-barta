import Image from "next/image";

type Article = {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string | null;
  imageAlt: string | null;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
};

type CategoryResponse = {
  success: boolean;
  count: number;
  cachedAt: string;
  slug: string;
  topicId: string | null;
  title: string;
  page: number;
  pageCount: number;
  data: Article[];
};

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const response = await fetch(
    `https://news-api-v2.vercel.app/api/category/${slug}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category news");
  }

  const result: CategoryResponse = await response.json();

  const featuredNews = result.data[0];
  const otherNews = result.data.slice(1);

  return (
    <main className="mx-auto max-w-6xl px-3 py-5 sm:px-5 lg:px-6">
      {/* Category Title */}
      <div className="mb-5 flex items-center gap-3">
        <h1 className="shrink-0 text-xl font-bold text-gray-900 sm:text-2xl">
          {result.title}
        </h1>

        <div className="h-0.5 flex-1 bg-red-700" />
      </div>

      {/* Featured News */}
      {featuredNews && (
        <section className="mb-7 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <a
  href={`/article/${featuredNews.id}`}
  className="group grid lg:grid-cols-2"
>
            {/* Image */}
            {featuredNews.imageUrl ? (
              <Image
                src={featuredNews.imageUrl}
                alt={featuredNews.imageAlt || featuredNews.title}
                width={800}
                height={500}
                className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-64 lg:h-full lg:min-h-72"
                unoptimized
              />
            ) : (
              <div className="flex h-56 items-center justify-center bg-gray-100 text-sm text-gray-400 lg:min-h-72">
                ছবি পাওয়া যায়নি
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col justify-center p-5 sm:p-6">
              <p className="mb-2 text-xs font-semibold text-red-700">
                {result.title}
              </p>

              <h2 className="text-xl font-bold leading-8 text-gray-900 transition-colors group-hover:text-red-700 sm:text-2xl">
                {featuredNews.title}
              </h2>

              {featuredNews.description && (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {featuredNews.description}
                </p>
              )}

              {featuredNews.firstPublished && (
                <p className="mt-4 text-xs text-gray-400">
                  {new Date(
                    featuredNews.firstPublished
                  ).toLocaleDateString("bn-BD", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </a>
        </section>
      )}

      {/* Other News */}
      <section>
        <div className="mb-3 flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            সর্বশেষ খবর
          </h2>

          <div className="h-0.5 flex-1 bg-gray-200" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherNews.map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <a href={`/article/${article.id}`}>
                {article.imageUrl ? (
                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt || article.title}
                    width={800}
                    height={500}
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-gray-100 text-xs text-gray-400">
                    ছবি পাওয়া যায়নি
                  </div>
                )}

                <div className="p-3">
                  <p className="mb-1.5 text-xs font-semibold text-red-700">
                    {result.title}
                  </p>

                  <h3 className="text-base font-bold leading-6 text-gray-900 transition-colors group-hover:text-red-700">
                    {article.title}
                  </h3>

                  {article.description && (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-gray-600">
                      {article.description}
                    </p>
                  )}

                  {article.firstPublished && (
                    <p className="mt-2 text-[11px] text-gray-400">
                      {new Date(
                        article.firstPublished
                      ).toLocaleDateString("bn-BD", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;