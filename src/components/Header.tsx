import Image from "next/image";

const Header = () => {
  const currentDate = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2.5 sm:px-5 sm:py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="দেশবার্তা"
            width={42}
            height={42}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />

          <div>
            <h1 className="text-lg font-bold leading-tight text-gray-900 sm:text-xl">
              দেশবার্তা
            </h1>

            <p className="text-[9px] text-gray-500 sm:text-[10px]">
              {currentDate}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button className="rounded-full px-2.5 py-1.5 text-[11px] font-medium text-gray-700 transition hover:bg-gray-100 sm:px-3 sm:text-xs">
            লগইন
          </button>

          <button className="rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-red-700 sm:px-4 sm:text-xs">
            রেজিস্টার
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;