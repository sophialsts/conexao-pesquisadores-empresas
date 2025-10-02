import os
import sys
import numpy as np
from langchain_openai import OpenAIEmbeddings
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

from data_extraction.infos_extraction import obter_pesquisadores

def inserir_nomes_e_embeddings_pesquisadores(db_config):
    try:
        connection_string = (
            f"postgresql+psycopg2://{db_config['user']}:{db_config['password']}"
            f"@{db_config['host']}:{db_config['port']}/{db_config['dbname']}"
        )
        engine = create_engine(connection_string)

        sql = text("""
            INSERT INTO researchers (researcher_id, name, embedding, instituicao, sigla, abstract)
            VALUES (:researcher_id, :name, :embedding, :instituicao, :sigla, :abstract)
            ON CONFLICT (name) DO NOTHING
        """)
        
        pesquisadores = obter_pesquisadores()
        embeddings_model = OpenAIEmbeddings()

        dados = []
        for pesquisador in pesquisadores:
            try:
                nome = pesquisador['researcher_name']
                abstract_texto = pesquisador['abstract'] 
                embedding_nome = embeddings_model.embed_query(nome)
                
                # 2. ADICIONE o campo 'abstract' ao dicionário
                dados.append({
                    "researcher_id": pesquisador['researcher_id'], 
                    "name": nome, 
                    "embedding": embedding_nome, 
                    "instituicao": pesquisador['instituicao'], 
                    "sigla": pesquisador['sigla'],
                    "abstract": abstract_texto 
                })

            except Exception as e:
                print(pesquisador.get('researcher_name', 'Nome não encontrado'))
                print("\n\033[91mOcorreu um erro ao gerar os embeddings ou preparar os dados.\033[0m")
                print(f"Pesquisador: {pesquisador}")
                print(f"Erro: {e}")
        
        with engine.begin() as conn:
            # O SQLAlchemy vai mapear as chaves do dicionário para os placeholders da query
            for d in dados:
                conn.execute(sql, d)
    
        print("✅ Operação de inserção de pesquisadores, embeddings e abstracts concluída com sucesso!")

    except Exception as e:
        print(f"Ocorreu um erro ao inserir os dados: {e}")