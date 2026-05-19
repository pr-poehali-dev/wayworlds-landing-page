import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/b41eb1a9-0c58-4130-87e9-295a9231600e/files/213bb506-6ec9-4e6d-aa9f-8db6b877b24f.jpg";

const features = [
  {
    icon: "Building2",
    title: "Недвижимость",
    desc: "Покупай недвижимость и обустраивай её как хочешь. Арендуй помещения и веди свой бизнес.",
    color: "blue",
  },
  {
    icon: "Crown",
    title: "Политика и власть",
    desc: "Мэр избирается игроками, ведёт любую политику и издаёт указы. Игроки могут устроить переворот.",
    color: "purple",
  },
  {
    icon: "Car",
    title: "Машины и транспорт",
    desc: "Современные автомобили, уникальные механики передвижения по городу.",
    color: "pink",
  },
  {
    icon: "Briefcase",
    title: "Трудоустройство",
    desc: "Официальные работы, подработки, создание собственных компаний и ведение бизнеса.",
    color: "blue",
  },
  {
    icon: "Heart",
    title: "Социальная жизнь",
    desc: "Свадьбы, питомцы, болезни, одежда — полноценная социальная жизнь твоего персонажа.",
    color: "purple",
  },
  {
    icon: "Gamepad2",
    title: "Развлечения",
    desc: "Казино, розыск, катсцены с собственным сюжетом и множество других активностей.",
    color: "pink",
  },
];

