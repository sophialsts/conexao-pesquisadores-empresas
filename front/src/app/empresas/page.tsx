import { HeroEmpresas } from "@/components/Hero";
import { PesquisadoresSugeridosParaEmpresasArea } from "@/components/PesquisadoresSugeridos";
import { EmpresasProvider } from "../context/empresas.context";

export default function EmpresasPage() {
  return (
    <div className="font-sans">
        <EmpresasProvider>
          <HeroEmpresas/>
          <PesquisadoresSugeridosParaEmpresasArea/>
        </EmpresasProvider>
    </div>
  );
}
