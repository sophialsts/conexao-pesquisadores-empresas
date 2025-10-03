"use client";
import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";
import { Researcher } from "@/types/researchers.types";

type PesquisadoresContextType = {
  pesquisadores: Researcher[];
  setPesquisadores: Dispatch<SetStateAction<Researcher[]>>;
  pesquisadorAtual: Researcher | null;
  setPesquisadorAtual: Dispatch<SetStateAction<Researcher | null>>;
 
};

const PesquisadoresContext = createContext<PesquisadoresContextType | undefined>(undefined);

export function PesquisadoresProvider({ children }: { children: React.ReactNode }) {
  const [pesquisadores, setPesquisadores] = useState<Researcher[]>([]);
  const [pesquisadorAtual, setPesquisadorAtual] = useState<Researcher | null>(null);
 

  return (
    <PesquisadoresContext.Provider value={{
      pesquisadores,
      setPesquisadores,
      pesquisadorAtual,
      setPesquisadorAtual
    }}>
      {children}
    </PesquisadoresContext.Provider>
  );
}

export function usePesquisadores() {
  const ctx = useContext(PesquisadoresContext);
  if (!ctx) throw new Error("usePesquisadores deve ser usado dentro de PesquisadoresProvider");
  return ctx;
}
