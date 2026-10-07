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
  rank?: number;
  firstPublished: string | null;
  lastPublished: string | null;
};

type NewsSection = {
  title: string;
  articles: Article[];
};


function NewsImage({
  article,
  className,
}: {
  article: Article;
  className: string;
}) {
  if (!article.imageUrl) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100 text-xs text-gray-400`}
      >
        ছবি পাওয়া যায়নি
      </div>
    );
  }

  return (
    <Image
      src={article.imageUrl}
      alt={article.imageAlt || article.title}
      width={800}
      height={500}
      className={className}
      unoptimized
    />
  );
}

function NewsCard({
  article,
  category,
}: {
  article: Article;
  category: string;
}) {
  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white">
      <a href={`/article/${article.id}`}>
        <NewsImage
          article={article}
          className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-40"
        />

        <div className="p-3">
          <p className="mb-1.5 text-xs font-semibold text-red-700">
            {category}
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
              {new Date(article.firstPublished).toLocaleDateString("bn-BD", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </a>
    </article>
  );
}

function MostRead({ articles }: { articles: Article[] }) {
  return (
    <aside className="rounded-lg border border-gray-200 bg-white p-4 lg:sticky lg:top-4">
      <h2 className="mb-2 border-b border-gray-200 pb-3 text-xl font-bold text-gray-900">
        সর্বাধিক পঠিত
      </h2>

      <div>
        {articles.map((article, index) => (
          <a
            key={article.id}
            href={`/article/${article.id}`}
            className="flex gap-3 border-b border-gray-100 py-3 last:border-b-0"
          >
            <span className="min-w-4 text-xl font-medium text-red-600">
              {article.rank ?? index + 1}
            </span>

            <h3 className="text-sm font-medium leading-6 text-gray-900 transition-colors hover:text-red-700">
              {article.title}
            </h3>
          </a>
        ))}
      </div>
    </aside>
  );
}

const HomeNews = async () => {
  const [sectionsResponse, mostReadResponse] = await Promise.all([
    fetch("https://news-api-v2.vercel.app/api/news/sections", {
      next: { revalidate: 300 },
    }),

    fetch("https://news-api-v2.vercel.app/api/news/most-read", {
      next: { revalidate: 300 },
    }),
  ]);

  if (!sectionsResponse.ok || !mostReadResponse.ok) {
    throw new Error("Failed to fetch homepage news");
  }

  const sectionsResult = await sectionsResponse.json();
  const mostReadResult = await mostReadResponse.json();

  const sections: NewsSection[] = sectionsResult.data ?? [];
  const mostRead: Article[] = mostReadResult.data ?? [];

  // ================= MAIN NEWS =================

  const mainSection = sections.find(
    (section) => section.title === "প্রধান খবর"
  );

  const mainArticles = mainSection?.articles ?? [];

  const mainNews = mainArticles[0];

  const sideNews = mainArticles.slice(1);

  // ================= FILTER UNWANTED CONTENT =================

  const excludedTitles = [
    "প্রধান খবর",
    "সামাজিক মাধ্যমে বিবিসি বাংলা",
  ];

  const promoKeywords = [
    "বিবিসি বাংলা এখন হোয়াটসঅ্যাপে",
    "বিবিসি বাংলা এখন ইন্সটাগ্রামে",
    "ফলো করুন বিবিসি বাংলার হোয়াটসঅ্যাপ",
    "ফলো করুন বিবিসি বাংলার ইন্সটাগ্রাম",
  ];

  const otherSections = sections
    .filter((section) => !excludedTitles.includes(section.title))
    .map((section) => ({
      ...section,

      articles: section.articles.filter((article) => {
        return !promoKeywords.some((keyword) =>
          article.title.includes(keyword)
        );
      }),
    }))
    .filter((section) => section.articles.length > 0);

  return (
    <main className="mx-auto max-w-6xl px-3 py-4 sm:px-5 lg:px-6">
      <div className="grid items-start gap-5 lg:grid-cols-12">

        {/* ================= LEFT CONTENT ================= */}

        <div className="lg:col-span-8">

          {/* ================= MAIN NEWS ================= */}

          <section className="grid overflow-hidden rounded-lg border border-gray-200 bg-white lg:grid-cols-2">

            {/* BIG MAIN NEWS */}

            {mainNews && (
              <article className="border-b border-gray-200 lg:border-b-0 lg:border-r">
                <a href={`/article/${mainNews.id}`}>
                  <NewsImage
                    article={mainNews}
                    className="h-52 w-full object-cover sm:h-56"
                  />

                  <div className="p-4">
                    <p className="mb-1.5 text-xs font-semibold text-red-700">
                      প্রধান খবর
                    </p>

                    <h1 className="text-lg font-bold leading-7 text-gray-900 transition-colors hover:text-red-700 sm:text-xl">
                      {mainNews.title}
                    </h1>

                    {mainNews.description && (
                      <p className="mt-2 line-clamp-3 text-xs leading-6 text-gray-600">
                        {mainNews.description}
                      </p>
                    )}
                  </div>
                </a>
              </article>
            )}

            {/* OTHER MAIN NEWS */}

            <div>
              {sideNews.map((article, index) => (
                <a
                  key={article.id}
                  href={`/article/${article.id}`}
                  className={`block p-3.5 transition-colors hover:bg-gray-50 ${
                    index !== sideNews.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <p className="mb-1.5 text-xs font-semibold text-red-700">
                    {article.isLive ? "লাইভ" : "প্রধান খবর"}
                  </p>

                  <h2 className="text-sm font-semibold leading-6 text-gray-900 transition-colors hover:text-red-700 sm:text-base">
                    {article.title}
                  </h2>
                </a>
              ))}
            </div>
          </section>

          {/* ================= OTHER SECTIONS ================= */}

          <div className="mt-6 space-y-7">
            {otherSections.map((section) => (
              <section key={section.title}>

                {/* SECTION TITLE */}

                <div className="mb-3 flex items-center gap-3">
                  <h2 className="shrink-0 text-lg font-bold text-gray-900 sm:text-xl">
                    {section.title}
                  </h2>

                  <div className="h-0.5 flex-1 bg-red-700" />
                </div>

                {/* NEWS CARDS */}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.articles.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      category={section.title}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* ================= MOST READ ================= */}

        <div className="lg:col-span-4">
          <MostRead articles={mostRead} />
        </div>
      </div>
    </main>
  );
};

export default HomeNews;