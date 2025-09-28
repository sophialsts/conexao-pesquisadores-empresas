import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

# --- Seletores ---
SELETOR_NOME = "h3.font-bold.text-base.__className_cf1728"
SELETOR_DESCRICAO = "p.text-justify.line-clamp-4"
SELETOR_AREA = "div.bg-popover.text-primary:not(.h-6):not(.inline-flex)"
SELETOR_QUANT_PAGS = "p.text-base"

def raspar_dados_empresas(driver):
    dados_empresas_ba = [] # Inicializa a lista que vai armazenar os dicionários

    try:
        # Extrai a última parte que é o número de páginas
        '''
        trecho_contem_numPagina_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, SELETOR_QUANT_PAGS)))
        partes_trecho = trecho_contem_numPagina_element.text.split()
        strPaginas = partes_trecho[-1]
        total_paginas = int(strPaginas)
        print(f"Total de páginas é {total_paginas}")
        '''
        total_paginas = 29
        wait = WebDriverWait(driver, 10)

        for pg in range (1, total_paginas + 1):
            url_pagina = f'https://vitrine.sebraestartups.com.br/?state=BA&page={pg}'
            print(f"Acessando a página: {url_pagina}")
            driver.get(url_pagina)

            # Extrai nomes
            print("Aguardando os elementos carregarem...")
            h3_nome_elements = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, SELETOR_NOME)))
            nome_empresas = [elem.text for elem in h3_nome_elements]
                
            # Extrai descrições    
            p_descricao_elements = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, SELETOR_DESCRICAO)))
            descricao_empresas = [elem.text for elem in p_descricao_elements]
            
            # Extrai áreas das empresas
            div_area_elements = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, SELETOR_AREA)))
            areas_empresas = [elem.text for elem in div_area_elements]

            for nome, descricao, area in zip(nome_empresas, descricao_empresas, areas_empresas):
                empresa = {
                    'nome': nome,
                    'descricao': descricao,
                    'area': area
                }
                dados_empresas_ba.append(empresa)
                print(f"Empresa adicionada: {nome}")

                for chave,valor in empresa.items():
                    print(f"{chave.capitalize()}:{valor}\n")
        
        return dados_empresas_ba

    except Exception as e:
        print(f"\n--- ERRO INESPERADO ---")
        print(f"Ocorreu um erro: {e}")