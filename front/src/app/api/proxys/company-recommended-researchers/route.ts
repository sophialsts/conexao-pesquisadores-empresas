import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const sort = request.nextUrl.searchParams.get("sort");

  if (!id) {
    return NextResponse.json({ error: "O ID da empresa é obrigatório" }, { status: 400 });
  }

  let backendUrl = `http://back:5000/api/v1/companies/${id}/researchers`;

  if (sort) {
    backendUrl += `?sort=${encodeURIComponent(sort)}`;
  }

  try {
    const response = await fetch(backendUrl);

    if (!response.ok) {
        const errorData = await response.text();
        return new NextResponse(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Erro ao conectar com o serviço de backend:", error);
    return NextResponse.json({ error: "Falha ao se comunicar com o serviço interno" }, { status: 502 });
  }
}