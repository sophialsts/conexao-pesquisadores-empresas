import os
import sys
import numpy as np
from langchain_openai import OpenAIEmbeddings
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Adiciona a pasta raiz (IA/) ao sys.path
projeto_raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if projeto_raiz not in sys.path:
    sys.path.append(projeto_raiz)

from data_extraction.infos_extraction import obter_empresas

def inserir_nomes_e_embeddings_empresas(db_config: dict):
    """
    Insere nomes de empresas e seus embeddings no banco de dados.

    :param db_config: Dicionário com as credenciais do banco.
                      Ex: {'user': 'postgres', 'password': '...', 'host': 'localhost', ...}
    """
    try:
        connection_string = (
            f"postgresql+psycopg2://{db_config['user']}:{db_config['password']}"
            f"@{db_config['host']}:{db_config['port']}/{db_config['dbname']}"
        )
        engine = create_engine(connection_string)

        sql = text("""
            INSERT INTO companies (name, embedding)
            VALUES (:name, :embedding)
            ON CONFLICT (name) DO NOTHING
        """)
        
        print("Buscando empresas e gerando embeddings...")
        empresas = obter_empresas()
        embeddings_model = OpenAIEmbeddings()

        dados_para_inserir = []
        for empresa in empresas:
            try:
                nome = empresa['nome_empresa']
                embedding_nome = embeddings_model.embed_query(nome)
                dados_para_inserir.append({"name": nome, "embedding": np.array(embedding_nome).tolist()})
            except Exception as e:
                print(f"\n\033[91mOcorreu um erro ao gerar embedding para a empresa: {empresa.get('nome_empresa', 'N/A')}\033[0m")
                print(f"Erro: {e}")
        
        if not dados_para_inserir:
            print("Nenhum dado válido para inserir. Operação encerrada.")
            return

        print(f"Inserindo {len(dados_para_inserir)} registros no banco de dados...")
        with engine.begin() as conn:
            conn.execute(sql, dados_para_inserir)
    
        print("✅ Operação de inserção de nomes das empresas e embeddings concluída com sucesso!")

    except KeyError as e:
        print(f"\033[91mErro de configuração: A chave {e} está faltando no dicionário db_config.\033[0m")
    except Exception as e:
        print(f"\033[91mOcorreu um erro ao inserir os dados: {e}\033[0m")


#inserir_nomes_e_embeddings_empresas() # Colocar no main dps
