from scraper.driver_config import configurar_chrome_driver
from scraper.core_scraper import raspar_dados_empresas
from scraper.utils import salvar_em_csv

def main():
    """Função principal que executa o scraper."""
    driver = None
    try:
        driver = configurar_chrome_driver()
        if driver:
            print('Driver configurado com sucesso')
            dados_extraidos = raspar_dados_empresas(driver)
            #salvar_em_csv(dados_extraidos)

            return dados_extraidos

    except Exception as e:
        print(f"\n--- ERRO INESPERADO NA EXECUÇÃO PRINCIPAL ---")
        print(f"Ocorreu um erro: {e}")

    finally:
        if driver:
            print("Fechando o navegador.")
            driver.quit()

if __name__ == "__main__":
    main()