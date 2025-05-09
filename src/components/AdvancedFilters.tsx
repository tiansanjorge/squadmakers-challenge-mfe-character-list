import { useState } from "react";

type FiltroAvanzadoProps = {
  valoresIniciales: {
    especie: string[];
    estado: string[];
    genero: string[];
  };
  onAplicar: (filtros: {
    especie: string[];
    estado: string[];
    genero: string[];
  }) => void;
};

export const AdvancedFilters = ({
  valoresIniciales,
  onAplicar,
}: FiltroAvanzadoProps) => {
  const [filtros, setFiltros] = useState(valoresIniciales);

  const toggle = (tipo: keyof typeof filtros, valor: string) => {
    const actual = filtros[tipo];
    const actualizado = actual.includes(valor)
      ? actual.filter((v) => v !== valor)
      : [...actual, valor];

    setFiltros({ ...filtros, [tipo]: actualizado });
  };

  const renderChips = (tipo: keyof typeof filtros, opciones: string[]) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {opciones.map((opcion) => {
        const activo = filtros[tipo].includes(opcion);
        return (
          <button
            key={opcion}
            onClick={() => toggle(tipo, opcion)}
            className={`px-4 py-1 rounded-full border text-sm ${
              activo
                ? "bg-lime-500 text-white border-lime-500"
                : "border-gray-300 text-gray-700"
            }`}
          >
            {opcion}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-xl max-w-xl mx-auto shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Filtros avanzados
      </h2>

      <div className="mb-4">
        <h3 className="font-medium">Especie</h3>
        {renderChips("especie", ["Human", "Alien"])}
      </div>

      <div className="mb-4">
        <h3 className="font-medium">Género</h3>
        {renderChips("genero", ["Male", "Female", "unknown"])}
      </div>

      <div className="mb-4">
        <h3 className="font-medium">Estado</h3>
        {renderChips("estado", ["Alive", "Dead", "unknown"])}
      </div>

      <button
        onClick={() => onAplicar(filtros)}
        className="mt-4 bg-lime-500 text-white px-6 py-2 rounded-full hover:bg-lime-600 transition"
      >
        Aplicar filtros
      </button>
    </div>
  );
};
