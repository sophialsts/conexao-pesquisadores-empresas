"use client";
import { CardPesquisador, CardPesquisadorEmpresa } from "./CardPesquisador";
import { Drawer } from "@/components/ui/drawer";    
import { DrawerPesquisador } from "./DrawerPesquisador";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowDown01, Check } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { ChartPesquisador } from "./ChartPesquisador";
import { useEmpresas } from "@/app/context/empresas.context";
import { useQuery } from "@tanstack/react-query";
import { RecommendedResearcher, Researcher } from "@/types/researchers.types";
import { usePesquisadores } from "@/app/context/pesquisadores.context";
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "./ui/shadcn-io/spinner";

const PesquisadoresSugeridosArea = () => {
    const { pesquisadores, setPesquisadorAtual, pesquisadorAtual } = usePesquisadores()

    const { data: empresasRecomendadasRaw, isLoading } = useQuery({
    queryKey: ["empresasDoPesquisador", pesquisadorAtual?.id],
    queryFn: () =>
        pesquisadorAtual
        ? fetch(`/api/proxys/recommended-companies-for-researcher?id=${encodeURI(pesquisadorAtual.id)}`)
            .then(r => r.json())
        : Promise.resolve(null),
    enabled: !!pesquisadorAtual,
    });

    const handleClick = (pesquisador: Researcher) => {
        setPesquisadorAtual(pesquisador);
    }

    const [empresasRecomendadas, setEmpresasRecomendadas] = useState<{ area: string, companies: any[] }[]>([]);

    useEffect(() => {
    if (!empresasRecomendadasRaw) return;
    if (!Array.isArray(empresasRecomendadasRaw)) {
        return;
    }

    const grouped: Record<string, any[]> = {};

    empresasRecomendadasRaw.forEach((empresa: any) => {
        const area = empresa.area || "Sem área";
        if (!grouped[area]) grouped[area] = [];
        grouped[area].push(empresa);
    });

    const groupedArray = Object.entries(grouped).map(([area, companies]) => ({
        area,
        companies,
    }));

    setEmpresasRecomendadas(groupedArray);
    console.log(groupedArray);

}, [empresasRecomendadasRaw]);


    return (
        <Drawer >
            {pesquisadorAtual&&
            <DrawerPesquisador pesquisadorId={pesquisadorAtual.id} onCloseAutoFocus={(e) => e.preventDefault()}>
                <div className="h-full w-full pt-8 pl-10 pr-10 pb-8">
                    <div className="w-fit">
                        <p className="text-3xl font-medium mr-8"> Empresas Relevantes para Colaboração</p>
                        <div className="bg-eng-primary h-1"></div>
                    </div>
                    {isLoading ? 
                    <div className="mt-8 space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-[250px]" />
                            <Skeleton className="h-px w-full" />
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[90%]" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-[200px]" />
                            <Skeleton className="h-px w-full" />
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div> : (
                    empresasRecomendadas && empresasRecomendadas.map((grupo)=>{
                        return (<div key={grupo.area} className="mt-8">
                        <p className="text-2xl font-medium">{grupo.area}</p>
                        <Separator/>
                        {grupo.companies.map((empresa)=> {
                            return (
                            <div key={empresa.id} className="mt-5">
                                <p className="text-lg font-medium">{empresa.name}</p>
                                <p> {empresa.recommendationReason} </p>
                        </div>
                            )
                        })}
                      
                    </div>)
                    }))}
                    
                </div>
            </DrawerPesquisador>
            }
            <div className="w-full mt-12 px-6">
                {pesquisadores && pesquisadores.length > 0 && <div className="bg-neutral-50 rounded border border-border px-6 pb-6 pt-3">
                    <p className="ml-3 pb-3 font-light text-neutral-600">Pesquisadores encontrados</p>
                    <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] justify-items-start">
                        {pesquisadores && pesquisadores.map((pesquisador: Researcher)=>{
                            return <CardPesquisador key={pesquisador.id} pesquisador={pesquisador} onClick={handleClick}/>
                        })}
                        {!pesquisadores && <div className="w-full justify-center items-center"><Spinner variant="circle"/></div>}
                    </div>
                </div>}
            </div>
        </Drawer>

    );

}

