import csv
import os
import sys

def configurar_path():
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
            
    return projeto_raiz

def obter_pesquisadores():
    lista_dicts_pesquisadores = []
    
    caminho_arquivo = os.path.join(configurar_path(), "data", "amostra_pesquisadores.csv")
    
    try:
        with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
            leitor = csv.DictReader(arquivo)
            
            for linha in leitor:
                abstract = linha.get('abstract', '')
                id_pesquisador = linha.get('researcher_id', '')
                nome = linha.get('researcher_name', '')
                dict_pesquisador = {
                    "researcher_id": id_pesquisador,
                    "abstract": abstract,
                    "researcher_name": nome
                }
                lista_dicts_pesquisadores.append(dict_pesquisador)
            
            print(f"Total de dicionários de pesquisadores extraídos: {len(lista_dicts_pesquisadores)}")
            
    except Exception as e:
        print(f"Erro ao processar arquivo: {e}")
        return []
    
    return lista_dicts_pesquisadores

def obter_empresas():
    lista_dict_empresas = []

    caminho_arquivo = os.path.join(configurar_path(), "data", "empresas.csv")
    
    try:
        with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
            leitor = csv.DictReader(arquivo)
            
            for linha in leitor:
                descricao = linha.get('descricao', '')
                nomes_empresas = linha.get('nome', '')
                dict_empresa = {
                    "nome_empresa": nomes_empresas,
                    "descricao": descricao
                }
                lista_dict_empresas.append(dict_empresa)
            
            print(f"Total de dicionários de empresas extraídas: {len(lista_dict_empresas)}")
            
    except Exception as e:
        print(f"Erro ao processar arquivo: {e}")
        return []
    
    return lista_dict_empresas