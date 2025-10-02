import os
from dotenv import load_dotenv

from data_extraction.infos_extraction import obter_pesquisadores, obter_empresas
from link_researchers_to_companies.semantic_relational import reasons_for_companies
from link_researchers_to_companies.include_researchers_evaluations import processar_e_inserir_avaliacoes
from embeddings.insert_companies_info import inserir_nomes_e_embeddings_empresas
from link_researchers_to_companies.recomendation_processing_to_researchers import inserir_recomendacoes

def main():
    print("🚀 Iniciando processo...")

    # 1. Configuração do Banco de Dados
    load_dotenv()
    db_config = {
        "user": os.getenv('DB_USER'),
        "password": os.getenv('DB_SENHA'),
        "host": os.getenv('DB_HOST', 'localhost'),
        "port": os.getenv('DB_PORT', '5432'),
        "dbname": os.getenv('DB_NAME')
    }

    if not all(db_config.values()):
        print("🚨 Erro: Variáveis de ambiente do banco não carregadas. Verifique o .env.")
        return

    # 2. Inserção de Empresas e Embeddings
    print("\nEtapa 1: Inserindo empresas no banco de dados...")
    inserir_nomes_e_embeddings_empresas(db_config)

    # 3. Relacionamento Semântico
    print("\nEtapa 2: Relacionando pesquisadores e empresas...")
    pesquisadores = obter_pesquisadores()
    empresas = obter_empresas()
    empresas_pesquisadores_relacoes = reasons_for_companies(empresas, pesquisadores)
    print(f"Relacionamento concluído: {len(empresas_pesquisadores_relacoes)} relações geradas.")

    # 4. Inserção das Avaliações (agora com a justificativa)
    print("\nEtapa 3: Inserindo avaliações no banco de dados...")
    if empresas_pesquisadores_relacoes:
        processar_e_inserir_avaliacoes(empresas_pesquisadores_relacoes, db_config)
    
    # 5. Inserção das Recomendações Finais
    print("\nEtapa 4: Inserindo recomendações no banco de dados...")
    if empresas_pesquisadores_relacoes:
        # CHAME A NOVA FUNÇÃO AQUI, USANDO OS MESMOS DADOS
        inserir_recomendacoes(empresas_pesquisadores_relacoes, db_config)

    print("\n🎉 Processo finalizado!")

if __name__ == "__main__":
    main()