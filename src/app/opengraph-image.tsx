import { ImageResponse } from "next/og";

import { SITE_CONFIG } from "@/lib/site-config";

export const alt = "박태규 백엔드 개발자 포트폴리오";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#0b1630",
          padding: "68px 76px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          <span>
            {SITE_CONFIG.name} / {SITE_CONFIG.role}
          </span>
          <span style={{ color: "#087b70" }}>PORTFOLIO · ARCHIVE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ color: "#087b70", fontSize: 28, fontWeight: 700 }}>
            신입 백엔드 개발자
          </span>
          <span
            style={{
              maxWidth: 980,
              fontSize: 70,
              lineHeight: 1.18,
              letterSpacing: "-3px",
              fontWeight: 800,
            }}
          >
            부족함을 발견하면,
            <br />
            다음 프로젝트에서 직접 확인합니다.
          </span>
        </div>
        <span style={{ fontSize: 22, color: "#596579" }}>
          University → Team Projects × 4 → CoffeeProd
        </span>
      </div>
    ),
    size,
  );
}
