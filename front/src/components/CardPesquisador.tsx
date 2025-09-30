import { User } from "lucide-react";
import Image from "next/image";
const CardPesquisador = ({nome, instituicao, url}:{
    nome: string,
    instituicao: string
    url?:string
}) => {
    return (
        <div className="cursor-pointer h-80 w-60 rounded border border-border hover:bg-card-selection hover:shadow-sm bg-white py-6 flex flex-col items-center transition-all">
            <div className="bg-neutral-100 border border-border rounded h-36 aspect-square flex justify-center items-center">
                {!url && <User className="text-neutral-600" size={"96"}/>}
                {url && 
                <Image alt="" src={url} fill={true}/>
                }
            </div>
            <div className="flex flex-col w-full px-8 pt-1">
                <div className="min-h-[2.5rem] flex items-end">
                <p className="text-sm font-medium leading-tight line-clamp-2">
                    {nome}
                </p>
                </div>

                <div className="w-full h-1 bg-eng-primary" />

                <p className="text-xs text-left font-normal line-clamp-2">
                {instituicao}
                </p>
            </div>

        </div>
    );
}

export { CardPesquisador }