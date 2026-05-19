import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";

const LOGO = "https://cdn.poehali.dev/files/61189b8c-3707-4976-99de-7498b29f1bce.png";

type CartItem = {
  id: string;
  name: string;
  price: number;
  icon: string;
  qty: number;
};

const packs = [
  {
    id: "pack1",
    name: "Стартовый",
    price: 250,
    icon: "Rocket",
    popular: false,
    items: [
      { icon: "Coins", text: "50 000 игровой валюты ВОН" },
      { icon: "Shirt", text: "Уникальная лимитированная одежда" },
      { icon: "Gem", text: "1 500 WC донат-валюты" },
    ],
  },
  {
    id: "pack2",
    name: "Продвинутый",
    price: 500,
    icon: "Zap",
    popular: true,
    items: [
      { icon: "Coins", text: "100 000 игровой валюты ВОН" },
      { icon: "PawPrint", text: "Бесплатный питомец на выбор" },
      { icon: "Gem", text: "2 500 WC донат-валюты" },
    ],
  },
  {
    id: "pack3",
    name: "Элитный",
    price: 899,
    icon: "Crown",
    popular: false,
    items: [
      { icon: "Coins", text: "200 000 игровой валюты ВОН" },
      { icon: "Home", text: "Бесплатный дом на сервере" },
      { icon: "Gem", text: "3 500 WC донат-валюты" },
    ],
  },
];

const otherItems = [
  { id: "rename", icon: "UserCheck", label: "Смена ФИ", price: 50, note: null },
  { id: "unban", icon: "ShieldCheck", label: "Разбан", price: 250, note: "Если был перманентный бан — деньги не возвращаем" },
];

const wcPresets = [100, 250, 500, 1000, 2500, 5000];
const RATE = 3.5;

const RECENT_PURCHASES = [
  { name: "Максим К.", item: "Элитный пак", icon: "Crown", time: "2 мин назад" },
  { name: "Алина Р.", item: "2 500 WC", icon: "Gem", time: "7 мин назад" },
  { name: "Дмитрий С.", item: "Продвинутый пак", icon: "Zap", time: "14 мин назад" },
  { name: "Кирилл М.", item: "Смена ФИ", icon: "UserCheck", time: "21 мин назад" },
  { name: "Ольга Т.", item: "5 000 WC", icon: "Gem", time: "35 мин назад" },
  { name: "Стартовый пак", item: "Стартовый пак", icon: "Rocket", time: "41 мин назад" },
  { name: "Иван Н.", item: "1 000 WC", icon: "Gem", time: "58 мин назад" },
];

