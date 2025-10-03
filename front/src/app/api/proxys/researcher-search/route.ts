import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search") || "";
      
    const response = await fetch(
      `http://back:5000/api/v1/researchers?search=${encodeURIComponent(search)}`
    );

    if (!response.ok) {
      return new NextResponse('Erro ao buscar dados do backend', { status: response.status });
    }

    const originalData = await response.json();

    if (!Array.isArray(originalData)) {
      console.error("Os dados recebidos do backend não são um array:", originalData);
      return NextResponse.json({ error: "Formato de dados inesperado do backend" }, { status: 500 });
    }

    const transformedData = originalData.map((pesquisador: any) => {
      return {
        id: pesquisador.researcher_id,
        name: pesquisador.name,
        instituicao: pesquisador.instituicao,
        sigla: pesquisador.sigla
      };
    });

    return NextResponse.json(transformedData);

  } catch (error) {
    console.error("Erro na API Route:", error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
