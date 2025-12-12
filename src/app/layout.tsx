import Navbar from "../components/Navbar";

export const metadata = { title: "ERP Urla" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" }}>
        <Navbar />
        <main style={{ padding: 16 }}>{children}</main>
      </body>
    </html>
  );
}
