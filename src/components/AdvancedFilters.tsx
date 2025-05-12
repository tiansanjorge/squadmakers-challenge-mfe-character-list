import React from "react";
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
                ? "bg-[#8BC547] text-[#354E18] border-[#8BC547]"
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
      <h2 className="text-lg font-semibold text-gray-800 mb-8">
        Filtros avanzados
      </h2>

      <div className="mb-4 text-md">
        <h3 className="font-semibold text-sm">Especie</h3>
        {renderChips("especie", ["Human", "Alien"])}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-sm">Género</h3>
        {renderChips("genero", ["Male", "Female", "unknown"])}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-sm">Estado</h3>
        {renderChips("estado", ["Alive", "Dead", "unknown"])}
      </div>

      <div className="flex justify-end border-t-2 border-gray-100">
        <button
          onClick={() => onAplicar(filtros)}
          className="mt-4 bg-[#8BC547] text-[#354E18] px-6 py-2 rounded-full font-semibold hover:bg-[#5d931f] transition"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
};
