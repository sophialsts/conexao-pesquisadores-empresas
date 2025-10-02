import { HeroPesquisadores } from "@/components/Hero";
import { PesquisadoresSugeridosArea } from "@/components/PesquisadoresSugeridos";
import { PesquisadoresProvider } from "../context/pesquisadores.context";

export default function PesquisadoresPage() {
  return (
    <div className="">
      <PesquisadoresProvider>
        <HeroPesquisadores/>
        <PesquisadoresSugeridosArea/>
      </PesquisadoresProvider>
    </div>
  );
}
