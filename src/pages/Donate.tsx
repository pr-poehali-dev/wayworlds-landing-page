import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const plans = [
  {
    id: "base",
    name: "Базовый",
    price: "199 ₽",
    period: "/ месяц",
    icon: "Star",
    popular: false,
    perks: [
      "Префикс [VIP] в чате",
      "Увеличенный инвентарь",
      "Приоритетный вход на сервер",
      "Цветной ник",
    ],
  },
  {
    id: "pro",
    name: "Премиум",
    price: "449 ₽",
    period: "/ месяц",
    icon: "Crown",
    popular: true,
    perks: [
      "Всё из Базового",
      "Префикс [PREMIUM] в чате",
      "Эксклюзивные транспортные средства",
      "Доступ к закрытым зонам",
      "Двойной опыт",
      "Особый скин персонажа",
    ],
  },
  {
    id: "elite",
    name: "Элитный",
    price: "899 ₽",
    period: "/ месяц",
    icon: "Gem",
    popular: false,
    perks: [
      "Всё из Премиум",
      "Префикс [ELITE] в чате",
      "Личный дом в игре",
      "Уникальные анимации",
      "Приоритетная поддержка",
      "Ранний доступ к обновлениям",
      "Эксклюзивные ивенты",
    ],
  },
];

const oneTime = [
  { icon: "Coins", label: "10 000 монет", price: "99 ₽" },
  { icon: "Coins", label: "50 000 монет", price: "399 ₽" },
  { icon: "Coins", label: "150 000 монет", price: "999 ₽" },
  { icon: "Package", label: "Стартовый набор", price: "149 ₽" },
  { icon: "Shirt", label: "Эксклюзивный скин", price: "249 ₽" },
  { icon: "Key", label: "Смена ника", price: "79 ₽" },
];

export default function Donate() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f8fafb] text-gray-900">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#25c666" }}>
              <Icon name="Zap" size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">WayWorlds</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <Link to="/#features" className="hover:text-gray-900 transition-colors">Возможности</Link>
            <Link to="/donate" className="font-medium transition-colors" style={{ color: "#25c666" }}>Донат</Link>
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
          <Icon name="Heart" size={12} style={{ color: "#25c666" }} />
          <span className="text-xs font-medium" style={{ color: "#4a7a48" }}>Поддержи сервер</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Донат <span style={{ color: "#25c666" }}>WayWorlds</span>
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          Поддержи развитие сервера и получи уникальные привилегии. Все средства идут на улучшение игры.
        </p>
      </section>

      {/* SUBSCRIPTION PLANS */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Подписки</h2>
          <p className="text-gray-400 text-sm">Ежемесячные привилегии для настоящих игроков</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`relative rounded-2xl p-7 cursor-pointer transition-all border ${
                selected === plan.id
                  ? "border-[#25c666] shadow-lg"
                  : "border-gray-100 bg-white hover:border-[#25c666]/50 hover:shadow-md"
              } bg-white`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                    style={{ backgroundColor: "#25c666" }}>
                    Популярный
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#f0fdf4", border: "1px solid #25c666" }}>
                  <Icon name={plan.icon} size={20} fallback="Star" style={{ color: "#25c666" }} />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{plan.name}</div>
                  <div className="text-xs text-gray-400">привилегия</div>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-2.5 mb-7">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-gray-600">
                    <Icon name="Check" size={15} className="mt-0.5 shrink-0" style={{ color: "#25c666" }} />
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-xl font-semibold text-sm transition-colors"
                style={
                  selected === plan.id || plan.popular
                    ? { backgroundColor: "#25c666", color: "#fff" }
                    : { backgroundColor: "#f0fdf4", color: "#25c666", border: "1px solid #25c666" }
                }
                onMouseEnter={e => {
                  if (selected !== plan.id && !plan.popular) return;
                  e.currentTarget.style.backgroundColor = "#1aaf55";
                }}
                onMouseLeave={e => {
                  if (selected !== plan.id && !plan.popular) return;
                  e.currentTarget.style.backgroundColor = "#25c666";
                }}
              >
                Выбрать
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ONE-TIME ITEMS */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Разовые покупки</h2>
          <p className="text-gray-400 text-sm">Монеты, скины и другие предметы без подписки</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {oneTime.map((item) => (
            <div key={item.label}
              className="feature-card rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer hover:border-[#25c666]/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#f0fdf4", border: "1px solid #25c666" }}>
                  <Icon name={item.icon} size={18} fallback="Package" style={{ color: "#25c666" }} />
                </div>
                <span className="font-medium text-gray-800 text-sm">{item.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 whitespace-nowrap">{item.price}</span>
                <button
                  className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-colors"
                  style={{ backgroundColor: "#25c666" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1aaf55")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#25c666")}
                >
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white mt-10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#25c666" }}>
              <Icon name="Zap" size={12} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">WayWorlds</span>
          </Link>
          <p className="text-xs text-gray-300">© 2025 WayWorlds. Все права защищены.</p>
          <div className="flex gap-5 text-xs text-gray-300">
            <a href="#" className="hover:text-gray-500 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Соглашение</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