function RecentPurchasesBar() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    const speed = 0.4;
    let raf: number;
    const step = () => {
      pos += speed;
      const half = track.scrollWidth / 2;
      if (pos >= half) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = [...RECENT_PURCHASES, ...RECENT_PURCHASES];

  return (
    <div className="bg-white dark:bg-[#161b25] border-b border-gray-100 dark:border-gray-800 overflow-hidden py-2.5">
      <div className="flex items-center gap-2 px-4 mb-1.5">
        <Icon name="TrendingUp" size={13} style={{ color: "#25c666" }} />
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Последние покупки</span>
      </div>
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex gap-3 w-max will-change-transform">
          {items.map((p, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shrink-0">
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#f0fdf4" }}>
                <Icon name={p.icon} size={11} fallback="Star" style={{ color: "#25c666" }} />
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{p.name}</span>
              <span className="text-xs text-gray-400">купил</span>
              <span className="text-xs font-semibold" style={{ color: "#25c666" }}>{p.item}</span>
              <span className="text-xs text-gray-300 dark:text-gray-600">{p.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WcConverter({ onAdd }: { onAdd: (item: CartItem) => void }) {
  const [rub, setRub] = useState(100);
  const wc = Math.floor(rub * RATE);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "#f0fdf4", border: "1px solid #25c666" }}>
          <Icon name="Gem" size={20} style={{ color: "#25c666" }} />
        </div>
        <div>
          <div className="font-bold text-gray-900">Пополнить WC</div>
          <div className="text-xs text-gray-400">Курс: 1 ₽ = {RATE} WC</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {wcPresets.map((preset) => {
          const presetRub = Math.round(preset / RATE);
          const active = Math.floor(presetRub * RATE) === wc;
          return (
            <button
              key={preset}
              onClick={() => setRub(presetRub)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
              style={active
                ? { backgroundColor: "#25c666", color: "#fff", borderColor: "#25c666" }
                : { backgroundColor: "#f9fafb", color: "#374151", borderColor: "#e5e7eb" }
              }
            >
              {preset} WC
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Вы платите</label>
          <div className="relative">
            <input
              type="number"
              min={1}
              value={rub}
              onChange={e => setRub(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 font-semibold text-sm focus:outline-none transition-colors"
              onFocus={e => (e.currentTarget.style.borderColor = "#25c666")}
              onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₽</span>
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Вы получаете</label>
          <div className="w-full px-4 py-3 rounded-xl border font-bold text-sm"
            style={{ borderColor: "#25c666", backgroundColor: "#f0fdf4", color: "#25c666" }}>
            {wc.toLocaleString("ru-RU")} WC
          </div>
        </div>
      </div>

      <button
        className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
        style={{ backgroundColor: "#25c666" }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1aaf55")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#25c666")}
        onClick={() => onAdd({ id: `wc-${rub}`, name: `${wc.toLocaleString("ru-RU")} WC`, price: rub, icon: "Gem", qty: 1 })}
      >
        <Icon name="ShoppingCart" size={15} className="text-white" />
        В корзину — {wc.toLocaleString("ru-RU")} WC
      </button>
    </div>
  );
}

function CartWidget({ items, onRemove, onClear }: {
  items: CartItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Панель корзины */}
      {open && (
        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mb-1">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-sm">Корзина</span>
              {count > 0 && (
                <span className="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: "#25c666" }}>
                  {count}
                </span>
              )}
            </div>
            {items.length > 0 && (
              <button onClick={onClear} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                Очистить
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <Icon name="ShoppingCart" size={32} className="text-gray-200 mx-auto mb-2" />
              <p className="text-xs text-gray-400">Корзина пуста</p>
            </div>
          ) : (
            <>
              <div className="max-h-52 overflow-y-auto px-5 py-3 space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#f0fdf4" }}>
                        <Icon name={item.icon} size={13} fallback="Package" style={{ color: "#25c666" }} />
                      </div>
                      <span className="text-xs text-gray-700 truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-gray-900">{item.price * item.qty} ₽</span>
                      <button onClick={() => onRemove(item.id)}
                        className="w-5 h-5 rounded-md flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors">
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">Итого</span>
                  <span className="font-bold text-gray-900">{total} ₽</span>
                </div>
                <button
                  className="w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-colors"
                  style={{ backgroundColor: "#25c666" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1aaf55")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#25c666")}
                >
                  Оплатить {total} ₽
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Кнопка-кружок */}
      <button
        onClick={() => setOpen(o => !o)}
        className="relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all"
        style={{ backgroundColor: "#25c666" }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1aaf55")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#25c666")}
      >
        <Icon name={open ? "X" : "ShoppingCart"} size={22} className="text-white" />
        {count > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
            {count}
          </span>
        )}
      </button>
    </div>
  );
}

export default function Donate() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [offerOpen, setOfferOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);

  const scrollToOffer = () => {
    setOfferOpen(true);
    setTimeout(() => document.getElementById("offer-section")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

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
            <Link to="/donate" className="font-medium transition-colors" style={{ color: "#25c666" }}>Донат</Link>
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
            {cartCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium"
                style={{ borderColor: "#25c666", color: "#25c666", backgroundColor: "#f0fdf4" }}>
                <Icon name="ShoppingCart" size={14} style={{ color: "#25c666" }} />
                <span>{cartCount}</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      <RecentPurchasesBar />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5 sm:mb-6"
          style={{ backgroundColor: "#f0fdf4", borderColor: "#25c666" }}>
          <Icon name="Heart" size={12} style={{ color: "#25c666" }} />
          <span className="text-xs font-medium" style={{ color: "#4a7a48" }}>Поддержи сервер</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
          Донат <span style={{ color: "#25c666" }}>WayWorlds</span>
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Стартовые паки, донат-валюта WC и дополнительные услуги для твоего аккаунта.
        </p>
      </section>

      {/* PACKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Стартовые паки</h2>
          <p className="text-gray-400 text-sm">Выбери пак и начни игру с преимуществом</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {packs.map((pack) => {
            const inCart = cart.some(i => i.id === pack.id);
            return (
              <div key={pack.id}
                className={`relative rounded-2xl p-5 sm:p-7 transition-all border bg-white ${
                  inCart ? "border-[#25c666] shadow-lg" : "border-gray-100 hover:border-[#25c666]/50 hover:shadow-md"
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                      style={{ backgroundColor: "#25c666" }}>Популярный</span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#f0fdf4", border: "1px solid #25c666" }}>
                    <Icon name={pack.icon} size={20} fallback="Star" style={{ color: "#25c666" }} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{pack.name}</div>
                    <div className="text-xs text-gray-400">стартовый пак</div>
                  </div>
                  <div className="ml-auto sm:hidden">
                    <span className="text-xl font-bold text-gray-900">{pack.price} ₽</span>
                  </div>
                </div>
                <div className="mb-4 sm:mb-6 hidden sm:block">
                  <span className="text-3xl font-bold text-gray-900">{pack.price} ₽</span>
                  <span className="text-gray-400 text-sm ml-1">/ разово</span>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-7">
                  {pack.items.map((item) => (
                    <li key={item.text} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: "#f0fdf4" }}>
                        <Icon name={item.icon} size={13} fallback="Check" style={{ color: "#25c666" }} />
                      </div>
                      {item.text}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  style={inCart
                    ? { backgroundColor: "#25c666", color: "#fff" }
                    : { backgroundColor: "#f0fdf4", color: "#25c666", border: "1px solid #25c666" }
                  }
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1aaf55")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = inCart ? "#25c666" : "#f0fdf4")}
                  onClick={() => addToCart({ id: pack.id, name: pack.name + " пак", price: pack.price, icon: pack.icon, qty: 1 })}
                >
                  <Icon name={inCart ? "Check" : "ShoppingCart"} size={15} />
                  {inCart ? "В корзине" : `В корзину — ${pack.price} ₽`}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* WC + OTHER — side by side */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">

          {/* WC Converter */}
          <div>
            <div className="mb-5 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Пополнить WC</h2>
              <p className="text-gray-400 text-sm">Донат-валюта для покупок внутри игры</p>
            </div>
            <WcConverter onAdd={addToCart} />
          </div>

          {/* Other */}
          <div>
            <div className="mb-5 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Другое</h2>
              <p className="text-gray-400 text-sm">Дополнительные услуги для аккаунта</p>
            </div>
            <div className="flex flex-col gap-4">
              {otherItems.map((item) => {
                const inCart = cart.some(i => i.id === item.id);
                return (
                  <div key={item.label} className="bg-white rounded-2xl border border-gray-100 p-6 transition-all hover:border-[#25c666]/50 hover:shadow-md">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "#f0fdf4", border: "1px solid #25c666" }}>
                          <Icon name={item.icon} size={20} fallback="Star" style={{ color: "#25c666" }} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{item.label}</div>
                          <div className="text-sm font-semibold" style={{ color: "#25c666" }}>{item.price} ₽</div>
                        </div>
                      </div>
                      <button
                        className="px-4 py-2 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 shrink-0"
                        style={inCart
                          ? { backgroundColor: "#25c666", color: "#fff" }
                          : { backgroundColor: "#f0fdf4", color: "#25c666", border: "1px solid #25c666" }
                        }
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1aaf55"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = inCart ? "#25c666" : "#f0fdf4"; e.currentTarget.style.color = inCart ? "#fff" : "#25c666"; }}
                        onClick={() => addToCart({ id: item.id, name: item.label, price: item.price, icon: item.icon, qty: 1 })}
                      >
                        <Icon name={inCart ? "Check" : "ShoppingCart"} size={14} />
                        {inCart ? "В корзине" : "Добавить"}
                      </button>
                    </div>
                    {item.note && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
                        <Icon name="AlertTriangle" size={13} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700 leading-relaxed">{item.note}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section id="offer-section" className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <button
            className="w-full flex items-center justify-between text-left"
            onClick={() => setOfferOpen(!offerOpen)}
          >
            <div className="flex items-center gap-2">
              <Icon name="FileText" size={16} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Оферта и условия оплаты</span>
            </div>
            <Icon name={offerOpen ? "ChevronUp" : "ChevronDown"} size={16} className="text-gray-400" />
          </button>
          {offerOpen && (
            <div className="mt-5 pt-5 border-t border-gray-100 text-xs text-gray-400 leading-relaxed space-y-4">
              <p><strong className="text-gray-600">1. Общие положения</strong><br />
              Настоящая оферта регулирует условия приобретения внутриигровых товаров на сервере WayWorlds. Совершая оплату, вы подтверждаете согласие с настоящими условиями.</p>
              <p><strong className="text-gray-600">2. Предмет договора</strong><br />
              Администрация WayWorlds предоставляет виртуальные товары (валюту ВОН, донат-валюту WC, предметы, привилегии), не имеющие реальной денежной стоимости и не подлежащие обмену на реальные деньги.</p>
              <p><strong className="text-gray-600">3. Курс и оплата</strong><br />
              Курс донат-валюты: 1 ₽ = 3,5 WC. Все цены в рублях РФ. После успешной оплаты товар начисляется в течение 5 минут.</p>
              <p><strong className="text-gray-600">4. Возврат средств</strong><br />
              Возврат возможен в течение 24 часов при условии, что товар не был использован. При перманентной блокировке аккаунта средства за разбан не возвращаются.</p>
              <p><strong className="text-gray-600">5. Ответственность</strong><br />
              Администрация не несёт ответственности за потерю товаров вследствие нарушения правил сервера или блокировки аккаунта.</p>
              <p><strong className="text-gray-600">6. Контакты</strong><br />
              <a href="https://t.me/wayworlds" className="underline hover:text-gray-600">Telegram-поддержка</a> или <a href="mailto:admin@wayworlds.ru" className="underline hover:text-gray-600">admin@wayworlds.ru</a></p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO} alt="WayWorlds" className="w-6 h-6 object-contain" />
            <span className="font-bold text-gray-900 text-sm">WayWorlds</span>
          </Link>
          <p className="text-xs text-gray-300">© 2025 WayWorlds. Все права защищены.</p>
          <div className="flex gap-5 text-xs text-gray-300">
            <button onClick={scrollToOffer} className="hover:text-gray-500 transition-colors">Оферта оплаты</button>
            <a href="#" className="hover:text-gray-500 transition-colors">Соглашение</a>
          </div>
        </div>
      </footer>

      {/* FLOATING CART */}
      <CartWidget items={cart} onRemove={removeFromCart} onClear={clearCart} />
      <MobileNav />
    </div>
  );
}