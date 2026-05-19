import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";

const LOGO = "https://cdn.poehali.dev/files/61189b8c-3707-4976-99de-7498b29f1bce.png";

export default function Rules() {
  return (
    <div className="min-h-screen bg-[#f8fafb] dark:bg-[#0f1318] text-gray-900 dark:text-gray-100 pb-16 md:pb-0">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f1318]/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center shrink-0">
              <img src={LOGO} alt="WayWorlds" className="w-8 h-8 sm:w-12 sm:h-12 object-contain" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-base sm:text-lg tracking-tight">WayWorlds</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Возможности</Link>
            <Link to="/donate" className="hover:text-gray-900 dark:hover:text-white transition-colors">Донат</Link>
            <Link to="/rules" className="font-medium transition-colors" style={{ color: "#25c666" }}>Правила</Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://t.me/wayworlds"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              <Icon name="Send" size={14} />
              <span className="hidden sm:inline">Telegram</span>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-10 text-center">
        <div className="badge-green inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 sm:mb-6">
          <Icon name="BookOpen" size={12} style={{ color: "#25c666" }} />
          <span className="text-xs font-medium" style={{ color: "#4a7a48" }}>Обязательно к прочтению</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Правила <span style={{ color: "#25c666" }}>WayWorlds</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Соблюдение правил обязательно для всех игроков. Незнание правил не освобождает от ответственности.
        </p>
      </section>

      {/* CONTENT — пустое поле */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="bg-white dark:bg-[#161b25] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm min-h-[340px] sm:min-h-[480px] flex flex-col items-center justify-center gap-4 text-center p-8 sm:p-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #a8edbe 0%, #25c666 100%)" }}>
            <Icon name="ScrollText" size={28} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Правила скоро появятся</h2>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            Администрация готовит список правил. Следи за обновлениями в Telegram-канале.
          </p>
          <a
            href="https://t.me/wayworlds"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-colors"
            style={{ background: "linear-gradient(135deg, #a8edbe 0%, #25c666 100%)" }}
          >
            <Icon name="Send" size={14} className="text-white" />
            Telegram-канал
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f1318] py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO} alt="WayWorlds" className="w-6 h-6 object-contain" />
            <span className="font-bold text-gray-900 dark:text-white text-sm">WayWorlds</span>
          </Link>
          <p className="text-xs text-gray-400 dark:text-gray-600">© 2025 WayWorlds. Все права защищены.</p>
          <div className="flex gap-5 text-xs text-gray-400 dark:text-gray-600">
            <Link to="/donate" className="hover:text-gray-500 dark:hover:text-gray-400 transition-colors">Донат</Link>
            <a href="#" className="hover:text-gray-500 dark:hover:text-gray-400 transition-colors">Соглашение</a>
          </div>
        </div>
      </footer>
      <MobileNav />
    </div>
  );
}