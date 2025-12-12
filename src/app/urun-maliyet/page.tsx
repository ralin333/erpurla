"use client";

import { useEffect, useMemo, useState } from "react";

type Row = { product_code: string; product_name: string | null; unit_cost: number | null };

export default function UrunMaliyetPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  async function load() {
    const res = await fetch("/api/urun-maliyet/list");
    if (res.status === 401) { window.location.href = "/login"; return; }
    setRows(await res.json());
  }

  async function save(product_code: string, unit_cost: number) {
    setSaving((s) => ({ ...s, [product_code]: true }));
    try {
      await fetch("/api/urun-maliyet/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_code, unit_cost }),
      });
    } finally {
      setSaving((s) => ({ ...s, [product_code]: false }));
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return rows;
    return rows.filter((r) =>
      (r.product_code || "").toLowerCase().includes(t) ||
      (r.product_name || "").toLowerCase().includes(t)
    );
  }, [rows, q]);

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Ürün Maliyetleri</h1>

      <div style={{ marginBottom: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ara: ürün kodu / adı"
          style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd", minWidth: 260 }} />
        <button onClick={load} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", background: "#fff" }}>
          Yenile
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #e5e5e5" }}>Kod</th>
              <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #e5e5e5" }}>Ürün</th>
              <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #e5e5e5" }}>Birim Maliyet</th>
              <th style={{ padding: 10, borderBottom: "1px solid #e5e5e5" }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <RowItem key={r.product_code} row={r} onSave={save} isSaving={!!saving[r.product_code]} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RowItem({ row, onSave, isSaving }: { row: Row; onSave: (pc: string, uc: number) => Promise<void>; isSaving: boolean }) {
  const [val, setVal] = useState<string>(row.unit_cost?.toString() ?? "");

  useEffect(() => { setVal(row.unit_cost?.toString() ?? ""); }, [row.unit_cost]);

  return (
    <tr>
      <td style={{ padding: 10, borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{row.product_code}</td>
      <td style={{ padding: 10, borderBottom: "1px solid #f0f0f0" }}>{row.product_name ?? ""}</td>
      <td style={{ padding: 10, borderBottom: "1px solid #f0f0f0" }}>
        <input value={val} onChange={(e) => setVal(e.target.value)} inputMode="decimal"
          style={{ padding: 8, borderRadius: 10, border: "1px solid #ddd", width: 140 }} />
      </td>
      <td style={{ padding: 10, borderBottom: "1px solid #f0f0f0", textAlign: "right" }}>
        <button disabled={isSaving} onClick={() => onSave(row.product_code, Number(val || 0))}
          style={{ padding: "8px 12px", borderRadius: 10, border: 0, background: "#0b0b0b", color: "#fff", fontWeight: 700 }}>
          {isSaving ? "..." : "Kaydet"}
        </button>
      </td>
    </tr>
  );
}
