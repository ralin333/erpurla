export const dynamic = 'force-dynamic';
export const revalidate = 0;


"use client";

import { useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });
      if (res.ok) window.location.href = "/";
      else alert("Hatalı giriş");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "48px auto", padding: 16, border: "1px solid #e5e5e5", borderRadius: 12 }}>
      <h2 style={{ marginTop: 0 }}>ERP Giriş</h2>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Kullanıcı" style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
        <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Şifre" type="password" style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
        <button disabled={loading} style={{ padding: 12, borderRadius: 10, border: 0, background: "#0b0b0b", color: "#fff", fontWeight: 700 }}>
          {loading ? "..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
