import pandas as pd
import os

def salvar_em_csv(dados, nome_do_arquivo="empresas.csv"):
    """
    Salva um dicionário em um arquivo CSV dentro da pasta 'data'.
    """
    caminho_da_pasta = '../data'
    if not os.path.exists(caminho_da_pasta):
        os.makedirs(caminho_da_pasta)

    caminho_do_arquivo = os.path.join(caminho_da_pasta, nome_do_arquivo)

    print(f"Salvando dados em: {caminho_do_arquivo}")
    with open(caminho_do_arquivo, 'w', encoding='utf-8') as f:
        # função para salvar arquivo
        print("Arquivo CSV salvo com sucesso.")