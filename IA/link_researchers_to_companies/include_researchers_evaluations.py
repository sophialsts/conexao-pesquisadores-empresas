import os
import sys
import numpy as np
from langchain_openai import OpenAIEmbeddings
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def include_data():
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
            INSERT INTO companies (name, embedding)
            VALUES (:name, :embedding)
            ON CONFLICT (name) DO NOTHING
        """)
        
        empresas = obter_empresas()
        embeddings_model = OpenAIEmbeddings()

        dados = []
        for empresa in empresas:
            try:
                nome = empresa['nome_empresa']
                embedding_nome = embeddings_model.embed_query(nome)
                dados.append({"name": nome, "embedding": embedding_nome})
            except Exception as e:
                print("\n\033[91mOcorreu um erro ao gerar os embeddings.\033[0m")
                print(f"Empresa: {empresa}")
                print(f"Erro: {e}")
        
        with engine.begin() as conn:
            for d in dados:
                conn.execute(sql, d)
    
        print("✅ Operação de inserção de nomes das empresas e embeddings concluída com sucesso!")

    except Exception as e:
        print(f"Ocorreu um erro ao inserir os dados: {e}")


inserir_nomes_e_embeddings_empresas() # Colocar no main dps
