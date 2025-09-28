from scraper.driver_config import configurar_chrome_driver
from scraper.core_scraper import raspar_dados_empresas
#from scraper.utils import salvar_em_csv

def exibir_resultados(dados):
    """Função para formatar e exibir os dados extraídos no console."""
    if not dados:
        print("Nenhum dado foi extraído para exibir.")
        return
        
    #print("\n--- SUCESSO! DADOS EXTRAÍDOS ---")
    #print(f"Nome encontrado: {dados['nome']}")
    #print(f"\nDescrição: {dados['descricao']}")
    
    #total_empresas = len(dados['empresas'])
    #print(f"\nEncontrados {total_empresas} empresas no total.")
    
    #for i, empresa in enumerate(dados['empresas'], 1):
    #    print(f"\n--- Empresa {i} ---")
    #    print(empresa)
    #print("\n------------------\n")

def main():
    """Função principal que executa o scraper."""
    driver = None
    try:
        driver = configurar_chrome_driver()
        if driver:
            print('Driver configurado com sucesso')
            dados_extraidos = raspar_dados_empresas(driver)
            #exibir_resultados(dados_extraidos)
            #salvar_em_csv(dados_extraidos)

    except Exception as e:
        print(f"\n--- ERRO INESPERADO NA EXECUÇÃO PRINCIPAL ---")
        print(f"Ocorreu um erro: {e}")

    finally:
        if driver:
            print("Fechando o navegador.")
            driver.quit()

if __name__ == "__main__":
    main()