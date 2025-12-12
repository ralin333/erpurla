import { requireAuth } from "../../lib/auth";

export default function Raporlar() {
  try { requireAuth(); }
  catch { return <div><h2>Giriş gerekli</h2><p><a href="/login">Login</a></p></div>; }

  const url = process.env.METABASE_URL || "";
  if (!url) return <div><h2>Metabase URL tanımlı değil</h2><p>Coolify env içine METABASE_URL ekle.</p></div>;

  return <iframe src={url} style={{ width: "100%", height: "85vh", border: 0 }} />;
}
