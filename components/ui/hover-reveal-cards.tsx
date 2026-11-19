import React from 'react';
import { cn } from '@/lib/utils';

/**
 * @typedef CardItem
 * @property {string | number} id - Unique identifier for the card.
 * @property {string} title - The main title text of the card.
 * @property {string} subtitle - The subtitle or category text.
 * @property {string} imageUrl - The URL for the card's background image.
 * @property {string} [href] - Optional link URL for the card.
 */
export interface CardItem {
  id: string | number;
  title: string;
  subtitle: string;
  imageUrl: string;
  href?: string;
}

/**
 * @typedef HoverRevealCardsProps
 * @property {CardItem[]} items - An array of card item objects to display.
 * @property {string} [className] - Optional additional class names for the container.
 * @property {string} [cardClassName] - Optional additional class names for individual cards.
 * @property {number} [cols] - Number of columns on desktop (default 4).
 * @property {string} [height] - Card height (default h-80).
 */
export interface HoverRevealCardsProps {
  items: CardItem[];
  className?: string;
  cardClassName?: string;
  cols?: number;
  height?: string;
}

/**
 * A component that displays a grid of cards with a hover-reveal effect.
 * When a card is hovered or focused, it stands out while others are de-emphasized.
 * The background image zooms on hover for a subtle zoom effect.
 */
export const HoverRevealCards: React.FC<HoverRevealCardsProps> = ({
  items,
  className,
  cardClassName,
  cols = 4,
  height = 'h-80',
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      role="list"
      className={cn(
        'group grid w-full max-w-6xl gap-4 p-4',
        columnClasses[cols as keyof typeof columnClasses] || columnClasses[4],
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.id}
          role="listitem"
          aria-label={`${item.title}, ${item.subtitle}`}
          tabIndex={0}
          className={cn(
            `relative ${height} cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-in-out`,
            // On parent hover, apply these styles to all children (dim others)
            'group-hover:opacity-60 group-hover:blur-[2px]',
            // On child hover/focus, override parent hover styles to highlight the current item
            'hover:!opacity-100 hover:!blur-none focus-visible:!opacity-100 focus-visible:!blur-none',
            // Accessibility: Add focus ring using theme variables
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
            cardClassName
          )}
        >
          {/* Background image with zoom effect on hover */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out
                       group-hover:scale-105 hover:scale-105 focus-within:scale-105"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
            aria-hidden="true"
          />

          {item.href ? (
            <a href={item.href} className="absolute inset-0" aria-label={item.title} />
          ) : null}
          {/* Gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Card Content */}
          <div className="absolute bottom-0 left-0 p-6 text-white relative z-10">
            <p className="text-sm font-light uppercase tracking-widest opacity-80">
              {item.subtitle}
            </p>
            <h3 className="mt-1 text-2xl font-semibold">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoverRevealCards;