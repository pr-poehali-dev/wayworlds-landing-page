import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const LOGO = "https://cdn.poehali.dev/files/61189b8c-3707-4976-99de-7498b29f1bce.png";

export default function Rules() {
  return (
    <div className="min-h-screen bg-[#f8fafb] text-gray-900">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <img src={LOGO} alt="WayWorlds" className="w-12 h-12 object-contain" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">WayWorlds</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900 transition-colors">Возможности</Link>
            <Link to="/donate" className="hover:text-gray-900 transition-colors">Донат</Link>
            <Link to="/rules" className="font-medium transition-colors" style={{ color: "#25c666" }}>Правила</Link>
          </div>
          <a
            href="https://t.me/wayworlds"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <Icon name="Send" size={14} />
            Telegram
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
          style={{ backgroundColor: "#f0fdf4", borderColor: "#25c666" }}>
          <Icon name="BookOpen" size={12} style={{ color: "#25c666" }} />
          <span className="text-xs font-medium" style={{ color: "#4a7a48" }}>Обязательно к прочтению</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Правила <span style={{ color: "#25c666" }}>WayWorlds</span>
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          Соблюдение правил обязательно для всех игроков. Незнание правил не освобождает от ответственности.
        </p>
      </section>

      {/* CONTENT — пустое поле */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[480px] flex flex-col items-center justify-center gap-4 text-center p-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #a8edbe 0%, #25c666 100%)" }}>
            <Icon name="ScrollText" size={28} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-700">Правила скоро появятся</h2>
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
      <footer className="border-t border-gray-100 bg-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO} alt="WayWorlds" className="w-6 h-6 object-contain" />
            <span className="font-bold text-gray-900 text-sm">WayWorlds</span>
          </Link>
          <p className="text-xs text-gray-300">© 2025 WayWorlds. Все права защищены.</p>
          <div className="flex gap-5 text-xs text-gray-300">
            <Link to="/donate" className="hover:text-gray-500 transition-colors">Донат</Link>
            <a href="#" className="hover:text-gray-500 transition-colors">Соглашение</a>
          </div>
        </div>
      </footer>
    </div>
  );
}