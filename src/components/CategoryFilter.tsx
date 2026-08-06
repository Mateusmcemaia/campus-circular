import { CATEGORIES, type Category } from "@/lib/listings";
import { cn } from "@/lib/utils";

export type CategoryFilterValue = Category | "Todos";

export function CategoryFilter({
  value,
  onChange,
}: {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}) {
  const options: CategoryFilterValue[] = ["Todos", ...CATEGORIES];

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
            value === option
              ? "border-primary bg-primary text-primary-foreground shadow-soft"
              : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
