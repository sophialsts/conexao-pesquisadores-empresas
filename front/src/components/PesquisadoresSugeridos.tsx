import { CardPesquisador } from "./CardPesquisador";
    
const PesquisadoresSugeridosArea = () => {
    return (
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

    );

}

const PesquisadoresSugeridosCard = () => {
    return (
        <></>
    );
}

export {PesquisadoresSugeridosArea, PesquisadoresSugeridosCard };