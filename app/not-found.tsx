import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <div className="section-shell" style={{ padding: "80px 10%", textAlign: "center" }}>
        <h2>404 - Page Not Found</h2>
        <p style={{ marginTop: "12px", color: "#647482" }}>
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "10px 20px",
            background: "var(--navy)",
            color: "#fff",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
