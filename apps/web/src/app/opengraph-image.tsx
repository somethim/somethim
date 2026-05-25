import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mario Vukzaj — Brand & Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: "80px",
        background:
          "linear-gradient(135deg, #0d0d14 0%, #1a1025 50%, #0d0d14 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-100px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(116,212,255,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(218,178,255,0.14) 0%, transparent 70%)",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: "120px",
            fontWeight: 900,
            color: "white",
            letterSpacing: "-4px",
            lineHeight: 0.85,
          }}
        >
          MARIO
        </span>
        <span
          style={{
            fontSize: "120px",
            fontWeight: 900,
            color: "white",
            letterSpacing: "-4px",
            lineHeight: 0.85,
            paddingLeft: "80px",
          }}
        >
          VUKZAJ
        </span>
      </div>

      <div
        style={{
          width: "60px",
          height: "2px",
          background: "rgba(255,255,255,0.3)",
          margin: "32px 0 24px",
          display: "flex",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.02em",
          }}
        >
          Brand &amp; Product Designer
        </span>
        <span
          style={{
            fontSize: "18px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.01em",
          }}
        >
          mariovukzaj.com
        </span>
      </div>
    </div>,
    { ...size },
  );
}
