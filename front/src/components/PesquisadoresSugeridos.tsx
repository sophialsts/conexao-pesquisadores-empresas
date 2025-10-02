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
import { useState } from "react";
import { ChartPesquisador } from "./ChartPesquisador";
import { useEmpresas } from "@/app/context/empresas.context";
import { useQuery } from "@tanstack/react-query";
import { RecommendedResearcher, Researcher } from "@/types/researchers.types";
import { usePesquisadores } from "@/app/context/pesquisadores.context";

const PesquisadoresSugeridosArea = () => {
    const { pesquisadores, setPesquisadorAtual, pesquisadorAtual } = usePesquisadores()

    const handleClick = (pesquisador: Researcher) => {
        setPesquisadorAtual(pesquisador);
    }

    return (
        <Drawer >
            <DrawerPesquisador pesquisador={pesquisadorAtual as Researcher} onCloseAutoFocus={(e) => e.preventDefault()}>
                <div className="h-full w-full pt-8 pl-10 pr-10 pb-8">
                    <div className="w-fit">
                        <p className="text-3xl font-medium mr-8"> Empresas Relevantes para Colaboração</p>
                        <div className="bg-eng-primary h-1"></div>
                    </div>
                    <div className="mt-8">
                        <p className="text-2xl font-medium">Computação</p>
                        <Separator/>
                        <div className="mt-5">
                            <p className="text-lg font-medium">Empresa 1</p>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium pharetra elit eget viverra. Proin hendrerit, felis ac iaculis eleifend, odio diam ornare dui, eu rhoncus nulla elit eu nisl. Aenean pellentesque nibh in arcu aliquet cursus. Nunc convallis orci eget tincidunt accumsan. Cras a lacus sed ligula condimentum tempus. Morbi non eros sit amet mi aliquam auctor non a quam. Praesent rhoncus volutpat condimentum. Integer rutrum facilisis ultricies. Aliquam at felis sodales, finibus neque nec, fermentum dui. Sed convallis blandit ipsum sollicitudin mollis. Aliquam quis arcu aliquet, porta ex at, porta nulla. Phasellus magna erat, egestas ac massa vel, congue condimentum metus. Aenean blandit id justo ac congue. Integer augue odio, pellentesque in sapien ut, semper rhoncus tellus. </p>
                        </div>
                        <div className="mt-5">
                            <p className="text-lg font-medium">Empresa 2</p>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium pharetra elit eget viverra. Proin hendrerit, felis ac iaculis eleifend, odio diam ornare dui, eu rhoncus nulla elit eu nisl. Aenean pellentesque nibh in arcu aliquet cursus. Nunc convallis orci eget tincidunt accumsan. Cras a lacus sed ligula condimentum tempus. Morbi non eros sit amet mi aliquam auctor non a quam. Praesent rhoncus volutpat condimentum. Integer rutrum facilisis ultricies. Aliquam at felis sodales, finibus neque nec, fermentum dui. Sed convallis blandit ipsum sollicitudin mollis. Aliquam quis arcu aliquet, porta ex at, porta nulla. Phasellus magna erat, egestas ac massa vel, congue condimentum metus. Aenean blandit id justo ac congue. Integer augue odio, pellentesque in sapien ut, semper rhoncus tellus. </p>
                        </div>
                    </div>
                    <div className="mt-8"> 
                        <p className="text-2xl font-medium">Finanças</p>
                        <Separator/>
                        <div className="mt-5">
                            <p className="text-lg font-medium">Empresa 1</p>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium pharetra elit eget viverra. Proin hendrerit, felis ac iaculis eleifend, odio diam ornare dui, eu rhoncus nulla elit eu nisl. Aenean pellentesque nibh in arcu aliquet cursus. Nunc convallis orci eget tincidunt accumsan. Cras a lacus sed ligula condimentum tempus. Morbi non eros sit amet mi aliquam auctor non a quam. Praesent rhoncus volutpat condimentum. Integer rutrum facilisis ultricies. Aliquam at felis sodales, finibus neque nec, fermentum dui. Sed convallis blandit ipsum sollicitudin mollis. Aliquam quis arcu aliquet, porta ex at, porta nulla. Phasellus magna erat, egestas ac massa vel, congue condimentum metus. Aenean blandit id justo ac congue. Integer augue odio, pellentesque in sapien ut, semper rhoncus tellus. </p>
                        </div>
                        <div className="mt-5">
                            <p className="text-lg font-medium">Empresa 2</p>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium pharetra elit eget viverra. Proin hendrerit, felis ac iaculis eleifend, odio diam ornare dui, eu rhoncus nulla elit eu nisl. Aenean pellentesque nibh in arcu aliquet cursus. Nunc convallis orci eget tincidunt accumsan. Cras a lacus sed ligula condimentum tempus. Morbi non eros sit amet mi aliquam auctor non a quam. Praesent rhoncus volutpat condimentum. Integer rutrum facilisis ultricies. Aliquam at felis sodales, finibus neque nec, fermentum dui. Sed convallis blandit ipsum sollicitudin mollis. Aliquam quis arcu aliquet, porta ex at, porta nulla. Phasellus magna erat, egestas ac massa vel, congue condimentum metus. Aenean blandit id justo ac congue. Integer augue odio, pellentesque in sapien ut, semper rhoncus tellus. </p>
                        </div>
                    </div>
                </div>
            </DrawerPesquisador>
            <div className="w-full mt-12 px-6">
                {pesquisadores && pesquisadores.length > 0 && <div className="bg-neutral-50 rounded border border-border px-6 pb-6 pt-3">
                    <p className="ml-3 pb-3 font-light text-neutral-600">Pesquisadores encontrados</p>
                    <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] justify-items-center">
                        {pesquisadores && pesquisadores.map((pesquisador: Researcher)=>{
                            return <CardPesquisador key={pesquisador.id} pesquisador={pesquisador} instituicao="USP" onClick={handleClick}/>
                        })}
                    </div>
                </div>}
            </div>
        </Drawer>

    );

}

