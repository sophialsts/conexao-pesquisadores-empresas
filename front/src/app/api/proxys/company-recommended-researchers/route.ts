import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
    
  const response = await fetch(
    `http://back:5000/api/v1/companies/${id}/researchers`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
