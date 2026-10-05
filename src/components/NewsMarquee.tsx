type News = {
  id: string;
  title: string;
  link: string;
  isLive: boolean;
};

const NewsMarquee = async () => {
  const response = await fetch(
    "https://news-api-v2.vercel.app/api/news?limit=10",
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch latest news");
  }

  const result = await response.json();

  const news: News[] = result.data;

  return (
    <section className="border-b border-[#8B0000] bg-[#A50000] text-white">
      <div className="mx-auto flex max-w-7xl overflow-hidden">
        {/* Label */}
        <div className="z-10 shrink-0 bg-[#780000] px-3 py-2.5 text-xs font-bold sm:px-4 sm:py-2.5 sm:text-sm">
          সর্বশেষ
        </div>

        {/* Scrolling News */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee items-center py-2.5">
            {[...news, ...news].map((item, index) => (
              <a
                key={`${item.id}-${index}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center text-xs font-medium transition-colors hover:text-yellow-200 sm:text-sm"
              >
                {item.isLive && (
                  <span className="mr-2 font-bold text-yellow-300">
                    লাইভ
                  </span>
                )}

                <span>{item.title}</span>

                {/* Separator */}
                <span className="mx-6 text-[#E88A8A] sm:mx-8">
                  ●
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsMarquee;