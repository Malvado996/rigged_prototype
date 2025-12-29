import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { userId } = await auth();  // ← await here resolves the promise

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { content, type, images } = await request.json();

        const { data, error } = await supabase
            .from("posts")
            .insert({
                user_id: userId,
                type,
                content: content || null,
                images: images || [],
            })
            .select()
            .single();

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, post: data });
    } catch (err) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}