import { SearchBar } from "@/components/SearchBar";

const HeroEmpresas = () => {
  return (
    <section className="pt-20 pb-16">
      <div className="container flex flex-col items-center text-center gap-10">
        
        <h1 className="text-4xl font-semibold lg:text-5xl max-w-3xl leading-tight">
          Encontre o{" "}
          <strong className="bg-eng-primary rounded-md px-3 pb-2 text-white font-medium">
            colaborador ideal
          </strong>{" "}
          para sua empresa
        </h1>

        <div className="w-full max-w-5xl">
          <SearchBar placeholder="Pesquise sua empresa" />
        </div>
      </div>
    </section>
  );
};

const HeroPesquisadores = () => {
  return (
    <section className="pt-20 pb-16">
      <div className="container flex flex-col items-center text-center gap-10">
        
        <h1 className="text-4xl font-semibold lg:text-5xl max-w-3xl leading-tight">
          Encontre as{" "}
          <strong className="bg-eng-primary rounded-md px-3 pb-2 text-white font-medium">
            empresas ideais
          </strong>{" "}
          para colaborar
        </h1>

        <div className="w-full max-w-5xl">
          <SearchBar placeholder="Pesquise seu nome"/>
        </div>
      </div>
    </section>
  );
};


export {HeroEmpresas, HeroPesquisadores}