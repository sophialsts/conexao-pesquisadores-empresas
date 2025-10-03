import os
import time
import json
import time
from openai import OpenAI
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import Optional
import instructor

# Formatar saída do prompt
class RelationAnalysis(BaseModel):
    areaEstudo: float = Field(..., description="Score de 0.0 a 1.0 para a afinidade da área de estudo do pesquisador com a empresa.")
    flexibilidade: float = Field(..., description="Score de 0.0 a 1.0 para a variedade de temas de pesquisa do pesquisador.")
    experienciaAcademica: float = Field(..., description="Score de 0.0 a 1.0 para a relevância das experiências (eventos) do pesquisador para a empresa.")
    
    justificativaParaEmpresa: Optional[str] = Field(
        default=None, 
        description="Justificativa para a EMPRESA, destacando o valor do pesquisador PARA ELA."
    )
    justificativaParaPesquisador: Optional[str] = Field(
        default=None, 
        description="Justificativa para o PESQUISADOR, destacando os benefícios da empresa PARA ELE."
    )
    
def imprimir_relatorio_colorido(resultado: dict):
    class Cores:
        RESET = '\033[0m'
        BOLD = '\033[1m'
        VERDE = '\033[92m'
        AZUL = '\033[94m'
        AMARELO = '\033[93m'
        VERMELHO = '\033[91m'

    if "error" in resultado:
        return

    soma_ponderada = (resultado.get('areaEstudo', 0) * 2) + resultado.get('flexibilidade', 0) + resultado.get('experienciaAcademica', 0)
    
    print("="*60)
    print(f"{Cores.BOLD}📊 Análise de Compatibilidade (Score Ponderado: {soma_ponderada:.2f}) 📊{Cores.RESET}")
    print(f"  🏢 {Cores.AZUL}Empresa:{Cores.RESET} {resultado['companie_name']}")
    print(f"  👤 {Cores.AZUL}Pesquisador:{Cores.RESET} {resultado['researcher_id']}")
    print("-"*60)
    print(f"{Cores.BOLD}Scores:{Cores.RESET}")
    print(f"  📚 {Cores.AZUL}Área de Estudo (Peso 2):{Cores.RESET} {Cores.VERDE}{resultado['areaEstudo']:.2f}{Cores.RESET}")
    print(f"  💡 {Cores.AZUL}Flexibilidade:{Cores.RESET} {Cores.VERDE}{resultado['flexibilidade']:.2f}{Cores.RESET}")
    print(f"  🎓 {Cores.AZUL}Experiência Acadêmica:{Cores.RESET} {Cores.VERDE}{resultado['experienciaAcademica']:.2f}{Cores.RESET}")
    print("-"*60)

    just_empresa = resultado.get('justificativa_empresa')
    just_pesquisador = resultado.get('justificativa_pesquisador')

    if just_empresa or just_pesquisador:
        print(f"✅ {Cores.BOLD}{Cores.VERDE}Justificativas Geradas:{Cores.RESET}")
        if just_empresa:
            print(f"   👉 {Cores.BOLD}Para Empresa:{Cores.RESET} {just_empresa}")
        if just_pesquisador:
            print(f"   👉 {Cores.BOLD}Para Pesquisador:{Cores.RESET} {just_pesquisador}")
    else:
        # Esta mensagem só aparecerá se ambas forem nulas
        print(f"❌ {Cores.BOLD}{Cores.AMARELO}Justificativa:{Cores.RESET}")
        print("   Nenhuma foi gerada (score ponderado <= 3.2).")
    
    print("="*60 + "\n")

# Criar cliente OpenAI
def criar_client() -> OpenAI:
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("A variável de ambiente OPENAI_API_KEY não foi definida.")
    client = OpenAI(api_key=api_key)
    return client

# Gerar razões das relações definidas/encontradas, retorna dicionário
def generate_link_reason(empresa: dict, pesquisador: dict) -> dict:
    client = instructor.patch(criar_client())

    prompt = f"""
        Sua tarefa é analisar a compatibilidade entre um pesquisador e uma empresa e gerar duas justificativas de marketing distintas.

        Dados para Análise:
        # (Dados continuam iguais)

        Instruções Gerais:
        1. Avalie o pesquisador em uma escala de 0.0 a 1.0 para os critérios: areaEstudo, flexibilidade, experienciaAcademica.
        2. Gere AMBAS as justificativas seguindo as instruções de tom e público-alvo abaixo.

        ---
        Instruções para a `justificativaParaEmpresa`:
        # (Instruções específicas continuam iguais)

        ---
        Instruções para a `justificativaParaPesquisador`:
        # (Instruções específicas continuam iguais)
        """

    try:
        analysis_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_model=RelationAnalysis,
        )
        
        soma_ponderada = (analysis_response.areaEstudo * 2) + analysis_response.flexibilidade + analysis_response.experienciaAcademica
    
        # Se o score for baixo, anula ambas as justificativas
        if soma_ponderada <= 3.2: 
            analysis_response.justificativaParaEmpresa = None
            analysis_response.justificativaParaPesquisador = None

        # MUDANÇA AQUI: Capturar as duas justificativas
        result = {
            "companie_name": empresa['nome_empresa'],
            "researcher_id": pesquisador["researcher_id"],
            "area": empresa['area'],
            "areaEstudo": analysis_response.areaEstudo,
            "flexibilidade": analysis_response.flexibilidade,
            "experienciaAcademica": analysis_response.experienciaAcademica,
            "justificativa_empresa": analysis_response.justificativaParaEmpresa,
            "justificativa_pesquisador": analysis_response.justificativaParaPesquisador
        }
        
        print(json.dumps(result, indent=2, ensure_ascii=False)) # Opcional
        
        return result

    except Exception as e:
        print(f"Ocorreu um erro ao analisar a relação para a empresa {empresa['nome_empresa']} e pesquisador {pesquisador['researcher_id']}: {e}")
        return {
            "companie_name": empresa['nome_empresa'],
            "researcher_id": pesquisador["researcher_id"],
            "error": str(e)
        }

def reasons_for_companies(empresas: list[dict], pesquisadores: list[dict]) -> list[dict]:
    reasons_researchers_for_companies = []
    total_combinations = len(empresas) * len(pesquisadores)
    current_combination = 0

    tempo_inicial = time.time()
    i = 1
    for empresa in empresas:
        if i == 20: break # Limitei para uma empresa só, ignora total_combinations
        for pesquisador in pesquisadores:
            current_combination += 1
            print(f"Analisando combinação {current_combination}/{total_combinations}: Empresa '{empresa['nome_empresa']}' e Pesquisador '{pesquisador['researcher_id']}'")
            
            time.sleep(1) 
            
            reason = generate_link_reason(empresa, pesquisador)
            reasons_researchers_for_companies.append(reason)
            imprimir_relatorio_colorido(reason)
            print("--- Análise concluída.")
        i+=1
    tempo_final = time.time()
    print(f"Duração de gerar relações baseado nos critérios para pesquisadores e empresas: {tempo_final-tempo_inicial:.2f}")

    return reasons_researchers_for_companies