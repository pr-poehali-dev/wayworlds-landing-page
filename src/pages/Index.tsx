import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const LOGO = "https://cdn.poehali.dev/files/61189b8c-3707-4976-99de-7498b29f1bce.png";

const features = [
  {
    icon: "Home",
    title: "Недвижимость",
    desc: "Покупай недвижимость и обустраивай её как хочешь. Арендуй помещения и веди свой бизнес",
  },
  {
    icon: "Crown",
    title: "Политика и власть",
    desc: "Мэр избирается игроками, ведёт любую политику и издаёт указы. Игроки могут устроить переворот",
  },
  {
    icon: "Car",
    title: "Машины и транспорт",
    desc: "Современные автомобили, уникальные механики передвижения по городу",
  },
  {
    icon: "Briefcase",
    title: "Трудоустройство",
    desc: "Официальные работы, подработки, создание собственных компаний и ведение бизнеса",
  },
  {
    icon: "Heart",
    title: "Социальная жизнь",
    desc: "Свадьбы, питомцы, болезни, одежда — полноценная социальная жизнь твоего персонажа",
  },
  {
    icon: "LayoutGrid",
    title: "Развлечения",
    desc: "Казино, розыск, катсцены с собственным сюжетом и множество других активностей",
  },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return count;
}

function OnlineCounter({ animate }: { animate: boolean }) {
  const count = useCountUp(847, 2000, animate);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center px-10 py-5 gap-4">
      <Icon name="Users" size={22} className="text-gray-400" />
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-3xl font-bold text-gray-900">{count.toLocaleString("ru-RU")}</span>
        <span className="text-sm text-gray-500">Игроков онлайн</span>
      </div>
    </div>
  );
}

export default function Index() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafb] text-gray-900">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={LOGO} alt="WayWorlds" className="w-8 h-8 object-contain" />
            <span className="font-bold text-gray-900 text-lg tracking-tight">WayWorlds</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">Возможности</a>
            <Link to="/donate" className="hover:text-gray-900 transition-colors">Донат</Link>
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
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8"
            style={{ backgroundColor: "#f0fdf4", borderColor: "#25c666" }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#25c666" }} />
            <span className="text-xs font-medium" style={{ color: "#4a7a48" }}>RolePlay сервер</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Добро пожаловать в{" "}
            <span style={{ color: "#25c666" }}>WayWorlds</span>
          </h1>

          <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
            Полная власть игроков, свобода действий, питомцы, катсцены с собственным сюжетом, машины.
            Участвуй в перестрелках, стань представителем закона или создай собственную ОПГ!
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-colors shadow-sm"
              style={{ backgroundColor: "#25c666" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1aaf55")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#25c666")}
            >
              <Icon name="Play" size={16} className="text-white" />
              Начать играть
            </button>
            <a
              href="https://t.me/wayworlds"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <Icon name="Send" size={16} />
              Телеграм
            </a>
          </div>

          <p className="mt-6 text-xs text-gray-400">версия 1.0.0</p>
        </div>

        {/* Right — grey placeholder */}
        <div className="flex justify-center">
          <div className="w-full max-w-md aspect-[4/3] rounded-2xl shadow-xl border border-gray-100 bg-gray-300" />
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-8" ref={statsRef}>
        <OnlineCounter animate={statsVisible} />
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Уникальные возможности
          </h2>
          <p className="text-gray-400 text-base">
            Открой для себя мир бесконечных возможностей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="feature-card rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#f0fdf4", border: "1px solid #25c666" }}>
                <Icon name={f.icon} size={22} fallback="Star" style={{ color: "#25c666" }} />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={LOGO} alt="WayWorlds" className="w-7 h-7 object-contain" />
                <span className="font-bold text-gray-900">WayWorlds</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ролевая игра с полной свободой действий. Стань тем, кем хочешь.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-4 text-sm">Навигация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-gray-700 transition-colors">Возможности</a></li>
                <li><Link to="/donate" className="hover:text-gray-700 transition-colors">Донат</Link></li>
                <li><a href="#" className="hover:text-gray-700 transition-colors">Правила сервера</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-4 text-sm">Контакты</h4>
              <div className="flex flex-col gap-3">
                <a href="https://t.me/wayworlds" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
                  <Icon name="Send" size={14} />Telegram-канал
                </a>
                <a href="https://discord.gg/wayworlds" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
                  <Icon name="MessageSquare" size={14} />Discord-сервер
                </a>
                <a href="mailto:admin@wayworlds.ru"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
                  <Icon name="Mail" size={14} />admin@wayworlds.ru
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-300">© 2025 WayWorlds. Все права защищены.</p>
            <div className="flex gap-6 text-xs text-gray-300">
              <a href="#" className="hover:text-gray-500 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Пользовательское соглашение</a>
            </div>
            <p className="text-xs text-gray-300">v1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}