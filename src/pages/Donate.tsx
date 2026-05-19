import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

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
  {
    icon: "UserCheck",
    label: "Смена ФИ",
    price: 50,
    note: null,
  },
  {
    icon: "ShieldCheck",
    label: "Разбан",
    price: 250,
    note: "Если был перманентный бан — деньги не возвращаем",
  },
];

const wcPresets = [100, 250, 500, 1000, 2500, 5000];
const RATE = 3.5;

function WcConverter() {
  const [rub, setRub] = useState(100);
  const wc = Math.floor(rub * RATE);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 max-w-xl mx-auto">
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
              style={
                active
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
        className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-colors"
        style={{ backgroundColor: "#25c666" }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1aaf55")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#25c666")}
      >
        Пополнить на {wc.toLocaleString("ru-RU")} WC
      </button>
    </div>
  );
}

export default function Donate() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [offerOpen, setOfferOpen] = useState(false);

  const scrollToOffer = () => {
    setOfferOpen(true);
    setTimeout(() => {
      document.getElementById("offer-section")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

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
            <Link to="/" className="hover:text-gray-900 transition-colors">Возможности</Link>
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
          Стартовые паки для быстрого начала игры и пополнение донат-валюты WC.
        </p>
      </section>

      {/* PACKS */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Стартовые паки</h2>
          <p className="text-gray-400 text-sm">Выбери пак и начни игру с преимуществом</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packs.map((pack) => {
            const isSelected = selectedPack === pack.id;
            return (
              <div
                key={pack.id}
                onClick={() => setSelectedPack(pack.id)}
                className={`relative rounded-2xl p-7 cursor-pointer transition-all border bg-white ${
                  isSelected
                    ? "border-[#25c666] shadow-lg"
                    : "border-gray-100 hover:border-[#25c666]/50 hover:shadow-md"
                }`}
              >
                {pack.popular && (
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
                    <Icon name={pack.icon} size={20} fallback="Star" style={{ color: "#25c666" }} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{pack.name}</div>
                    <div className="text-xs text-gray-400">стартовый пак</div>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">{pack.price} ₽</span>
                  <span className="text-gray-400 text-sm ml-1">/ разово</span>
                </div>

                <ul className="space-y-3 mb-7">
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
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-colors"
                  style={
                    isSelected || pack.popular
                      ? { backgroundColor: "#25c666", color: "#fff" }
                      : { backgroundColor: "#f0fdf4", color: "#25c666", border: "1px solid #25c666" }
                  }
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1aaf55")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = isSelected || pack.popular ? "#25c666" : "#f0fdf4")}
                >
                  Купить за {pack.price} ₽
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* WC CONVERTER */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Пополнить WC</h2>
          <p className="text-gray-400 text-sm">Донат-валюта для покупок внутри игры</p>
        </div>
        <WcConverter />
      </section>

      {/* OTHER */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Другое</h2>
          <p className="text-gray-400 text-sm">Дополнительные услуги для вашего аккаунта</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {otherItems.map((item) => (
            <div key={item.label} className="feature-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#f0fdf4", border: "1px solid #25c666" }}>
                  <Icon name={item.icon} size={20} fallback="Star" style={{ color: "#25c666" }} />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{item.label}</div>
                  <div className="text-sm font-semibold" style={{ color: "#25c666" }}>{item.price} ₽</div>
                </div>
              </div>
              {item.note && (
                <div className="flex items-start gap-2 mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <Icon name="AlertTriangle" size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 leading-relaxed">{item.note}</p>
                </div>
              )}
              <button
                className="w-full py-2.5 rounded-xl font-semibold text-sm transition-colors"
                style={{ backgroundColor: "#f0fdf4", color: "#25c666", border: "1px solid #25c666" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#25c666"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#f0fdf4"; e.currentTarget.style.color = "#25c666"; }}
              >
                Купить за {item.price} ₽
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* OFFER */}
      <section id="offer-section" className="max-w-6xl mx-auto px-6 pb-10">
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
              Администрация WayWorlds предоставляет виртуальные товары (внутриигровую валюту ВОН, донат-валюту WC, предметы, привилегии), не имеющие реальной денежной стоимости и не подлежащие обмену на реальные деньги.</p>

              <p><strong className="text-gray-600">3. Курс и оплата</strong><br />
              Курс донат-валюты: 1 ₽ = 3,5 WC. Все цены указаны в рублях РФ. Оплата производится через защищённые платёжные системы. После успешной оплаты товар начисляется на аккаунт в течение 5 минут. При технических сбоях — обратитесь в поддержку.</p>

              <p><strong className="text-gray-600">4. Возврат средств</strong><br />
              Возврат возможен в течение 24 часов с момента покупки при условии, что виртуальный товар не был использован. Для оформления возврата обратитесь в поддержку через Telegram.</p>

              <p><strong className="text-gray-600">5. Ответственность</strong><br />
              Администрация не несёт ответственности за потерю товаров вследствие нарушения правил сервера, блокировки аккаунта или передачи данных третьим лицам.</p>

              <p><strong className="text-gray-600">6. Контакты</strong><br />
              По вопросам оплаты и возврата: <a href="https://t.me/wayworlds" className="underline hover:text-gray-600">Telegram-поддержка</a> или <a href="mailto:admin@wayworlds.ru" className="underline hover:text-gray-600">admin@wayworlds.ru</a></p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#25c666" }}>
              <Icon name="Zap" size={12} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">WayWorlds</span>
          </Link>
          <p className="text-xs text-gray-300">© 2025 WayWorlds. Все права защищены.</p>
          <div className="flex gap-5 text-xs text-gray-300">
            <button onClick={scrollToOffer} className="hover:text-gray-500 transition-colors">
              Оферта оплаты
            </button>
            <a href="#" className="hover:text-gray-500 transition-colors">Соглашение</a>
          </div>
        </div>
      </footer>
    </div>
  );
}