"use client"
import { useEmpresas } from "@/app/context/empresas.context";
import { usePesquisadores } from "@/app/context/pesquisadores.context";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect } from "react";

const SearchBarEmpresas = ({placeholder=""}:{
    placeholder?: string
}) => {
    const [debouncedValue, setValue] = useDebounceValue("", 500);

    const { data: empresas } = useQuery({
    queryKey: ["empresas", debouncedValue],
    queryFn: () => fetch(`/api/proxys/company-search?search=${encodeURI(debouncedValue)}`).then(r => r.json()),
    enabled: debouncedValue.length > 2,
    });

    const { setEmpresas } = useEmpresas();
    
    useEffect(()=>{
        if (!empresas) setEmpresas([]);
        if (empresas) setEmpresas(empresas);
    }, [empresas, setEmpresas]);


    return (
        <div className="w-full ">
            <div className="relative w-full rounded-lg border border-neutral-200 bg-white text-neutral-950 h-12 p-1 flex items-center pr-2">
                <Input onChange={(e)=>setValue(e.target.value)}
                    className="shadow-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 selection:bg-search-selection selection:text-white" 
                    placeholder={placeholder}
                />
                
                <div className="bg-eng-primary rounded text-white h-full aspect-square flex items-center justify-center">
                    <Search className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}

const SearchBarPesquisadores = ({placeholder=""}:{
    placeholder?: string
}) => {
    const [debouncedValue, setValue] = useDebounceValue("", 500);

    const { data: pesquisadores } = useQuery({
    queryKey: ["pesquisadores", debouncedValue],
    queryFn: () => fetch(`/api/proxys/researcher-search?search=${encodeURI(debouncedValue)}`).then(r => r.json()),
    enabled: debouncedValue.length > 2,
    });

    const { setPesquisadores } = usePesquisadores();
    
    useEffect(()=>{
        if (!pesquisadores) setPesquisadores([]);
        if (pesquisadores) setPesquisadores(pesquisadores);
    }, [pesquisadores, setPesquisadores]);

    return (
        <div className="w-full ">
            <div className="relative w-full rounded-lg border border-neutral-200 bg-white text-neutral-950 h-12 p-1 flex items-center pr-2">
                <Input onChange={(e)=>setValue(e.target.value)}
                    className="shadow-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 selection:bg-search-selection selection:text-white" 
                    placeholder={placeholder}
                />
                
                <div className="bg-eng-primary rounded text-white h-full aspect-square flex items-center justify-center">
                    <Search className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}

export { SearchBarEmpresas, SearchBarPesquisadores };