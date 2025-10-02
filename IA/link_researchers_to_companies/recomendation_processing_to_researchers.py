import psycopg2
from psycopg2.extras import execute_batch

def _buscar_mapeamento_empresas(conexao):
    """Função auxiliar para buscar um mapa de nome_empresa -> id."""
    company_map = {}
    with conexao.cursor() as cursor:
        cursor.execute("SELECT id, name FROM companies")
        for company_id, company_name in cursor:
            company_map[company_name] = company_id
    return company_map

def inserir_recomendacoes(dados_relacoes: list, db_config: dict):
    """
    Insere ou atualiza as recomendações de empresas para pesquisadores na tabela
    'company_recommendations_for_researchers'.
    """
    dados_para_inserir = []
    conexao = None

    try:
        conexao = psycopg2.connect(**db_config)
        company_id_map = _buscar_mapeamento_empresas(conexao)

        for relacao in dados_relacoes:
            # Apenas processa relações que geraram uma justificativa (são recomendações de fato)
            if relacao.get("justificativa"):
                company_name = relacao.get("companie_name")
                company_id = company_id_map.get(company_name)
                
                if not company_id:
                    print(f"Aviso: Empresa '{company_name}' não encontrada no mapa. Pulando recomendação.")
                    continue

                linha_formatada = (
                    relacao.get("researcher_id"),
                    company_id,
                    company_name,
                    relacao.get("area"),
                    relacao.get("justificativa")
                )
                dados_para_inserir.append(linha_formatada)

        if dados_para_inserir:
            with conexao.cursor() as cursor:
                sql_insert = """
                    INSERT INTO company_recommendations_for_researchers
                    (researcher_id, company_id, company_name, area, recommendation_reason, updated_at)
                    VALUES (%s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
                    ON CONFLICT (researcher_id, company_id) DO UPDATE SET
                        company_name = EXCLUDED.company_name,
                        area = EXCLUDED.area,
                        recommendation_reason = EXCLUDED.recommendation_reason,
                        updated_at = CURRENT_TIMESTAMP;
                """
                execute_batch(cursor, sql_insert, dados_para_inserir)

            conexao.commit()
            print(f"✅ Sucesso! {len(dados_para_inserir)} recomendações inseridas/atualizadas.")
        else:
            print("ℹ️ Nenhuma recomendação com justificativa válida para inserir.")

    except Exception as e:
        print(f"🚨 Erro ao inserir recomendações: {e}")
        if conexao:
            conexao.rollback()
    finally:
        if conexao:
            conexao.close()