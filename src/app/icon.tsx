import { ImageResponse } from "next/og";
import { SIGNATURE_PATH } from "./(main)/_components/signature";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 64,
        height: 64,
        background: "#080810",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 1973 1203" width={96} height={60} fill="white">
        <path d={SIGNATURE_PATH} />
      </svg>
    </div>,
    { width: 64, height: 64 },
  );
}
