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

def processar_e_inserir_avaliacoes(dados_avaliacoes: list, db_config: dict):
    """
    Processa uma lista de avaliações, transforma os dados e os insere na tabela
    'researcher_evaluations_by_company'.
    """
    # Defina aqui os nomes exatos das chaves que representam um critério
    CRITERIOS_A_PROCESSAR = ['areaEstudo', 'flexibilidade', 'experienciaAcademica']
    
    dados_para_inserir = []
    conexao = None

    try:
        conexao = psycopg2.connect(**db_config)
        
        company_id_map = _buscar_mapeamento_empresas(conexao)

        for avaliacao in dados_avaliacoes:
            company_name = avaliacao.get("companie_name")
            researcher_id = avaliacao.get("researcher_id")
            
            # Pula o registro se o nome da empresa não estiver no banco
            company_id = company_id_map.get(company_name)
            if not company_id:
                print(f"Aviso: Empresa '{company_name}' não encontrada no banco. Pulando registro.")
                continue

            justificativa = avaliacao.get("justificativa")

            # Transforma uma avaliação em múltiplas linhas (uma por critério)
            for criterio in CRITERIOS_A_PROCESSAR:
                if criterio in avaliacao:
                    valor = avaliacao[criterio]
                    linha_formatada = (researcher_id, company_id, criterio, valor, justificativa)
                    dados_para_inserir.append(linha_formatada)
        
        if dados_para_inserir:
            with conexao.cursor() as cursor:
                sql_insert = """
                    INSERT INTO researcher_evaluations_by_company 
                    (researcher_id, company_id, criterion_name, criterion_value, recommendation_reason) 
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT (researcher_id, company_id, criterion_name) DO UPDATE SET
                        criterion_value = EXCLUDED.criterion_value,
                        recommendation_reason = EXCLUDED.recommendation_reason,
                        updated_at = CURRENT_TIMESTAMP;
                """
                execute_batch(cursor, sql_insert, dados_para_inserir)
                
            conexao.commit()
            print(f"✅ Sucesso! {len(dados_para_inserir)} registros de avaliação inseridos.")
        else:
            print("ℹ️ Nenhuma avaliação válida para inserir.")

    except Exception as e:
        print(f"🚨 Erro no processamento de avaliações: {e}")
        if conexao:
            conexao.rollback()
    
    finally:
        if conexao:
            conexao.close()