const PesquisadoresSugeridosParaEmpresasArea = () => {
    const [sortBy, setSortBy] = useState('ordenar'); 
    const { empresaAtual, setPesquisadorRecomendadoAtual, pesquisadorRecomendadoAtual } = useEmpresas();
    const { data: pesquisadoresRecomendados } = useQuery({
    queryKey: ["pesquisadores", empresaAtual?.id],
    queryFn: () => {
        if (!empresaAtual) {
            return Promise.resolve(null);
        }
        return fetch(`/api/proxys/company-recommended-researchers?id=${encodeURI(empresaAtual.id)}`).then(r => r.json());
    },
    enabled: !!empresaAtual,
    });

    const handleClick = (pesquisador: RecommendedResearcher) => {
        setPesquisadorRecomendadoAtual(pesquisador);
        console.log(pesquisadorRecomendadoAtual)
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
            
            <DrawerPesquisador pesquisador={pesquisadorRecomendadoAtual as Researcher} onCloseAutoFocus={(e) => e.preventDefault()}>
                <div className="h-full w-full pt-8 pl-10 pr-10 pb-8">
                    <div className="w-fit">
                        <p className="text-3xl font-medium mr-8"> Pesquisador Recomendado</p>
                        <div className="bg-eng-primary h-1"></div>
                    </div>
                    <div className="mt-8 flex-cols gap-5" >
                        <div className="flex-2">
                            <p className="text-2xl font-medium">Por que?</p>
                            <Separator/>
                            <div className="mt-5">
                                <p> {pesquisadorRecomendadoAtual?.recomendationReason} </p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="mt-5">
                                <ChartPesquisador/>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </DrawerPesquisador>
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
                    
                    <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] justify-items-center">
                        {pesquisadoresRecomendados && pesquisadoresRecomendados.map((pesquisador: RecommendedResearcher)=>{
                            <CardPesquisadorEmpresa pesquisador={pesquisador} instituicao="USP" onClick={handleClick}/>
                        })}
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        <CardPesquisadorEmpresa onClick={handleClick} pesquisador={{name: "Eduardo Martins da Silva", id:"", criteria:[], recomendationReason:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut venenatis ipsum. Fusce sed tristique leo. Proin ut semper lectus, dapibus rutrum ex. Quisque ac leo erat. Vivamus rutrum condimentum justo, sed maximus enim condimentum at. Ut sed lectus tempus, commodo nunc in, placerat tortor. Sed et dignissim velit. Donec ultricies mauris nec magna elementum rutrum. Donec nisl mauris, pretium ut lectus non, malesuada rutrum nisi. Nunc tincidunt nibh tincidunt, maximus purus et, ultrices est. Maecenas vitae convallis enim, vel gravida dolor. Pellentesque sed iaculis sapien, vel condimentum dolor. "}} instituicao="USP"/>
                        
                       
                    </div>
                </div>
            </div>
        </Drawer>

    );

}

export { PesquisadoresSugeridosArea, PesquisadoresSugeridosParaEmpresasArea };