import { PageShell } from "@/components/page-shell";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

interface Location {
  type: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode?: string;
  country: string;
}

const LOCATIONS: Location[] = [
  {
    type: "Group Office",
    name: "Siflon Group",
    address: "Miyapur",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
  },
  {
    type: "Manufacturing Plant",
    name: "Siflon Drugs",
    address: "Plot No. 20 & 21, ALEAP Industrial Estate",
    city: "Gajularamaram",
    state: "Hyderabad",
    pincode: "500055",
    country: "Telangana, India",
  },
  {
    type: "Manufacturing Plant",
    name: "Siflon Pharma",
    address: "Sy.No.25-4, Rachanapalli Village",
    city: "Anantapur",
    state: "Andhra Pradesh",
    pincode: "515006",
    country: "India",
  },
  {
    type: "API Manufacturing Facility",
    name: "Siflon Pharma",
    address: "Plot No. 58, 5B/2, APSEZ De-Notified Area",
    city: "Atchutapuram",
    state: "Anakapalli",
    pincode: "531011",
    country: "Andhra Pradesh, India",
  },
  {
    type: "Manufacturing Plant",
    name: "Siflon Polymers",
    address: "Mankhal Plastic Park",
    city: "Rangareddy",
    state: "Telangana",
    country: "India",
  },
  {
    type: "Pipes Division",
    name: "Siflon Pipes",
    address: "Industrial Area",
    city: "Anantapur",
    state: "Andhra Pradesh",
    country: "India",
  },
];

export default function LocationsPage() {
  return (
    <PageShell eyebrow="Locations" title="Our facilities around India." subtitle="Production sites, group offices, and manufacturing plants for Siflon Group businesses.">
      <section className="locations-section">
        <div className="locations-grid">
            {LOCATIONS.map((location, index) => (
              <article key={index} className="location-card">
                <div className="location-card-header">
                  <MapPin size={18} className="location-icon" aria-hidden />
                  <span className="location-type">{location.type}</span>
                </div>
                <h3 className="location-name">{location.name}</h3>
                <address className="location-address">
                  <p>{location.address}</p>
                  <p>
                    {location.city}, {location.state}
                    {location.pincode && ` ${location.pincode}`}
                  </p>
                  <p>{location.country}</p>
                </address>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(location.name + ' ' + location.address + ' ' + location.city)}`} target="_blank" rel="noreferrer" className="location-map-link">
                  View on map
                  <ExternalLink size={12} aria-hidden />
                </a>
              </article>
            ))}
          </div>
        </section>
    </PageShell>
  );
}