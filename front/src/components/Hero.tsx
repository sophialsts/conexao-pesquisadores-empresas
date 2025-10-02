import { SearchBarEmpresas, SearchBarPesquisadores } from "@/components/SearchBar";
import { EmpresasSugeridas } from "@/components/EmpresasSugeridas";

const HeroEmpresas = () => {
  return (
    <section className="pt-20">
      <div className="container flex flex-col items-center text-center gap-10">
        
        <h1 className="text-4xl font-semibold lg:text-5xl max-w-3xl leading-tight">
          Encontre o{" "}
          <strong className="bg-eng-primary rounded-md px-3 pb-2 text-white font-medium">
            colaborador ideal
          </strong>{" "}
          para sua empresa
        </h1>

        <div className="w-full max-w-5xl">
          <SearchBarEmpresas placeholder="Pesquise sua empresa" />
          <EmpresasSugeridas/>
        </div>
      </div>
    </section>
  );
};

const HeroPesquisadores = () => {
  return (
    <section className="pt-20">
      <div className="container flex flex-col items-center text-center gap-10">
        
        <h1 className="text-4xl font-semibold lg:text-5xl max-w-3xl leading-tight">
          Encontre as{" "}
          <strong className="bg-eng-primary rounded-md px-3 pb-2 text-white font-medium">
            empresas ideais
          </strong>{" "}
          para colaborar
        </h1>

        <div className="w-full max-w-5xl">
          <SearchBarPesquisadores placeholder="Pesquise seu nome"/>
        </div>
      </div>
    </section>
  );
};


export {HeroEmpresas, HeroPesquisadores}