import { NextRequest, NextResponse } from "next/server";
import { parseSchedulePDF } from "@/lib/parseSchedule";
import { extractText } from "unpdf";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!file.name.endsWith(".pdf")) {
      return NextResponse.json({ error: "File must be a PDF" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { text } = await extractText(buffer, { mergePages: true });

    console.log("PDF TEXT:", text.slice(0, 2000));

    const courses = parseSchedulePDF(text);

    if (courses.length === 0) {
      return NextResponse.json(
        { error: "No courses found. Make sure you uploaded your UNT weekly schedule PDF." },
        { status: 422 }
      );
    }

    return NextResponse.json({ courses }, { status: 200 });

  } catch (error) {
    console.error("[parse-schedule] error:", error);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}