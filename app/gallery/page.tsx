import { GalleryGrid } from "@/components/gallery-grid";
import { PageShell } from "@/components/page-shell";
import { GALLERY_CATEGORIES, GALLERY_IMAGES } from "@/data/gallery";

function buildGridImages() {
  return GALLERY_IMAGES.filter((image) => !image.pending).map((image) => ({
    id: image.id,
    src: image.src,
    alt: image.alt,
    title: image.title,
    caption: image.caption,
    category: image.category,
    meta:
      image.location || image.year ? (
        <span className="gallery-card-meta">
          {image.location && <span>{image.location}</span>}
          {image.year && <span className="gallery-card-year">{image.year}</span>}
        </span>
      ) : undefined,
  }));
}

export default function GalleryPage() {
  const approvedImages = buildGridImages();
  const categories = GALLERY_CATEGORIES.map((category) => ({
    id: category.id,
    label: category.label,
  }));

  return (
    <PageShell
      eyebrow="Gallery"
      title="Photography archive."
      subtitle="Facility, exhibition and corporate imagery from the Siflon Group archives. Photographs are pending visual review before publication and are not presented as verified facts."
    >
      <section className="gallery-section">
        <div className="section-shell">
          {approvedImages.length === 0 ? (
            <div className="gallery-pending-intro">
              <span className="gallery-pending-tag">Pending visual review</span>
              <p>
                All photographs held in the project archive are pending visual review
                before publication. They are retained internally and will be published
                here once approved. No image descriptions have been invented and no
                people are identified as employees without verification.
              </p>
              <div className="gallery-pending-list">
                {GALLERY_CATEGORIES.map((category) => (
                  <div key={category.id} className="gallery-pending-row">
                    <strong>{category.label}</strong>
                    <span>{category.count} photographs pending review</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <GalleryGrid
              images={approvedImages}
              categories={categories}
              emptyMessage="No approved images are available for this category yet."
            />
          )}
        </div>
      </section>
    </PageShell>
  );
}