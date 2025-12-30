import { supabaseServer } from "../../../lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (code) {
        const supabase = supabaseServer();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            console.error("Auth callback error:", error);
            return NextResponse.redirect(new URL("/sign-in?error=auth_failed", request.url));
        }
    }

    return NextResponse.redirect(new URL("/timeline", request.url));
}