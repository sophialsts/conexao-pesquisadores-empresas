import {
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Researcher } from "@/types/researchers.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";


const DrawerPesquisador = ({ onCloseAutoFocus, children, pesquisadorId }: {
    onCloseAutoFocus?: (event: Event) => void
    children?: React.ReactNode,
    pesquisadorId: string

}) => {
    const { data: pesquisador } = useQuery({
    queryKey: ["pesquisador", pesquisadorId],
    queryFn: () => fetch(`/api/proxys/researcher-retrieve-by-id?id=${encodeURI(pesquisadorId)}`).then(r => r.json()),
    enabled: !!pesquisadorId,
    });

    const [imageError, setImageError] = useState(false);
        
        const url = `https://iapos-api.senaicimatec.com.br/ResearcherData/Image?researcher_id=${pesquisadorId}`;
    
        useEffect(() => {
            setImageError(false);
        }, [pesquisadorId]);

    
   
    return (      
        <DrawerContent onCloseAutoFocus={onCloseAutoFocus} className="h-[95%]"> 
            <VisuallyHidden>
                <DrawerTitle>Área do Pesquisador</DrawerTitle>
            </VisuallyHidden>
            
            <div className="overflow-y-auto w-full h-full">
            
                <div className="flex flex-col md:flex-row min-h-full">
                    
                    <div className="flex-1 min-w-0">
                        {children}
                    </div>

                    <div className="order-first md:order-none flex-shrink-0 flex flex-col items-center pt-10 px-10 pb-10 w-full md:w-[450px] border-l border-b">

                        <div className="relative flex-shrink-0 bg-neutral-100 flex justify-center items-center aspect-square rounded-2xl border border-border h-60">
                            <User className="text-neutral-600" size={150}/>
                            {(imageError || !url || !pesquisador) && <User className="text-neutral-600" size={"150"}/>}
                            
                            {pesquisador && url && !imageError && 
                                <Image 
                                    alt={`Foto de ${pesquisador.name}`} 
                                    src={url} 
                                    fill={true} 
                                    className="object-cover" 
                                    unoptimized={true}
                                    onError={() => setImageError(true)}/>
                            }
                        </div>
                        <div className="flex-shrink-0 flex flex-col w-full px-6 pt-2">
                            <div className="min-h-[2.5rem] flex items-end">
                                <p className="text-2xl font-medium leading-tight line-clamp-2">
                                    {pesquisador && pesquisador.name} 
                                </p>
                            </div>
                            <div className="w-full h-1 bg-eng-primary" />
                            <p className="text-left font-normal line-clamp-2">
                                {pesquisador && pesquisador.sigla}
                            </p>
                        </div>
                        <div className="mt-8 w-full pl-4">
                            <p className="font-medium text-xl">Sobre</p>
                        </div>
                        <Separator/>
                        <div className="px-4 pt-2 w-full">
                            <p className="w-full text-sm">  {pesquisador && pesquisador.abstract}  </p>
                        </div>
                    </div>
                </div>
            </div>
        </DrawerContent>
    );
}

export { DrawerPesquisador };