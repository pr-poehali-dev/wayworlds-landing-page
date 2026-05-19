import { useTheme } from "@/context/ThemeContext";
import Icon from "@/components/ui/icon";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Переключить тему"
      className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all
        border-gray-200 text-gray-500 hover:bg-gray-50
        dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
    >
      <Icon name={theme === "dark" ? "Sun" : "Moon"} size={16} />
    </button>
  );
}
