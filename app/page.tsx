import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { BusinessSelector } from "@/components/business-selector";
import { ManufacturingGallery } from "@/components/manufacturing-gallery";
import { PeopleGallery } from "@/components/people-gallery";
import { ExhibitionGallery } from "@/components/exhibition-gallery";
import { StoryTimeline } from "@/components/story-timeline";
import { ContactForm } from "@/components/contact-form";
import { ExpandedFooter } from "@/components/expanded-footer";
import { MobileNav } from "@/components/mobile-nav";

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <Link className="header-logo-link" href="/" aria-label="Siflon Group home">
          <img className="header-logo" src="/images/siflon-group-logo.png" alt="Siflon Group" width="195" height="65" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#group">The Group</a>
          <a href="#businesses">Our Businesses</a>
          <a href="#manufacturing">Manufacturing</a>
          <a href="#story">Our Story</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#businesses">Explore businesses <ArrowUpRight size={16} /></a>
        <MobileNav />
      </header>

      <Hero />

      <section className="intro section-shell" id="group">
        <div className="eyebrow">A connected group of specialist businesses</div>
        <div className="intro-grid">
          <h2>Different disciplines.<br /><em>Shared ambition.</em></h2>
          <div className="intro-copy">
            <p>Siflon Group brings together specialist businesses serving pharmaceutical, animal-health and advanced industrial-materials markets. Each business operates with its own products, markets and teams, while sharing a common focus on quality manufacturing and direct customer relationships.</p>
            <p>Our group website is designed to make each business easier to discover while presenting a clear, consistent view of the wider organisation.</p>
            <a className="text-link" href="#businesses">Discover the businesses <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="business-section" id="businesses">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Our businesses</div>
              <h2>Four divisions.<br /><em>One manufacturing group.</em></h2>
            </div>
            <p>Three published business divisions with verified details. A fourth division, Siflon Pipes, is included for completeness while its details are pending verification.</p>
          </div>
        </div>
        <BusinessSelector />
      </section>

      <section className="manufacturing section-shell" id="manufacturing">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Manufacturing &amp; infrastructure</div>
            <h2>Facilities built for <em>specialised production.</em></h2>
          </div>
          <p>Production sites, laboratories and inspection areas supporting the Siflon Group businesses. Photographs are representative facility images pending business-specific verification.</p>
        </div>
        <ManufacturingGallery
          images={[
            { src: "/images/facilities/facility_00.jpg", alt: "Manufacturing facility exterior" },
            { src: "/images/facilities/facility_01.jpg", alt: "Production hall interior" },
            { src: "/images/facilities/facility_03.jpg", alt: "Quality control laboratory" },
            { src: "/images/facilities/facility_04.jpg", alt: "Warehouse and logistics" },
            { src: "/images/facilities/facility_06.jpg", alt: "Processing equipment" },
          ]}
          rows={[
            {
              image: { src: "/images/facilities/facility_00.jpg", alt: "Manufacturing facility exterior" },
              imageSide: "left",
              number: "01",
              category: "Facility infrastructure",
              heading: "Facility infrastructure",
              description: "Production environments supporting the Siflon Group businesses. Representative facility imagery; specific business association is pending verification.",
            },
            {
              image: { src: "/images/facilities/facility_01.jpg", alt: "Production hall interior" },
              imageSide: "right",
              number: "02",
              category: "Manufacturing environment",
              heading: "Manufacturing environment",
              description: "Interior production areas across the Siflon Group sites. Photographs are representative and have not been individually verified by business division.",
            },
            {
              image: { src: "/images/facilities/facility_03.jpg", alt: "Quality control laboratory" },
              imageSide: "left",
              number: "03",
              category: "Quality control",
              heading: "Quality control",
              description: "Laboratory and inspection areas supporting production. Specific laboratory locations and equipment are pending verification.",
            },
            {
              image: { src: "/images/facilities/facility_04.jpg", alt: "Warehouse and logistics" },
              imageSide: "right",
              number: "04",
              category: "Logistics",
              heading: "Logistics and storage",
              description: "Warehouse and handling areas associated with the Siflon Group operations. Details are pending verification.",
            },
            {
              image: { src: "/images/facilities/facility_06.jpg", alt: "Processing equipment" },
              imageSide: "left",
              number: "05",
              category: "Processing equipment",
              heading: "Processing equipment",
              description: "Production equipment within the Siflon Group facility environments. Specific machinery and capacity are pending verification.",
            },
          ]}
        />
      </section>

      <section className="story-section section-shell" id="story">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Our story</div>
            <h2>Evolution of a <em>manufacturing group.</em></h2>
          </div>
          <p>Verified milestones drawn from official business websites and regulatory filings.</p>
        </div>
        <StoryTimeline />
      </section>

      <section className="exhibitions section-shell">
        <ExhibitionGallery />
      </section>

      <section className="people section-shell">
        <div className="section-heading">
          <div>
            <div className="eyebrow">People behind Siflon</div>
            <h2>Driven by people. <em>Built on expertise.</em></h2>
          </div>
          <p>Team photographs are pending visual review before publication. Client photographs are not presented as employee portraits.</p>
        </div>
        <PeopleGallery images={[]} />
      </section>

      <section className="capabilities section-shell" id="capabilities">
        <div className="capability-visual">
          <img
            className="capability-image"
            src="/images/siflon-group-logo.png"
            alt="Siflon Group brand mark"
            loading="lazy"
          />
        </div>
        <div className="capability-copy">
          <div className="eyebrow">How we work</div>
          <h2>Capability built through <em>specialisation.</em></h2>
          <p>Each Siflon business has its own market, products and expertise. The group experience should help customers find the right team, understand the relevant capabilities and make a direct enquiry.</p>
          <ul>
            <li><span>01</span> Specialist business knowledge</li>
            <li><span>02</span> Manufacturing and product focus</li>
            <li><span>03</span> Direct routes to business teams</li>
          </ul>
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div className="section-shell contact-inner">
          <div className="contact-left">
            <div className="eyebrow light">Start a conversation</div>
            <h2>Looking for the right<br /><em>Siflon team?</em></h2>
            <p className="contact-intro">Use the enquiry form or contact a verified business directly. This form is front-end only and no backend is connected.</p>
            <div className="contact-direct">
              <a href="mailto:info@siflonpharma.com" className="contact-button">Contact Siflon Pharma <ArrowUpRight size={18} /></a>
            </div>
            <ul className="contact-details">
              <li><strong>Siflon Pharma Private Limited</strong><br />info@siflonpharma.com<br />siflonpharma.com</li>
              <li><strong>Siflon Drugs and Pharmaceuticals Private Limited</strong><br />siflondrugs.com</li>
              <li><strong>Siflon Polymers Private Limited</strong><br />siflonpolymers.com</li>
              <li><strong>Siflon Pipes</strong><br />Details pending verification</li>
            </ul>
          </div>
          <div className="contact-right">
            <ContactForm />
          </div>
        </div>
      </section>

      <ExpandedFooter />
    </main>
  );
}