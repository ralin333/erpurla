import { requireAuth } from "../lib/auth";
import { dbQuery } from "../lib/db";

export default async function Dashboard() {
  try { requireAuth(); }
  catch { return <div><h2>Giriş gerekli</h2><p><a href="/login">Login</a></p></div>; }

  const rows = await dbQuery<{ ciro: string | null; maliyet: string | null; kar: string | null }>(`
    SELECT
      SUM(line_total)::numeric(18,2) AS ciro,
      SUM(line_cost)::numeric(18,2) AS maliyet,
      SUM((line_total - line_cost))::numeric(18,2) AS kar
    FROM finans_fatura_satir
  `);
  const s = rows[0] || { ciro: "0", maliyet: "0", kar: "0" };

  const Card = ({ title, value }: { title: string; value: any }) => (
    <div style={{ padding: 16, border: "1px solid #e5e5e5", borderRadius: 12 }}>
      <div style={{ color: "#666", fontSize: 13 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6 }}>{value ?? "0"} TL</div>
    </div>
  );

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <Card title="Toplam Ciro" value={s.ciro} />
        <Card title="Toplam Maliyet" value={s.maliyet} />
        <Card title="Brüt Kâr" value={s.kar} />
      </div>
    </div>
  );
}
