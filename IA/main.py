from data_extraction.infos_extraction import obter_pesquisadores,obter_empresas
from link_researchers_to_companies.semantic_relational import reasons_for_companies
from embedding.insert_companies_info import inserir_nome_e_embeddings_empresas

# Lógica de relacionar os dados retornados das listas

pesquisadores = obter_pesquisadores()
empresas = obter_empresas()


empresas_pesquisadores_relacoes = reasons_for_companies(empresas,pesquisadores)
