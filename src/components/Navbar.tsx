"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const A = ({ href, children }: { href: string; children: any }) => {
  const p = usePathname();
  const active = p === href;
  return (
    <Link
      href={href}
      style={{
        color: active ? "#fff" : "#cfcfcf",
        textDecoration: "none",
        fontWeight: active ? 700 : 500,
      }}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: 18, padding: 16, background: "#0b0b0b" }}>
      <A href="/">Dashboard</A>
      <A href="/raporlar">Raporlar</A>
      <A href="/urun-maliyet">Ürün Maliyetleri</A>
      <A href="/login">Giriş</A>
    </nav>
  );
}
