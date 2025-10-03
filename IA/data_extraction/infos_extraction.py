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
                nome_pesquisador = linha.get('researcher_name', '')
                nome_evento = linha.get('event_name', '')
                instituicao = linha.get('instituicao', '')
                sigla = linha.get('sigla', '')
                dict_pesquisador = {
                    "researcher_id": id_pesquisador,
                    "researcher_name": nome_pesquisador,
                    "abstract": abstract,
                    "event_name": nome_evento,
                    "instituicao": instituicao,
                    "sigla": sigla
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
            
            i=0
            for linha in leitor:
                if i >= 20: break
                descricao = linha.get('descricao', '')
                nomes_empresas = linha.get('nome', '')
                área = linha.get('area', '')
                dict_empresa = {
                    "nome_empresa": nomes_empresas,
                    "descricao": descricao,
                    "area": área
                }
                lista_dict_empresas.append(dict_empresa)
                i+=1
            
            print(f"Total de dicionários de empresas extraídas: {len(lista_dict_empresas)}")
            
    except Exception as e:
        print(f"Erro ao processar arquivo: {e}")
        return []
    
    return lista_dict_empresas

# obter_pesquisadores()
