import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

# --- Seletores ---
SELETOR_NOME = "h3.font-bold.text-base.__className_cf1728"
SELETOR_DESCRICAO = "p.text-justify.line-clamp-4"
SELETOR_AREA = "div.bg-popover.text-primary:not(.h-6):not(.inline-flex)"
SELETOR_PROXIMO_BUTTON = ""
SELETOR_QUANT_PAGS = "p.text-base"

# ---- URL ------
URL_PAGINA = "https://vitrine.sebraestartups.com.br/?state=BA"

def raspar_dados_empresas(driver):
    print(f"Acessando a página: {URL_PAGINA}")
    driver.get(URL_PAGINA)
    wait = WebDriverWait(driver, 10)
    dados_empresas_ba = {} # Inicializa o dicionário

    try:
        # --- DADOS GERAIS ---
        # Extrai nomes
        print("Aguardando os elementos carregarem...")
        h3_nome_elements = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, SELETOR_NOME)))
        nome_empresas = [elem.text for elem in h3_nome_elements]
        print("Nomes da empresas carregadas:")
        for nome in nome_empresas:
            print(nome)
            
        # Extrai descrições    
        p_descricao_elements = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, SELETOR_DESCRICAO)))
        descricao_empresas = [elem.text for elem in p_descricao_elements]
        print("Descrições carregadas:")
        for descricao in descricao_empresas:
            print(descricao)
        
        trecho_contem_numPagina_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, SELETOR_QUANT_PAGS)))
        
        # Extrai a última parte que é o número de páginas
        partes_trecho = trecho_contem_numPagina_element.text.split()
        strPaginas = partes_trecho[-1]
        total_paginas = int(strPaginas)
        print(f"Total de páginas é {total_paginas}")

        # Extrai áreas das empresas
        div_area_elements = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, SELETOR_AREA)))
        areas_empresas = [elem.text for elem in div_area_elements if elem.text != "Outros"]
        print("Áreas das empresas:")
        for area in areas_empresas:
            print(area)
        
        #for pg in total_paginas:
        #    url = f'https://vitrine.sebraestartups.com.br/?state=BA&page={pg}'

        '''
        print("\n--- INICIANDO EXTRAÇÃO DE PROJETOS DE PESQUISA ---")
        projetos_button = wait.until(EC.presence_of_element_located((By.XPATH, XPATH_BOTAO_PROJETOS)))
        driver.execute_script("arguments[0].scrollIntoView({inline: 'center', block: 'nearest'});", projetos_button)
        time.sleep(1)
        driver.execute_script("arguments[0].click();", projetos_button)'''
        
        time.sleep(2)
        
        # --- ETAPA 5: Montar o resultado final ---
        dados_empresas_ba = {
            "nome": nome_empresas,
            "descricao": descricao_empresas
        }
        
        return dados_empresas_ba

    except Exception as e:
        print(f"\n--- ERRO INESPERADO ---")
        print(f"Ocorreu um erro: {e}")