import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The focus ring. Applied on `:focus-visible` only, so a mouse click never
 * paints a ring but a Tab key always does.
 */
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * The default spring. Quick and slightly tight — it settles without a visible
 * bounce, which is what you want for anything that appears under the cursor.
 */
const SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.8,
} as const;

/**
 * Join class names, and let a later Tailwind class win over an earlier one.
 *
 * Extended with the Layro type scale — without it, `text-title` would be read
 * as a colour and silently dropped next to `text-foreground`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["figure", "title", "body", "sub", "dense", "meta", "chip", "micro"] }],
      shadow: [{ shadow: ["float", "overlay"] }],
    },
  },
});

/**
 * Join class names, and let a later Tailwind class win over an earlier one.
 *
 * The same `cn` shadcn/ui ships in `lib/utils`, so a buyer's `className`
 * override does what they expect: `<Button className="h-11" />` replaces the
 * button's own height rather than fighting it in the cascade.
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { cn, FOCUS, SPRING };