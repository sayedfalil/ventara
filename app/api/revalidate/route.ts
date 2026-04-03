import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const { path } = await req.json();
    if (path) {
      revalidatePath(path);
    }
    revalidatePath("/blog");
    revalidatePath("/packages");
    revalidatePath("/");
    
    return NextResponse.json({ revalidated: true, path });
  } catch (e) {
    return NextResponse.json({ error: "Invalid Request Body" }, { status: 400 });
  }
}
