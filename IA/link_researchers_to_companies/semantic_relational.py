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
    justificativa: Optional[str] = Field(default=None, description="Justificativa concisa do porquê o pesquisador se encaixa na empresa. Gerar apenas se a soma dos scores for > 2.2.")

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

    # Retorna de um pesquisador

    prompt = f"""
        Siga estas regras estritamente:
        1. Avalie o pesquisador em uma escala de 0.0 a 1.0 para cada critério: areaEstudo, flexibilidade, experienciaAcademica.
        2. Com base nesses scores, **gere uma justificativa concisa** que explique por que este pesquisador seria (ou não) uma boa escolha para a empresa.
        """

    try:
        analysis_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_model=RelationAnalysis,
        )
        
        soma_scores = analysis_response.areaEstudo + analysis_response.flexibilidade + analysis_response.experienciaAcademica
    
        if soma_scores <= 2.2: analysis_response.justificativa = None

        result = {
            "companie_name": empresa['nome_empresa'], # Necessário para buscar pelo id da empresa depois
            "researcher_id": pesquisador["researcher_id"],
            "areaEstudo": analysis_response.areaEstudo,
            "flexibilidade": analysis_response.flexibilidade,
            "experienciaAcademica": analysis_response.experienciaAcademica,
            "justificativa": analysis_response.justificativa
        }

        print(json.dumps(result, indent=2, ensure_ascii=False))
        
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
    for empresa in empresas:
        for pesquisador in pesquisadores:
            current_combination += 1
            print(f"Analisando combinação {current_combination}/{total_combinations}: Empresa '{empresa['nome_empresa']}' e Pesquisador '{pesquisador['researcher_id']}'")
            
            time.sleep(1) 
            
            reason = generate_link_reason(empresa, pesquisador)
            reasons_researchers_for_companies.append(reason)
            print("--- Análise concluída.")
    tempo_final = time.time()
    print(f"Duração de gerar relações baseado nos critérios para pesquisadores e empresas: {tempo_final-tempo_inicial:.2f}")

    return reasons_researchers_for_companies
