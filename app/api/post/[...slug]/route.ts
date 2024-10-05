// File: app/api/post/[...slug]/route.ts
import { NextRequest, NextResponse } from "next/server";

type PageContentResponse = {
  ok: boolean;
  result: {
    path: string;
    url: string;
    title: string;
    description: string;
    author_name: string;
    content: Array<unknown>;
    views: number;
  };
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
): Promise<NextResponse> {
  const path = params.slug.join("/");

  // URL encode the path to handle special characters
  const encodedPath = encodeURIComponent(path);
  const url = `https://api.telegra.ph/getPage/${encodedPath}?return_content=true`;

  try {
    const response = await fetch(url);
    const data: PageContentResponse = await response.json();

    if (!data.ok) {
      return NextResponse.json(
        { error: "Failed to fetch page content" },
        { status: 400 }
      );
    }

    return NextResponse.json(data.result);
  } catch (error) {
    console.error("Error fetching page content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export const runtime = "edge";
