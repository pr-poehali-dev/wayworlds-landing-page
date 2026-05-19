import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const tabs = [
  { to: "/", label: "Главная", icon: "Home" },
  { to: "/donate", label: "Донат", icon: "Gem" },
  { to: "/rules", label: "Правила", icon: "BookOpen" },
];

export default function MobileNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-[#0f1318]/95 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const active = pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className="flex flex-col items-center gap-1 px-5 py-1.5 rounded-xl transition-colors"
              style={active ? { color: "#25c666" } : { color: "#9ca3af" }}
            >
              <Icon
                name={tab.icon}
                size={22}
                style={active ? { color: "#25c666" } : { color: "#9ca3af" }}
              />
              <span className="text-xs font-medium">{tab.label}</span>
              {active && (
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#25c666" }} />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}