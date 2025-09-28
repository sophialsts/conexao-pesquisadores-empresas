import csv
import os
import sys

projeto_raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))

# Pastas que precisam estar no sys.path
pastas_para_adicionar = [
    projeto_raiz,
    os.path.join(projeto_raiz, 'scraping'),
    os.path.join(projeto_raiz, 'scraper'), 
]

for pasta in pastas_para_adicionar:
    if pasta not in sys.path:
        sys.path.append(pasta)

def obter_abstract():
    lista_abstracts = []
    
    caminho_arquivo = os.path.join(projeto_raiz, "data", "dados_relevantes.csv")
    
    try:
        with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
            leitor = csv.DictReader(arquivo)
            
            for linha in leitor:
                abstract = linha.get('abstract', '')
                lista_abstracts.append(abstract)
            
            print(f"Total de abstracts extraídos: {len(lista_abstracts)}")
            
    except Exception as e:
        print(f"Erro ao processar arquivo: {e}")
        return []
    
    return lista_abstracts


def obter_descricoes():
    lista_descricoes = []

    caminho_arquivo = os.path.join(projeto_raiz, "data", "empresas.csv")
    
    try:
        with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
            leitor = csv.DictReader(arquivo)
            
            for linha in leitor:
                descricao = linha.get('descricao', '')
                lista_descricoes.append(descricao)
            
            print(f"Total de descrições extraídas: {len(lista_descricoes)}")
            
    except Exception as e:
        print(f"Erro ao processar arquivo: {e}")
        return []
    
    return lista_descricoes
