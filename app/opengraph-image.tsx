import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Rahmita Paramita Sudirman — product development specialist creating solutions for beauty growth.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/*
 * Satori (the renderer behind `next/og`) can only read TTF/OTF/WOFF fonts, not
 * the WOFF2 Google serves to browsers — so the weights this card needs are
 * vendored as TTF in `app/fonts/og/`. Assets are read once at module scope so
 * the route stays statically optimizable, mirroring the pattern in the Next.js
 * opengraph-image docs for local assets.
 */
const [archivoData, grotesk500Data, grotesk600Data, monoData, portraitData] =
  await Promise.all([
    readFile(join(process.cwd(), "app/fonts/og/ArchivoBlack-Regular.ttf")),
    readFile(join(process.cwd(), "app/fonts/og/SpaceGrotesk-500.ttf")),
    readFile(join(process.cwd(), "app/fonts/og/SpaceGrotesk-600.ttf")),
    readFile(join(process.cwd(), "app/fonts/og/JetBrainsMono-Regular.ttf")),
    readFile(join(process.cwd(), "app/og/portrait.jpg")),
  ]);

const portraitSrc = `data:image/jpeg;base64,${portraitData.toString("base64")}`;

const fonts = [
  { name: "Archivo Black", data: archivoData, weight: 400, style: "normal" },
  { name: "Space Grotesk", data: grotesk500Data, weight: 500, style: "normal" },
  { name: "Space Grotesk", data: grotesk600Data, weight: 600, style: "normal" },
  { name: "JetBrains Mono", data: monoData, weight: 400, style: "normal" },
] as const;

const INK = "#000000";
const CREAM = "#FFF7E8";
const YELLOW = "#FFDC58";
const SAND = "#6B6355";

/** Grid of ink dots used as a corner decoration. */
function DotGrid({ cols, rows }: { cols: number; rows: number }) {
  const dot = (idx: number) => (
    <div
      key={idx}
      style={{
        display: "flex",
        width: "7px",
        height: "7px",
        borderRadius: "9999px",
        background: INK,
      }}
    />
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} style={{ display: "flex", gap: "13px" }}>
          {Array.from({ length: cols }).map((__, col) => dot(col))}
        </div>
      ))}
    </div>
  );
}

function StatChip({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#FFFFFF",
        border: "3px solid #000",
        boxShadow: "5px 5px 0 #000",
        padding: "13px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "13px",
          height: "13px",
          background: YELLOW,
          border: "2px solid #000",
        }}
      />
      <div
        style={{
          display: "flex",
          fontFamily: "Space Grotesk",
          fontWeight: 600,
          fontSize: 20,
          color: INK,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/** Neo-brutalist marketing card, matching the site's tokens from globals.css. */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: CREAM,
        padding: "22px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "4px solid #000",
          background: CREAM,
        }}
      >
        <div style={{ display: "flex", flex: "1", width: "100%" }}>
          {/* Left — type-led column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1",
              padding: "40px 8px 10px 54px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  display: "flex",
                  width: "13px",
                  height: "13px",
                  background: YELLOW,
                  border: "2px solid #000",
                }}
              />
              <div
                style={{
                  display: "flex",
                  fontFamily: "JetBrains Mono",
                  fontSize: 19,
                  letterSpacing: "2px",
                  color: SAND,
                }}
              >
                RAHMITA PARAMITA SUDIRMAN
              </div>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "32px",
                fontFamily: "Archivo Black",
                fontSize: 64,
                lineHeight: "1.06",
                color: INK,
              }}
            >
              CREATING
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Archivo Black",
                fontSize: 64,
                lineHeight: "1.06",
                color: INK,
              }}
            >
              SOLUTIONS FOR
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: "Archivo Black",
                  fontSize: 64,
                  lineHeight: "1.06",
                  color: INK,
                  background: YELLOW,
                  border: "3px solid #000",
                  boxShadow: "6px 6px 0 #000",
                  padding: "0px 16px 10px",
                }}
              >
                BEAUTY
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily: "Archivo Black",
                  fontSize: 64,
                  lineHeight: "1.06",
                  color: INK,
                }}
              >
                GROWTH.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "32px",
                fontFamily: "Space Grotesk",
                fontWeight: 500,
                fontSize: 26,
                color: SAND,
              }}
            >
              Product Development Specialist · Indonesia
            </div>

            <div
              style={{
                display: "flex",
                gap: "18px",
                marginTop: "auto",
                marginBottom: "14px",
              }}
            >
              <StatChip label="10,000+ pcs/mo reorder" />
              <StatChip label="Cosmetic R&D" />
            </div>
          </div>

          {/* Right — portrait card */}
          <div
            style={{
              display: "flex",
              position: "relative",
              width: "400px",
            }}
          >
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: "24px",
                right: "40px",
              }}
            >
              <DotGrid cols={6} rows={2} />
            </div>

            <div
              style={{
                display: "flex",
                position: "absolute",
                top: "92px",
                right: "38px",
                width: "332px",
                height: "416px",
                background: YELLOW,
                border: "3px solid #000",
                transform: "rotate(2deg)",
              }}
            />
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: "74px",
                right: "52px",
                width: "332px",
                height: "416px",
                border: "3px solid #000",
                background: "#FFFFFF",
                transform: "rotate(-2deg)",
              }}
            >
              <img
                src={portraitSrc}
                alt=""
                width={332}
                height={416}
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 30%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "59px",
            borderTop: "3px solid #000",
            padding: "0 54px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                width: "16px",
                height: "16px",
                borderRadius: "9999px",
                background: YELLOW,
                border: "2px solid #000",
              }}
            />
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains Mono",
                fontSize: 21,
                color: INK,
              }}
            >
              rahmita.my.id
            </div>
          </div>
          <div style={{ display: "flex", gap: "9px" }}>
            {[0, 1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  width: "9px",
                  height: "9px",
                  background: idx === 0 ? YELLOW : INK,
                  border: "1px solid #000",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>,
    { ...size, fonts: [...fonts] },
  );
}
