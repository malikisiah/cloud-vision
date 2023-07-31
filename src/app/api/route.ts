import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const req = await request.json();
  const response = await fetch(
    "https://glwb7cg5ok.execute-api.us-east-1.amazonaws.com/default/rekognition",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: req.action, image: req.image }),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}
