"use client";

import { User } from "lucide-react";
import { DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";
import { RecommendedResearcher, Researcher } from "@/types/researchers.types";
import { useEffect, useState } from "react";

const CardPesquisador = ({pesquisador, instituicao, onClick}:{
    pesquisador: Researcher,
    instituicao: string,
    url?:string,
    onClick?: (pesquisador: Researcher) => void;
}) => {
    const [imageError, setImageError] = useState(false);

    const url = `https://simcc.uesc.br/v3/api/ResearcherData/Image?researcher_id=${pesquisador.id}`;
    useEffect(() => {
        setImageError(false);
    }, [pesquisador.id]);

     const handleCardClick = () => {
        if (onClick) {
            onClick(pesquisador);
        }
    };
    return (
        <DrawerTrigger asChild>
            <div onClick={handleCardClick} className="cursor-pointer h-80 w-60 rounded border border-border hover:bg-card-selection hover:shadow-sm bg-white py-6 flex flex-col items-center transition-all">
                <div className="overflow-hidden relative bg-neutral-100 border border-border rounded h-36 aspect-square flex justify-center items-center">
                     {(imageError || !url) && <User className="text-neutral-600" size={"96"}/>}

                        {url && !imageError && 
                            <Image 
                                alt={`Foto de ${pesquisador.name}`} 
                                src={url} 
                                fill={true} 
                                className="object-cover" 
                                unoptimized={true}
                                onError={() => setImageError(true)}
                            />
                        }
                </div>
                <div className="flex flex-col w-full px-8 pt-1">
                    <div className="min-h-[2.5rem] flex items-end">
                    <p className="text-sm font-medium leading-tight line-clamp-2">
                        {pesquisador.name}
                    </p>
                    </div>

                    <div className="w-full h-1 bg-eng-primary" />

                    <p className="text-xs text-left font-normal line-clamp-2">
                    {instituicao}
                    </p>
                </div>
            </div>
        </DrawerTrigger>
    );
}

const CardPesquisadorEmpresa = ({pesquisador, instituicao, onClick}:{
    pesquisador: RecommendedResearcher,
    instituicao: string,
    onClick?: (pesquisador: RecommendedResearcher) => void;
}) => {
    const [imageError, setImageError] = useState(false);
    
    const url = `https://simcc.uesc.br/v3/api/ResearcherData/Image?researcher_id=${pesquisador.id}`;

    useEffect(() => {
        setImageError(false);
    }, [pesquisador.id]);

    const handleCardClick = () => {
        if (onClick) {
            onClick(pesquisador);
        }
    };
    
    return (
        <DrawerTrigger asChild>
            <div onClick={handleCardClick} className="cursor-pointer h-80 w-60 rounded border border-border hover:bg-card-selection hover:shadow-sm bg-white pt-4 flex flex-col items-center transition-all pb-3">
                <div className="overflow-hidden relative bg-neutral-100 border border-border rounded h-36 aspect-square flex justify-center items-center">
                    {(imageError || !url) && <User className="text-neutral-600" size={"96"}/>}

                    {url && !imageError && 
                        <Image 
                            alt={`Foto de ${pesquisador.name}`} 
                            src={url} 
                            fill={true} 
                            className="object-cover" 
                            unoptimized={true}
                            onError={() => setImageError(true)}
                        />
                    }
                </div>
                <div className="flex flex-col w-full px-8 pt-1">
                    <div className="min-h-[2.5rem] flex items-end">
                    <p className="text-sm font-medium leading-tight line-clamp-2">
                        {pesquisador.name}
                    </p>
                    </div>

                    <div className="w-full h-1 bg-eng-primary" />

                    <p className="text-xs text-left font-normal line-clamp-2">
                    {instituicao}
                    </p>
                </div>
                <div className="w-full px-4 pt-2">
                    <div className="bg-neutral-200 rounded flex flex-col text-xs font-medium">
                        <div className="flex justify-between items-center p-1.5 border-b border-neutral-300">
                            <p>Área de Estudo</p>
                            <div className="flex items-center gap-1">
                                <div className="rounded-full bg-neutral-400 outline-1 outline-neutral-400  aspect-square h-2"></div>
                                <div className="rounded-full bg-neutral-400 outline-1 outline-neutral-400  aspect-square h-2"></div>
                                <div className="rounded-full bg-neutral-400 outline-1  outline-neutral-400 aspect-square h-2"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-1.5 border-b border-neutral-300">
                            <p>Flexibilidade</p>
                            <div className="flex items-center gap-1">
                                <div className="rounded-full bg-neutral-400 outline-1 outline-neutral-400  aspect-square h-2"></div>
                                <div className="rounded-full bg-neutral-400 outline-neutral-400  aspect-square h-2"></div>
                                <div className="rounded-full bg-white outline-1  outline-neutral-400 aspect-square h-2"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-1.5">
                            <p>Experiência Acadêmica</p>
                            <div className="flex items-center gap-1">
                                <div className="rounded-full bg-neutral-400 outline-1 outline-neutral-400  aspect-square h-2"></div>
                                <div className="rounded-full bg-white outline-1 outline-neutral-400  aspect-square h-2"></div>
                                <div className="rounded-full bg-white outline-1  outline-neutral-400 aspect-square h-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DrawerTrigger>
    );
}


export { CardPesquisador, CardPesquisadorEmpresa }