const PesquisadoresSugeridosParaEmpresasArea = () => {
    const [sortBy, setSortBy] = useState('ordenar'); 
    const { empresaAtual, setPesquisadorRecomendadoAtual, pesquisadorRecomendadoAtual } = useEmpresas();
    const { data: pesquisadoresRecomendados, isFetching } = useQuery({
    queryKey: ["pesquisadoresRecomendados", empresaAtual?.id, sortBy], 
    
    queryFn: () => {
        if (!empresaAtual) {
            return null;
        }

        let apiUrl = `/api/proxys/company-recommended-researchers?id=${encodeURI(empresaAtual.id)}`;

        if (sortBy !== 'ordenar') {
            apiUrl += `&sort=${sortBy}`;
        }

        return fetch(apiUrl).then(r => r.json());
    },
    enabled: !!empresaAtual,
    placeholderData: (previousData) => previousData
    });

    const handleClick = (pesquisador: RecommendedResearcher) => {
        setPesquisadorRecomendadoAtual(pesquisador);
    }

    const handleSort = (novoSort: string) => {
        if (sortBy == novoSort){
            setSortBy('ordenar');
        } else {
            setSortBy(novoSort);
        }
    }

    const getSortLabel = (sortBy: string) => {
        switch(sortBy){
            case 'areaEstudo':
                return "Área de Estudo";
                break;
            case 'flexibilidade':
                return "Flexibilidade";
                break;
            case 'experienciaAcademica':
                return "Experiência Acadêmica";
                break;
            default:
                return "Ordenar";
                break;
        }
    }
    
    return (
        <Drawer>
            {pesquisadorRecomendadoAtual &&
            <DrawerPesquisador pesquisadorId={pesquisadorRecomendadoAtual.id} onCloseAutoFocus={(e) => e.preventDefault()}>
                <div className="h-full w-full pt-8 pl-10 pr-10 pb-8">
                    <div className="w-fit">
                        <p className="text-3xl font-medium mr-8"> Pesquisador Recomendado</p>
                        <div className="bg-eng-primary h-1"></div>
                    </div>
                    <div className="mt-8 flex-cols gap-5" >
                        {pesquisadorRecomendadoAtual.recommendationReason &&
                        <div className="flex-2">
                            <p className="text-2xl font-medium">Por que?</p>
                            <Separator/>
                            <div className="mt-5">
                                <p> {pesquisadorRecomendadoAtual?.recommendationReason} </p>
                            </div>
                        </div>
                        }
                        <div className="flex-1">
                            <div className="mt-5">
                                <ChartPesquisador criteria={pesquisadorRecomendadoAtual.criteria}/>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </DrawerPesquisador>
            }
            <div className={`w-full mt-12 px-6 ${!empresaAtual && 'hidden'}`}>
                <div className="bg-neutral-50 rounded border border-border px-6 pb-6 pt-3">
                    <div className="w-full flex items-center justify-between">
                        <p className="ml-3 pb-3 font-light text-neutral-600">Pesquisadores recomendados para <strong className="font-bold">{empresaAtual && empresaAtual.name}</strong></p>
                        <div className="pb-3 ">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"outline"} className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-border"  >
                                        <ArrowDown01 className="text-neutral-600 hover"/> 
                                        <p className="text-neutral-600">{getSortLabel(sortBy)}</p>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align={"end"}>
                                    <DropdownMenuGroup>
                                    <DropdownMenuItem onSelect={() => handleSort('areaEstudo')}>
                                        Área de Estudo 
                                        {sortBy === 'areaEstudo' && <Check className="ml-auto h-4 w-4" />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleSort('flexibilidade')}>
                                        Flexibilidade 
                                        {sortBy === 'flexibilidade' && <Check className="ml-auto h-4 w-4" />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleSort('experienciaAcademica')}>
                                        Experiência Acadêmica
                                        {sortBy === 'experienciaAcademica' && <Check className="ml-auto h-4 w-4" />}
                                    </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            
                        </div>
                    </div>
                    
                    <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] justify-items-start">
                        {isFetching ? (
                        <div className="flex w-full justify-center items-center">
                           <Spinner variant="circle"/>
                        </div>
                    ) : (
                        pesquisadoresRecomendados && pesquisadoresRecomendados.map((pesquisador: RecommendedResearcher) => (
                            <CardPesquisadorEmpresa key={pesquisador.id} pesquisador={pesquisador} onClick={handleClick}/>
                        ))
                    )}
                        
                       
                    </div>
                </div>
            </div>
        </Drawer>

    );

}

export { PesquisadoresSugeridosArea, PesquisadoresSugeridosParaEmpresasArea };