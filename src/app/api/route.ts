import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const req = await request.json();
  const key = process.env.NEXT_PUBLIC_API_KEY as string;
  const response = await fetch(
    "https://in9jiwrit0.execute-api.us-east-1.amazonaws.com/default/rekognition",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
      },
      body: JSON.stringify({ action: req.action, image: req.image }),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}
