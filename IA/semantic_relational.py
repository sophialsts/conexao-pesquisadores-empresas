import os
import time
from openai import OpenAI
from dotenv import load_dotenv
from pydantic import BaseModel, Field

class ResponseFormatter(BaseModel):
    """Always use this tool to structure your response to the input."""
    answer: str = Field(description="The answer to the input question")
    areaEstudo: float 
    flexibilidade: float
    experienciaAcademica: float


# Criar cliente OpenAI
def criar_client() -> OpenAI:
    load_dotenv()
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    return client

# Gerar razões das relações definidas/encontradas, retorna dicionário
def generate_relation_reason(empresas: dict, pesquisadores: dict) -> dict:
    client = criar_client()
    reasons_to_companies = {}

    # Retorna de um pesquisador

    prompt = f"""
    Com base na descrição da empresa '{empresas['nome_empresa']}': {empresas['descricao']}
    
    Analise o abstract do pesquisador, defina e retorne de 0 a 1 em float o quanto o pesquisador se aplica para cada critério na empresa específica. 
    
    Abstract: {pesquisadores['abstract']}
    
    Critérios:
    
    - Área de Estudo: o quanto a área de estudo principal do pesquisador se aproxima da área trabalhada na empresa
    - Flexibilidade: o quanto o pesquisador é variado em temas de suas pesquisas
    - Experiências: participações em eventos
    
    Se a soma dos valores der maior que 2,2 -> gere uma justificativa do porquê o pesquisador se encaixa

    """

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    content = response.message.content

    reasons_to_companies = {
        "companie_name": empresas['nome_empresa'], # Buscar id para inserir na tabela de relações atráves do nome
        "researcher_id": pesquisadores["researcher_id"],
        "reason_choice": content
    }
    
    return reasons_to_companies

def reasons_for_companies(empresas: list[dict], pesquisadores: list[dict]) -> list[dict]:

    reasons_researchers_for_companies = []

    for empresa in empresas:
        for pesquisador in pesquisadores:
            reasons_researchers_for_companies.append(generate_relation_reason(empresa,pesquisador))

    return reasons_researchers_for_companies