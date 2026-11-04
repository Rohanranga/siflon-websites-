import { ArrowUpRight } from "lucide-react";
import { BUSINESSES } from "@/data/businesses";

const FOOTER_LINKS = [
  { label: "The Group", href: "#group" },
  { label: "Our Businesses", href: "#businesses" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Quality", href: "#quality" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#contact" },
];

export function ExpandedFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="#">
              <span className="brand-mark">S</span>
              <span className="brand-copy">
                <strong>SIFLON</strong>
                <small>GROUP</small>
              </span>
            </a>
            <p>One group. Diverse expertise.</p>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            {FOOTER_LINKS.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>Businesses</h4>
            {BUSINESSES.map((business) => (
              <a
                key={business.slug}
                href={business.officialWebsite ?? "#"}
                target={business.officialWebsite ? "_blank" : undefined}
                rel={business.officialWebsite ? "noreferrer" : undefined}
                className={business.publicationStatus === "pending" ? "footer-link-pending" : undefined}
              >
                {business.legalName ?? business.slug}
                {business.publicationStatus === "pending" && " (pending verification)"}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:info@siflonpharma.com">info@siflonpharma.com</a>
            <a href="tel:+919618828282">+91 9618828282</a>
            <a href="https://siflonpharma.com/" target="_blank" rel="noreferrer">
              siflonpharma.com <ArrowUpRight size={14} />
            </a>
            <p className="footer-note">
              Contact details are verified from official business websites. Siflon Pipes contact
              details are pending verification and are not published.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Siflon Group.</span>
        </div>
      </div>
    </footer>
  );
}
