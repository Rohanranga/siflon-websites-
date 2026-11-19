"use client";

interface PersonImage {
  src: string;
  alt: string;
}

interface PeopleGalleryProps {
  images: PersonImage[];
}

import { HoverRevealCards, CardItem } from "@/components/ui/hover-reveal-cards";

export function PeopleGallery({ images }: PeopleGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="people-pending">
        <div className="people-pending-card">
          <span className="people-pending-tag">Pending visual review</span>
          <p>
            Team photographs are pending visual review before publication. Client
            photographs are not presented as employee portraits, and no employee names
            or designations are published without verification.
          </p>
        </div>
      </div>
    );
  }

  const cardItems: CardItem[] = images.map((image) => ({
    id: image.src,
    title: image.alt,
    subtitle: "Team member",
    imageUrl: image.src,
  }));

  return (
    <HoverRevealCards
      items={cardItems}
      cols={4}
      height="h-80"
      cardClassName="people-reveal-card"
    />
  );
}