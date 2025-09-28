import csv
import os

def obter_abstract():
    lista_abstracts = []
    
    caminho_arquivo = '../../data/dados_relevantes.csv'
    
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

obter_abstract()