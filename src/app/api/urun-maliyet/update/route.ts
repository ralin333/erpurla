import { NextResponse } from "next/server";
import { requireAuth } from "../../../../lib/auth";
import { dbQuery } from "../../../../lib/db";

export async function POST(req: Request) {
  try { requireAuth(); }
  catch { return NextResponse.json({ error: "unauthorized" }, { status: 401 }); }

  const { product_code, unit_cost } = await req.json();
  if (!product_code) return NextResponse.json({ error: "product_code required" }, { status: 400 });

  await dbQuery(`UPDATE urun_maliyet SET unit_cost = $1 WHERE product_code = $2`, [unit_cost ?? 0, product_code]);
  return NextResponse.json({ ok: true });
}
