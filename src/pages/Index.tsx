import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";

const LOGO = "https://cdn.poehali.dev/files/61189b8c-3707-4976-99de-7498b29f1bce.png";
const MC_STATUS_URL = "https://functions.poehali.dev/6f3fd840-d4f3-4093-801d-ca8bbd9b77cc";
const REFRESH_INTERVAL = 3 * 60 * 1000;

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

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  const prevTarget = useRef(0);
  useEffect(() => {
    if (!start || target === prevTarget.current) return;
    const from = prevTarget.current;
    prevTarget.current = target;
    const diff = target - from;
    const step = diff / (duration / 16);
    let current = from;
    const timer = setInterval(() => {
      current += step;
      if ((step > 0 && current >= target) || (step < 0 && current <= target)) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return count;
}

function OnlineCounter({ online, maxPlayers, status }: { online: number; maxPlayers: number; status: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(online, 1500, visible);

  return (
    <div ref={ref} className="bg-white dark:bg-[#161b25] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center px-10 py-5 gap-4">
      <div className="relative">
        <Icon name="Users" size={22} className="text-gray-400" />
        {status === "ok" && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white dark:border-[#161b25]" />
        )}
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {status === "offline" ? "—" : count.toLocaleString("ru-RU")}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {status === "offline" ? "Сервер недоступен" : `Игроков онлайн${maxPlayers ? ` / ${maxPlayers}` : ""}`}
        </span>
      </div>
    </div>
  );
}

const SERVER_IP = "WayWorlds.ru";

export default function Index() {
  const [copied, setCopied] = useState(false);
  const [mcOnline, setMcOnline] = useState(0);
  const [mcMax, setMcMax] = useState(0);
  const [mcStatus, setMcStatus] = useState<"ok" | "offline" | "loading">("loading");

  const fetchOnline = useCallback(async () => {
    try {
      const res = await fetch(MC_STATUS_URL);
      const data = await res.json();
      setMcOnline(data.online ?? 0);
      setMcMax(data.max ?? 0);
      setMcStatus(data.status === "ok" ? "ok" : "offline");
    } catch {
      setMcStatus("offline");
    }
  }, []);

  useEffect(() => {
    fetchOnline();
    const interval = setInterval(fetchOnline, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchOnline]);

  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] dark:bg-[#0f1318] text-gray-900 dark:text-gray-100 pb-16 md:pb-0">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f1318]/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center shrink-0">
              <img src={LOGO} alt="WayWorlds" className="w-8 h-8 sm:w-12 sm:h-12 object-contain" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-base sm:text-lg tracking-tight">WayWorlds</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Возможности</a>
            <Link to="/donate" className="hover:text-gray-900 dark:hover:text-white transition-colors">Донат</Link>
            <Link to="/rules" className="hover:text-gray-900 dark:hover:text-white transition-colors">Правила</Link>
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-24 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5 sm:mb-8"
            style={{ backgroundColor: "#f0fdf4", borderColor: "#25c666" }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#25c666" }} />
            <span className="text-xs font-medium" style={{ color: "#4a7a48" }}>RolePlay сервер</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Добро пожаловать в{" "}
            <span style={{ color: "#25c666" }}>WayWorlds</span>
          </h1>

          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto md:mx-0">
            Полная власть игроков, свобода действий, питомцы, катсцены с собственным сюжетом, машины.
            Участвуй в перестрелках, стань представителем закона или создай собственную ОПГ!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center md:items-start">
            <button
              onClick={copyIP}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all shadow-sm"
              style={{ backgroundColor: copied ? "#1aaf55" : "#25c666" }}
              onMouseEnter={e => { if (!copied) e.currentTarget.style.backgroundColor = "#1aaf55"; }}
              onMouseLeave={e => { if (!copied) e.currentTarget.style.backgroundColor = "#25c666"; }}
            >
              <Icon name={copied ? "Check" : "Copy"} size={16} className="text-white" />
              {copied ? `IP скопирован!` : "Начать играть"}
            </button>
            <a
              href="https://t.me/wayworlds"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <Icon name="Send" size={16} />
              Телеграм
            </a>
          </div>

          <p className="mt-5 text-xs text-gray-400 text-center md:text-left">версия 1.0.0</p>
        </div>

        {/* Right — grey placeholder */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 bg-gray-300 dark:bg-gray-800" />
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <OnlineCounter online={mcOnline} maxPlayers={mcMax} status={mcStatus} />
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Уникальные возможности
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Открой для себя мир бесконечных возможностей
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {features.map((f) => (
            <div key={f.title} className="feature-card rounded-2xl p-5 sm:p-6 flex gap-4 sm:block">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 sm:mb-5"
                style={{ backgroundColor: "#f0fdf4", border: "1px solid #25c666" }}>
                <Icon name={f.icon} size={22} fallback="Star" style={{ color: "#25c666" }} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f1318] py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8 sm:mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <img src={LOGO} alt="WayWorlds" className="w-7 h-7 object-contain" />
                <span className="font-bold text-gray-900 dark:text-white">WayWorlds</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ролевая игра с полной свободой действий. Стань тем, кем хочешь.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm">Навигация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-gray-700 dark:hover:text-white transition-colors">Возможности</a></li>
                <li><Link to="/donate" className="hover:text-gray-700 dark:hover:text-white transition-colors">Донат</Link></li>
                <li><a href="#" className="hover:text-gray-700 dark:hover:text-white transition-colors">Правила</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm">Контакты</h4>
              <div className="flex flex-col gap-2.5">
                <a href="https://t.me/wayworlds" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                  <Icon name="Send" size={14} />Telegram
                </a>
                <a href="https://discord.gg/wayworlds" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                  <Icon name="MessageSquare" size={14} />Discord
                </a>
                <a href="mailto:admin@wayworlds.ru"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                  <Icon name="Mail" size={14} /><span className="truncate">admin@wayworlds.ru</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-300 dark:text-gray-600">© 2025 WayWorlds. Все права защищены.</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-300 dark:text-gray-600">
              <a href="#" className="hover:text-gray-500 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Пользовательское соглашение</a>
            </div>
            <p className="text-xs text-gray-300 dark:text-gray-600">v1.0.0</p>
          </div>
        </div>
      </footer>
      <MobileNav />
    </div>
  );
}