import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
      
    const response = await fetch(
      `http://back:5000/api/v1/researchers/${id}/companies`
    );

    if (!response.ok) {
      return new NextResponse('Erro ao buscar dados do backend', { status: response.status });
    }

    const originalData = await response.json();

    return NextResponse.json(originalData);

  } catch (error) {
    console.error("Erro na API Route:", error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
