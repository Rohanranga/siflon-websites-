"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowDown, ChevronDown, Building2, ExternalLink } from "lucide-react";
import { WebShotButton } from "@/components/ui/web-shot-button";
import { BUSINESSES } from "@/data/businesses";

export function Hero() {
  const [reduce, setReduce] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const listener = (event: MediaQueryListEvent) => setReduce(event.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCompaniesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="hero"
      aria-label="Siflon Group hero"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Background video - corporate reel */}
      <video
        className="hero-video is-active"
        src="/media/siflon-hero-reel.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,
        }}
      />

      {/* Fallback for video */}
      <div className="hero-fallback" />
      <div className="hero-overlay" />

      {/* Foreground content - horizontally and vertically centered over video */}
      <div className="hero-content-wrapper" style={{ padding: '0 20px', maxWidth: '720px', width: '100%', margin: 'auto' }}>
        <div className="hero-content-layer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="hero-kicker" style={{ justifyContent: 'center', margin: '0 auto 20px' }}>
            <span />
            SIFLON GROUP
          </div>
          <h1 style={{ fontSize: 'clamp(56px,5vw,72px)', lineHeight: '1.05', letterSpacing: '-3px', margin: '0 0 20px', fontWeight: '600', width: '100%' }}>
            One group.<br /><em>Diverse expertise.</em>
          </h1>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#f0f6fc', maxWidth: '540px', margin: '0 auto 32px' }}>
            Bringing together specialist capabilities across pharmaceuticals, animal health and advanced industrial materials.
          </p>

          {/* Single WebShotButton with Companies Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <WebShotButton
              size="lg"
              color="#4FB7E8"
              reach={180}
              threads={6}
              onClick={() => setCompaniesOpen(!companiesOpen)}
            >
              <Building2 size={18} aria-hidden />
              <span>Explore Our Companies</span>
              <ChevronDown
                size={16}
                style={{
                  transform: companiesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  marginLeft: '4px',
                }}
              />
            </WebShotButton>

            {companiesOpen && (
              <ul
                role="menu"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  minWidth: '240px',
                  background: '#fff',
                  border: '1px solid #dce3e8',
                  borderRadius: '12px',
                  boxShadow: '0 12px 32px rgba(16,42,67,0.18)',
                  padding: '8px',
                  zIndex: 20,
                  listStyle: 'none',
                  animation: 'dropdownFadeIn 0.15s ease',
                }}
              >
                {BUSINESSES.map((business) => (
                  <li key={business.slug} role="none">
                    <a
                      href={business.officialWebsite ?? `#businesses`}
                      target={business.officialWebsite ? "_blank" : undefined}
                      rel={business.officialWebsite ? "noreferrer" : undefined}
                      onClick={() => setCompaniesOpen(false)}
                      role="menuitem"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#425363',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                        width: '100%',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f4f6f8';
                        e.currentTarget.style.color = '#253C80';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#425363';
                      }}
                    >
                      {business.displayName}
                      {business.officialWebsite && <ExternalLink size={11} aria-hidden />}
                    </a>
                  </li>
                ))}
                <li role="menuitem">
                  <a
                    href="/about"
                    onClick={() => setCompaniesOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#253C80',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      width: '100%',
                      borderTop: '1px solid #eef3f6',
                      marginTop: '4px',
                      paddingTop: '12px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f4f6f8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    Explore the group →
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Scroll cue centered at bottom */}
      <div className="hero-bottom" style={{ position: 'absolute', bottom: '35px', left: '0', right: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <a href="#group" className="scroll-cue"><ArrowDown size={15} /> SCROLL TO EXPLORE</a>
      </div>

      <style jsx>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translate(-50%, -4px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}