import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") || "";
    
  const response = await fetch(
    `http://back:5000/api/v1/companies?search=${encodeURIComponent(search)}`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
