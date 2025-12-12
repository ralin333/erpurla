import { NextResponse } from "next/server";
import { checkLogin, setSession } from "../../../lib/auth";

export async function POST(req: Request) {
  const { user, pass } = await req.json();

  if (!checkLogin(user, pass)) {
    return NextResponse.json({ error: "wrong" }, { status: 401 });
  }

  setSession();
  return NextResponse.json({ ok: true });
}
