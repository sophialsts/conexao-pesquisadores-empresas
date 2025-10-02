"use client"
import { useEmpresas } from "@/app/context/empresas.context";
import { Company } from "@/types/companies.types";

const EmpresasSugeridas = () => {
    const { empresas, setEmpresaAtual, empresaAtual } = useEmpresas();

    const handleClick = (empresa: Company) => {
        if (empresaAtual && empresaAtual.name === empresa.name) {
            setEmpresaAtual(null);
        } else {
            setEmpresaAtual(empresa);
        }
    }

    const getBackgroundColor = (empresa: Company) => {
        if (empresaAtual && empresa.name === empresaAtual.name) {
            return 'bg-eng-secondary';
        }
        return 'bg-eng-primary';
    }

    return (
    <div className="flex mt-1 flex-wrap w-full">
        <div className="w-full p-2 flex gap-2 max-w-5xl flex-wrap font-medium text-sm">
            {empresas.slice(0, 5).map(empresa=>{
                return (
                    <div 
                        key={empresa.id} 
                        className={`transition-all text-white flex ${getBackgroundColor(empresa)} rounded p-2 justify-center items-center hover:bg-eng-secondary cursor-pointer`} 
                        onClick={()=>handleClick(empresa)}
                    >
                        <p>{empresa.name}</p>
                    </div>
                )
            })}
        </div>
    </div>
    );
}

export { EmpresasSugeridas }