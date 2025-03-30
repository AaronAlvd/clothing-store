"use server";

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const { first_name, last_name, email, password } = await req.json();
  
  const supabase = await createClient();

  const { data: { user }} = await supabase.auth.getUser();

  console.log(user)

  return NextResponse.json({hello: "hello"});
};