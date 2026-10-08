import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview card in the Maker look: a chunky white card on workshop grey, filament swatches.
export default function OpengraphImage() {
  const swatches = ["#ff6b35", "#00a6a6", "#ffc93c", "#b7a6ff"];
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", padding: 56, background: "#eef0f3", fontFamily: "sans-serif" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "#ffffff",
          border: "6px solid #141414",
          borderRadius: 40,
          boxShadow: "14px 14px 0 #141414",
          color: "#141414",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>Hey, I&apos;m</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 800, lineHeight: 0.88, letterSpacing: -6 }}>
          <span>Nihal</span>
          <span style={{ display: "flex" }}>
            Ayoob<span style={{ color: "#ff6b35" }}>.</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 16 }}>
            {swatches.map((c) => (
              <div key={c} style={{ width: 44, height: 44, borderRadius: 999, background: c, border: "5px solid #141414" }} />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>Full-stack · Android · 3D printing</div>
        </div>
      </div>
    </div>,
    size,
  );
}
