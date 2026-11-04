interface PersonImage {
  src: string;
  alt: string;
}

interface PeopleGalleryProps {
  images: PersonImage[];
}

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

  return (
    <div className="people-grid">
      {images.map((image, index) => (
        <figure key={image.src} className={`people-card people-${(index % 4) + 1}`}>
          <img src={image.src} alt={image.alt} loading="lazy" />
          <figcaption>{image.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}