"use client";

import { useEffect } from "react";
import { SiteHeader } from "@/components/site-header";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <SiteHeader />
      <div className="section-shell" style={{ padding: "80px 10%", textAlign: "center" }}>
        <h2>Something went wrong</h2>
        <button
          onClick={() => reset()}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "var(--navy)",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
