import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-700 text-sm font-bold text-white">
                দে
              </div>

              <h2 className="text-xl font-bold text-white">দেশবার্তা</h2>
            </div>

            <p className="max-w-xs text-sm leading-6 text-gray-400">
              দেশের ও বিশ্বের সর্বশেষ খবর, নির্ভরযোগ্য তথ্য এবং গুরুত্বপূর্ণ
              সংবাদ এক জায়গায়।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              গুরুত্বপূর্ণ লিংক
            </h3>

            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition hover:text-white">
                  হোম
                </Link>
              </li>
              <li>
                <a href="/politics" className="transition hover:text-white">
                  রাজনীতি
                </a>
              </li>
              <li>
                <a href="/world" className="transition hover:text-white">
                  বিশ্ব
                </a>
              </li>
              <li>
                <a href="/sports" className="transition hover:text-white">
                  খেলা
                </a>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              আরও জানুন
            </h3>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/technology" className="transition hover:text-white">
                  প্রযুক্তি
                </a>
              </li>
              <li>
                <a href="/health" className="transition hover:text-white">
                  স্বাস্থ্য
                </a>
              </li>
              <li>
                <a href="/economy" className="transition hover:text-white">
                  অর্থনীতি
                </a>
              </li>
              <li>
                <a href="/video" className="transition hover:text-white">
                  দেখুন
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              যোগাযোগ
            </h3>

            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>ই-মেইল: info@deshbarta.com</li>
              <li>ঢাকা, বাংলাদেশ</li>
            </ul>

            <div className="mt-4 flex gap-2">
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 text-xs transition hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 text-xs transition hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                X
              </a>

              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 text-xs transition hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                ▶
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-3 border-t border-gray-800 pt-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} দেশবার্তা। সর্বস্বত্ব সংরক্ষিত।</p>

          <div className="flex gap-4">
            <a href="#" className="transition hover:text-gray-300">
              গোপনীয়তা নীতি
            </a>

            <a href="#" className="transition hover:text-gray-300">
              ব্যবহারের শর্ত
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;