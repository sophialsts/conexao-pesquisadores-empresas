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

from data_extraction.infos_extraction import obter_pesquisadores

def inserir_nomes_e_embeddings_pesquisadores():
    try:
        load_dotenv()

        usuario = os.getenv('DB_USER')
        senha = os.getenv('DB_SENHA')
        host = 'localhost'
        porta = os.getenv('DB_PORT')
        banco = os.getenv('DB_NAME')
        
        connection_string = f'postgresql+psycopg2://{usuario}:{senha}@{host}:{porta}/{banco}'
        engine = create_engine(connection_string)

        sql = text("""
            INSERT INTO researchers (researcher_id, name, embedding)
            VALUES (:researcher_id, :name, :embedding)
            ON CONFLICT (name) DO NOTHING
        """)
        
        pesquisadores = obter_pesquisadores()
        embeddings_model = OpenAIEmbeddings()

        dados = []
        for pesquisador in pesquisadores:
            try:
                nome = pesquisador['researcher_name']
                print(pesquisador)
                embedding_nome = embeddings_model.embed_query(nome)
                dados.append({"researcher_id": pesquisador['researcher_id'], "name": nome, "embedding": embedding_nome})
            except Exception as e:
                print(pesquisador['researcher_name'])
                print("\n\033[91mOcorreu um erro ao gerar os embeddings.\033[0m")
                print(f"Pesquisador: {pesquisador}")
                print(f"Erro: {e}")
        
        with engine.begin() as conn:
            for d in dados:
                conn.execute(sql, d)
    
        print("✅ Operação de inserção de nomes das pesquisadores e embeddings concluída com sucesso!")

    except Exception as e:
        print(f"Ocorreu um erro ao inserir os dados: {e}")


inserir_nomes_e_embeddings_pesquisadores() # Colocar no main dps
