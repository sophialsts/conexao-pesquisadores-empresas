"use client";
import { CardPesquisador } from "./CardPesquisador";
import { Drawer } from "@/components/ui/drawer";    
import { DrawerPesquisador } from "./DrawerPesquisador";
import { Separator } from "@/components/ui/separator";

const PesquisadoresSugeridosArea = () => {
    return (
        <Drawer >
            <DrawerPesquisador onCloseAutoFocus={(e) => e.preventDefault()}>
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
                <div className="bg-neutral-50 rounded border border-border px-6 pb-6 pt-3">
                    <p className="ml-3 pb-3 font-light text-neutral-600">Pesquisadores encontrados</p>
                    <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] justify-items-center">
                        <CardPesquisador nome="Eduardo Martins da Silva" instituicao="USP" url="https://simcc.uesc.br/v3/api/ResearcherData/Image?researcher_id=4d98bfd6-fe1c-4580-9652-42f84d807c76"/>
                        <CardPesquisador nome="Carolina Rodrigues Albuquerque" instituicao="UFRJ" />
                        <CardPesquisador nome="Felipe Takashi Yamamoto" instituicao="UNICAMP" />
                        <CardPesquisador nome="Mariana Gomes Azevedo" instituicao="UFSC" />
                        <CardPesquisador nome="André Luiz Coutinho" instituicao="UFMG" />
                        <CardPesquisador nome="Beatriz Karolina Martins" instituicao="PUC-Rio" />
                        <CardPesquisador nome="Ricardo Vieira Rocha" instituicao="ITA" />
                        <CardPesquisador nome="Fernanda Pereira Oliveira" instituicao="UNESP" />
                        <CardPesquisador nome="João Henrique Farias" instituicao="UFRGS" />
                        <CardPesquisador nome="Laura Santos Antunes" instituicao="UFRN" />
                        <CardPesquisador nome="Gabriel Castro Mendes" instituicao="UFPE" />
                        <CardPesquisador nome="Natália Ribeiro Pires" instituicao="UFG" />
                        <CardPesquisador nome="Rafael Barbosa Tavares" instituicao="UFBA" />
                        <CardPesquisador nome="Sofia Duarte Moreira" instituicao="MIT" />
                        <CardPesquisador nome="Lucas Matheus Fonseca" instituicao="ETH Zürich" />
                    </div>
                </div>
            </div>
        </Drawer>

    );

}

const PesquisadoresSugeridosCard = () => {
    return (
        <></>
    );
}

export {PesquisadoresSugeridosArea, PesquisadoresSugeridosCard };