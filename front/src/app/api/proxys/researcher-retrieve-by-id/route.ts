import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      throw new Error("ID é obrigatório");
  }
      
    const response = await fetch(
      `http://back:5000/api/v1/researchers/${encodeURIComponent(id)}`
    );

    if (!response.ok) {
      return new NextResponse('Erro ao buscar dados do backend', { status: response.status });
    }

    const originalData = await response.json();

    const transformedData = {
    id: originalData.researcher_id,
    name: originalData.name,
    instituicao: originalData.instituicao,
    sigla: originalData.sigla,
    abstract: originalData.abstract,
  };

    return NextResponse.json(transformedData);

  } catch (error) {
    console.error("Erro na API Route:", error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
