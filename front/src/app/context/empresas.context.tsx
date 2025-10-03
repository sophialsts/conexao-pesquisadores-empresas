"use client";
import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";
import { Company } from "@/types/companies.types";
import { RecommendedResearcher } from "@/types/researchers.types";

type EmpresasContextType = {
  empresas: Company[];
  setEmpresas: Dispatch<SetStateAction<Company[]>>;
  empresaAtual: Company | null;
  setEmpresaAtual: Dispatch<SetStateAction<Company | null>>;
  pesquisadoresRecomendados: RecommendedResearcher[]; 
  setPesquisadoresRecomendados: Dispatch<SetStateAction<RecommendedResearcher[]>>;

  pesquisadorRecomendadoAtual: RecommendedResearcher | null; 
  setPesquisadorRecomendadoAtual: Dispatch<SetStateAction<RecommendedResearcher | null>>;
};

const EmpresasContext = createContext<EmpresasContextType | undefined>(undefined);

export function EmpresasProvider({ children }: { children: React.ReactNode }) {
  const [empresas, setEmpresas] = useState<Company[]>([]);
  const [empresaAtual, setEmpresaAtual] = useState<Company | null>(null);
  const [pesquisadoresRecomendados, setPesquisadoresRecomendados] = useState<RecommendedResearcher[]>([]);
  const [pesquisadorRecomendadoAtual, setPesquisadorRecomendadoAtual] = useState<RecommendedResearcher | null>(null);

  return (
    <EmpresasContext.Provider value={{
      empresas,
      setEmpresas,
      empresaAtual,
      setEmpresaAtual,
      pesquisadoresRecomendados,
      setPesquisadoresRecomendados,
      pesquisadorRecomendadoAtual,
      setPesquisadorRecomendadoAtual
    }}>
      {children}
    </EmpresasContext.Provider>
  );
}

export function useEmpresas() {
  const ctx = useContext(EmpresasContext);
  if (!ctx) throw new Error("useEmpresas deve ser usado dentro de EmpresasProvider");
  return ctx;
}
