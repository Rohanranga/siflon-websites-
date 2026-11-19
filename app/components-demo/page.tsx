"use client";

import { ArrowRight } from "lucide-react";
import { LiquidNavbar, NimbusIcons } from "@/components/ui/liquid-glass-navbar";
import { WebShotButton } from "@/components/ui/web-shot-button";

export default function ComponentsDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Liquid Glass Navbar Demo */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Liquid Glass Navbar</h2>
          <p className="text-gray-600 mb-6 max-w-2xl">
            A pill of water. The active drop stretches toward the item you pick, splits into droplets on long jumps
            and merges back with a ripple. The cursor lifts a meniscus, every tap sends a wave along the pill.
          </p>

          <div className="bg-[#DCEBF5] rounded-xl p-12 flex justify-center">
            <LiquidNavbar
              tone="light"
              defaultActive={0}
              sound={false}
              items={[
                { label: "Home", icon: NimbusIcons.home, fx: "glow" },
                { label: "Explore", icon: NimbusIcons.globe, fx: "spin" },
                { label: "Flights", icon: NimbusIcons.plane, fx: "plane" },
                { label: "Weather", icon: NimbusIcons.drop, fx: "drop" },
                { label: "Profile", icon: NimbusIcons.user, fx: "wave" },
              ]}
            />
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Props Interface</h3>
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`interface LiquidNavItem {
  label: string
  href?: string
  icon?: React.ReactNode
  fx?: "plane" | "drop" | "spin" | "glow" | "wave" | "pop" | "none"
}

interface LiquidNavbarProps {
  items?: LiquidNavItem[]
  defaultActive?: number
  active?: number
  onChange?: (index: number, item: LiquidNavItem) => void
  tone?: "light" | "dark"
  compact?: boolean
  sound?: boolean
  className?: string
  style?: React.CSSProperties
}`}
            </pre>
          </div>
        </section>

        {/* Web Shot Button Demo */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Web Shot Button</h2>
          <p className="text-gray-600 mb-6 max-w-2xl">
            A glass pill that shoots silk at the pointer. Bring the cursor near and thin threads leave the edge facing
            it, meet at the pointer and hang there with a little slack; move away and they let go and spring back.
          </p>

          <div className="flex flex-wrap gap-8 items-center justify-center mb-8">
            <WebShotButton size="lg" color="#E0242F">
              Explore components
              <ArrowRight className="size-5" />
            </WebShotButton>

            <WebShotButton size="md" color="#2563EB">
              Get early access
            </WebShotButton>

            <WebShotButton size="lg" color="clear">
              Transparent glass
            </WebShotButton>

            <WebShotButton size="lg" color="#059669">
              Custom green tint
            </WebShotButton>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 flex justify-center gap-8">
            <WebShotButton size="lg" color="#F59E0B">
              Dark mode example
              <ArrowRight className="size-5" />
            </WebShotButton>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Props Interface</h3>
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`interface WebShotButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  size?: "md" | "lg"           // Default: "lg" (56px / 44px)
  color?: string               // Hex, rgb(), or "clear" for untinted
  reach?: number               // Pointer detection distance (default: 140px)
  threads?: number             // Number of silk threads (default: 5)
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  onClick?: () => void
}`}
            </pre>
          </div>
        </section>

        {/* Combined Usage Example */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Combined in Navigation</h2>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Example of using LiquidNavbar for primary navigation and WebShotButton for CTAs.
          </p>

          <nav className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-8">
                <span className="font-bold text-xl text-gray-900">Siflon Group</span>
                <LiquidNavbar
                  tone="light"
                  defaultActive={0}
                  compact
                  items={[
                    { label: "Home", icon: NimbusIcons.home, fx: "glow" },
                    { label: "Products", icon: NimbusIcons.box, fx: "pop" },
                    { label: "Gallery", icon: NimbusIcons.image, fx: "wave" },
                    { label: "Companies", icon: NimbusIcons.building, fx: "spin" },
                  ]}
                />
              </div>
              <WebShotButton color="#253C80">
                Contact Us
                <ArrowRight className="size-4" />
              </WebShotButton>
            </div>
          </nav>
        </section>
      </div>
    </div>
  );
}