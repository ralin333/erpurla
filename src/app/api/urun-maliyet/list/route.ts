import { NextResponse } from "next/server";
import { requireAuth } from "../../../../lib/auth";
import { dbQuery } from "../../../../lib/db";

export async function GET() {
  try { requireAuth(); }
  catch { return NextResponse.json({ error: "unauthorized" }, { status: 401 }); }

  const rows = await dbQuery(`
    SELECT product_code, product_name, unit_cost
    FROM urun_maliyet
    ORDER BY product_code
  `);

  return NextResponse.json(rows);
}
