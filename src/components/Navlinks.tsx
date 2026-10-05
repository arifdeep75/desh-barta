type Category = {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
};

const NavLinks = async () => {
  const response = await fetch(
    "https://news-api-v2.vercel.app/api/categories",
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = await response.json();

  const categories: Category[] = result.data.filter(
    (category: Category) => category.scrapable
  );

  return (
    <nav className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl justify-center gap-6 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {categories.map((category) => (
          <a
            key={category.slug}
            href={category.slug}
            className="shrink-0 text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-red-600"
          >
            {category.title}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;