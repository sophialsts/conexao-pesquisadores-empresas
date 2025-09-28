import pandas as pd
import os

def salvar_em_csv(dados, nome_do_arquivo="empresas.csv"):
    """
    Salva uma lista de dicionários em um arquivo CSV dentro da pasta 'data' usando pandas.
    """
    caminho_da_pasta = '../data'
    if not os.path.exists(caminho_da_pasta):
        os.makedirs(caminho_da_pasta)

    caminho_do_arquivo = os.path.join(caminho_da_pasta, nome_do_arquivo)

    try:
        if not dados:
            print("Nenhum dado para salvar.")
            return False
        
        df = pd.DataFrame(dados)
        df.to_csv(caminho_do_arquivo, index=False, encoding='utf-8')
        
        print(f"Arquivo CSV salvo com sucesso em: {caminho_do_arquivo}")
        print(f"Total de registros salvos: {len(dados)}")
        print(f"Colunas: {', '.join(df.columns)}")
        
        return True
        
    except Exception as e:
        print(f"❌ Erro ao salvar arquivo CSV: {e}")
        return False