import { ImageResponse } from "next/og";

export const alt = "Mansitra — private AI companion for Indian students";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ background: "#08131b", color: "white", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", fontFamily: "sans-serif" }}><div style={{ color: "#5eead4", fontSize: 30, letterSpacing: 8 }}>MANN KA MITRA</div><div style={{ fontSize: 92, fontWeight: 700, marginTop: 28 }}>Mansitra</div><div style={{ fontSize: 36, marginTop: 24, color: "#d1d5db" }}>Your private AI companion for exam stress and student wellbeing</div><div style={{ fontSize: 24, marginTop: 54, color: "#99f6e4" }}>Free · Anonymous · Made for Indian students</div></div>, { ...size });
}