const stats = [
  { label: "Игроков онлайн", value: 847, suffix: "", icon: "Users", color: "blue" },
  { label: "Миссий выполнено", value: 12483, suffix: "+", icon: "Target", color: "purple" },
  { label: "Активных серверов", value: 3, suffix: "", icon: "Server", color: "pink" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
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

function StatCard({ stat, animate }: { stat: typeof stats[0]; animate: boolean }) {
  const count = useCountUp(stat.value, 2000, animate);
  const colorMap: Record<string, string> = {
    blue: "text-blue-400 border-blue-500/30 bg-blue-500/5",
    purple: "text-purple-400 border-purple-500/30 bg-purple-500/5",
    pink: "text-pink-400 border-pink-500/30 bg-pink-500/5",
  };
  const iconColor: Record<string, string> = {
    blue: "text-blue-400",
    purple: "text-purple-400",
    pink: "text-pink-400",
  };
  return (
    <div className={`rounded-xl border p-6 text-center ${colorMap[stat.color]} backdrop-blur-sm`}>
      <div className={`flex justify-center mb-3 ${iconColor[stat.color]}`}>
        <Icon name={stat.icon} size={28} fallback="Circle" />
      </div>
      <div className={`font-oswald text-4xl font-bold mb-1 ${iconColor[stat.color]}`}>
        {count.toLocaleString("ru-RU")}{stat.suffix}
      </div>
      <div className="text-sm text-gray-400 font-roboto">{stat.label}</div>
    </div>
  );
}

export default function Index() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050810] cyber-grid text-white overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#050810]/80 backdrop-blur-md border-b border-blue-500/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <Icon name="Zap" size={16} className="text-white" />
          </div>
          <span className="font-oswald text-xl font-bold tracking-widest gradient-text">WAYWORLDS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-roboto">
          <a href="#features" className="hover:text-blue-400 transition-colors">Возможности</a>
          <a href="#video" className="hover:text-blue-400 transition-colors">Геймплей</a>
          <a href="#subscribe" className="hover:text-blue-400 transition-colors">Подписка</a>
        </div>
        <a
          href="https://t.me/wayworlds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500/40 text-blue-400 text-sm font-roboto hover:bg-blue-500/10 transition-all"
        >
          <Icon name="Send" size={14} />
          Telegram
        </a>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden scanlines">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/70 via-[#050810]/50 to-[#050810]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050810]/60 via-transparent to-[#050810]/60" />

        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-online" />
            <span className="text-green-400 text-xs font-roboto tracking-widest uppercase">Сервер онлайн</span>
          </div>

          <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6 fade-in-up fade-in-up-delay-1">
            <span className="block text-white">ДОБРО ПОЖАЛОВАТЬ</span>
            <span className="block gradient-text mt-2">В WAYWORLDS</span>
          </h1>

          <p className="font-roboto text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed fade-in-up fade-in-up-delay-2">
            Полная власть игроков, свобода действий, питомцы и катсцены с собственным сюжетом.
            Машины, перестрелки — стань законом или создай ОП.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10 fade-in-up fade-in-up-delay-3">
            {["Открытый мир", "Полная свобода", "Питомцы", "Свой сюжет", "Машины"].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-roboto border border-purple-500/30 text-purple-300 bg-purple-500/5">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up fade-in-up-delay-4">
            <button className="btn-gradient px-8 py-4 rounded-xl font-oswald text-lg font-semibold text-white tracking-wider shadow-lg">
              НАЧАТЬ ИГРАТЬ
            </button>
            <a
              href="https://t.me/wayworlds"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-oswald text-lg font-semibold border border-white/20 text-white hover:bg-white/5 transition-all tracking-wider"
            >
              <Icon name="Send" size={18} />
              ТЕЛЕГРАМ
            </a>
          </div>

          <div className="mt-12 text-gray-600 text-xs font-roboto fade-in-up fade-in-up-delay-5">
            версия 1.0.0 — ранний доступ
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-glow-pulse">
          <span className="text-xs font-roboto tracking-widest">ПРОКРУТИ</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-4" ref={statsRef}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={statsVisible} />
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 mb-6">
              <Icon name="Sparkles" size={14} className="text-purple-400" />
              <span className="text-purple-400 text-xs font-roboto tracking-widest uppercase">Геймплей</span>
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              УНИКАЛЬНЫЕ <span className="gradient-text">ВОЗМОЖНОСТИ</span>
            </h2>
            <p className="font-roboto text-gray-400 text-lg max-w-2xl mx-auto">
              Открой для себя мир бесконечных возможностей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const iconColorMap: Record<string, string> = {
                blue: "text-blue-400 bg-blue-500/10",
                purple: "text-purple-400 bg-purple-500/10",
                pink: "text-pink-400 bg-pink-500/10",
              };
              return (
                <div
                  key={f.title}
                  className="feature-card rounded-xl p-6 group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconColorMap[f.color]}`}>
                    <Icon name={f.icon} size={24} fallback="Star" className={iconColorMap[f.color].split(" ")[0]} />
                  </div>
                  <h3 className="font-oswald text-xl font-semibold text-white mb-2 tracking-wide">
                    {f.title}
                  </h3>
                  <p className="font-roboto text-gray-400 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              СМОТРИ <span className="gradient-text">ГЕЙМПЛЕЙ</span>
            </h2>
            <p className="font-roboto text-gray-400">Живые моменты из мира WayWorlds</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-blue-500/20 neon-border-blue">
            <div className="aspect-video bg-[#0a0d1a] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                  <Icon name="Play" size={32} className="text-white ml-1" />
                </div>
                <p className="font-oswald text-xl text-gray-400">Видео геймплея</p>
                <p className="font-roboto text-sm text-gray-600 mt-1">Скажи мне ссылку на YouTube — вставлю прямо здесь</p>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/60" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/60" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/60" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/60" />
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section id="subscribe" className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <Icon name="Bell" size={40} className="text-purple-400 mx-auto mb-4" />
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-3">
              БУДЬ В КУРСЕ
            </h2>
            <p className="font-roboto text-gray-400 mb-8">
              Подпишись на обновления — узнай первым об ивентах, патчах и новых возможностях
            </p>
            {!submitted ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="твой@email.ru"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#0a0d1a] border border-purple-500/30 text-white font-roboto placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="btn-gradient px-6 py-3 rounded-xl font-oswald font-semibold text-white tracking-wider whitespace-nowrap"
                >
                  ПОДПИСАТЬСЯ
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 py-3">
                <Icon name="CheckCircle" size={24} className="text-green-400" />
                <span className="font-oswald text-xl text-green-400">Ты подписан! Ждём тебя в игре</span>
              </div>
            )}
            <p className="font-roboto text-xs text-gray-600 mt-4">Никакого спама — только важные новости</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <Icon name="Zap" size={16} className="text-white" />
                </div>
                <span className="font-oswald text-xl font-bold tracking-widest gradient-text">WAYWORLDS</span>
              </div>
              <p className="font-roboto text-gray-500 text-sm leading-relaxed">
                Ролевая игра с полной свободой действий. Стань тем, кем хочешь — законом или легендой.
              </p>
            </div>
            <div>
              <h4 className="font-oswald text-white font-semibold mb-4 tracking-wider">НАВИГАЦИЯ</h4>
              <ul className="space-y-2 font-roboto text-sm text-gray-500">
                <li><a href="#features" className="hover:text-blue-400 transition-colors">Возможности</a></li>
                <li><a href="#video" className="hover:text-blue-400 transition-colors">Геймплей</a></li>
                <li><a href="#subscribe" className="hover:text-blue-400 transition-colors">Подписка</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Правила сервера</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-oswald text-white font-semibold mb-4 tracking-wider">КОНТАКТЫ</h4>
              <div className="flex flex-col gap-3">
                <a
                  href="https://t.me/wayworlds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-500 hover:text-blue-400 transition-colors font-roboto text-sm"
                >
                  <Icon name="Send" size={16} />
                  Telegram-канал
                </a>
                <a
                  href="https://discord.gg/wayworlds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-500 hover:text-purple-400 transition-colors font-roboto text-sm"
                >
                  <Icon name="MessageSquare" size={16} />
                  Discord-сервер
                </a>
                <a
                  href="mailto:admin@wayworlds.ru"
                  className="flex items-center gap-3 text-gray-500 hover:text-pink-400 transition-colors font-roboto text-sm"
                >
                  <Icon name="Mail" size={16} />
                  admin@wayworlds.ru
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-roboto text-xs text-gray-600">
              © 2025 WayWorlds. Все права защищены.
            </p>
            <div className="flex gap-6 font-roboto text-xs text-gray-600">
              <a href="#" className="hover:text-gray-400 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Пользовательское соглашение</a>
            </div>
            <p className="font-roboto text-xs text-gray-700">v1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
