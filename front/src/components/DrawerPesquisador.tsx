import {
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Researcher } from "@/types/researchers.types";


const DrawerPesquisador = ({ onCloseAutoFocus, children, pesquisador }: {
    onCloseAutoFocus?: (event: Event) => void
    children?: React.ReactNode,
    pesquisador: Researcher
}) => {
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

                        <div className="flex-shrink-0 bg-neutral-100 flex justify-center items-center aspect-square rounded-2xl border border-border h-60">
                            <User className="text-neutral-600" size={150}/>
                        </div>
                        <div className="flex-shrink-0 flex flex-col w-full px-6 pt-2">
                            <div className="min-h-[2.5rem] flex items-end">
                                <p className="text-2xl font-medium leading-tight line-clamp-2">
                                    {pesquisador && pesquisador.name} 
                                </p>
                            </div>
                            <div className="w-full h-1 bg-eng-primary" />
                            <p className="text-left font-normal line-clamp-2">
                                UFMG
                            </p>
                        </div>
                        <div className="mt-8 w-full pl-4">
                            <p className="font-medium text-xl">Sobre</p>
                        </div>
                        <Separator/>
                        <div className="px-4 pt-2 w-full">
                            <p className="w-full text-sm">  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium pharetra elit eget viverra. Proin hendrerit, felis ac iaculis eleifend, odio diam ornare dui, eu rhoncus nulla elit eu nisl. Aenean pellentesque nibh in arcu aliquet cursus. Nunc convallis orci eget tincidunt accumsan. Cras a lacus sed ligula condimentum tempus. Morbi non eros sit amet mi aliquam auctor non a quam. Praesent rhoncus volutpat condimentum. Integer rutrum facilisis ultricies. Aliquam at felis sodales, finibus neque nec, fermentum dui. Sed convallis blandit ipsum sollicitudin mollis. Aliquam quis arcu aliquet, porta ex at, porta nulla. Phasellus magna erat, egestas ac massa vel, congue condimentum metus. Aenean blandit id justo ac congue. Integer augue odio, pellentesque in sapien ut, semper rhoncus tellus.  </p>
                        </div>
                    </div>
                </div>
            </div>
        </DrawerContent>
    );
}

export { DrawerPesquisador };