import Image from "next/image";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo.webp"
            alt="দেশবার্তা"
            width={50}
            height={50}
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
          />

          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              দেশবার্তা
            </h1>

            <p className="text-[10px] text-gray-500 sm:text-xs">
              সত্যের সাথে প্রতিদিন
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="rounded-full px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100 sm:px-4 sm:text-sm">
            লগইন
          </button>

          <button className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 sm:px-5 sm:text-sm">
            রেজিস্টার
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;