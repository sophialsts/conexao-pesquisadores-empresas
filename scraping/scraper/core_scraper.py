import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

# --- Seletores ---
SELETOR_NOME = "h3.font-bold.text-base.__className_cf1728"
SELETOR_DESCRICAO = "p.text-justify.line-clamp-4"
SELETOR_AREA = "div.items-center.rounded-full.border.px-2.5.py-0.5.font-semibold.transition-colors.focus:outline-none.focus:ring-2.focus:ring-ring.focus:ring-offset-2.border-transparent.bg-popover.text-primary.hover:bg-secondary/80.text-sm.line-clamp-1.w-fit"
SELETOR_PROXIMO_BUTTON = ""
SELETOR_QUANT_PAGS = "p.text-base"

# ---- URL ------
URL_PAGINA = "https://vitrine.sebraestartups.com.br/?state=BA"

def raspar_dados_empresas(driver):
    print(f"Acessando a página: {URL_PAGINA}")
    driver.get(URL_PAGINA)
    wait = WebDriverWait(driver, 20)
    dados_empresas_ba = {} # Inicializa o dicionário

    try:
        # --- DADOS GERAIS ---
        print("Aguardando os elementos carregarem...")
        h3_nome_elements = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, SELETOR_NOME)))
        nome_empresas = [elem.text for elem in h3_nome_elements]
        print("Nomes da empresas carregadas:")
        for nome in nome_empresas:
            print(nome)
            
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

        #for pg in total_paginas:
        #    url = f'https://vitrine.sebraestartups.com.br/?state=BA&page={pg}'

        # --- ETAPA 1: Raspar ARTIGOS ---
        '''print("\n--- INICIANDO EXTRAÇÃO DE ARTIGOS ---")
        lista_artigos_elements = driver.find_elements(By.CSS_SELECTOR, SELETOR_CONTEUDO_ARTIGOS)
        artigos_textos = [elem.text for elem in lista_artigos_elements]
        print(f"Encontrados {len(artigos_textos)} artigos.")

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