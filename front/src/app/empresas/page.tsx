import { HeroEmpresas } from "@/components/Hero";
import { PesquisadoresSugeridosParaEmpresasArea } from "@/components/PesquisadoresSugeridos";

export default function EmpresasPage() {
  return (
    <div className="font-sans">
        <HeroEmpresas/>
        <PesquisadoresSugeridosParaEmpresasArea/>
    </div>
  );
}
