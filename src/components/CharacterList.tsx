import { useEffect, useState, Suspense, lazy } from "react";
import { Tarjeta } from "tarjeta-lib";
import { SlidersHorizontalIcon } from "lucide-react";
import { Modal } from "../components/Modal";
import { AdvancedFilters } from "../components/AdvancedFilters";
import "../index.css";

const CharacterDetail = lazy(() => import("detailApp/CharacterDetail"));

type Character = {
  id: number;
  name: string;
  species: "Human" | "Alien";
  image: string;
  location: { name: string; url: string };
  origin: { name: string; url: string };
  status: "Alive" | "Dead" | "unknown";
  gender: "Male" | "Female" | "unknown";
  episode: string[];
};

type Filters = {
  especie: string[];
  genero: string[];
  estado: string[];
};

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [episodes, setEpisodes] = useState<
    { nombre: string; codigo: string }[]
  >([]);
  const [activo, setActivo] = useState<"todos" | "favoritos">("todos");
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    especie: [],
    genero: [],
    estado: [],
  });

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results));
  }, []);

  useEffect(() => {
    if (selectedCharacter) {
      Promise.all(
        selectedCharacter.episode.map((epUrl) =>
          fetch(epUrl)
            .then((res) => res.json())
            .then((ep) => ({
              nombre: ep.name,
              codigo: ep.episode,
            }))
        )
      ).then(setEpisodes);
    }
  }, [selectedCharacter]);

  const filteredCharacters = characters.filter((char) => {
    const matchEspecie =
      filters.especie.length === 0 || filters.especie.includes(char.species);

    const matchGenero =
      filters.genero.length === 0 || filters.genero.includes(char.gender);

    const estadoTraducido =
      char.status === "Alive"
        ? "Vivo"
        : char.status === "Dead"
        ? "Muerto"
        : "Desconocido";

    const matchEstado =
      filters.estado.length === 0 || filters.estado.includes(estadoTraducido);

    return matchEspecie && matchGenero && matchEstado;
  });

  return (
    <div className="p-8">
      {/* Pestañas & Boton Filtros */}
      <div className="flex items-center justify-between px-4 py-2 bg-white rounded-full shadow-sm max-w-md mx-auto">
        <div className="flex space-x-4">
          <button
            onClick={() => setActivo("todos")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              activo === "todos" ? "bg-lime-300 text-black" : "text-gray-700"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActivo("favoritos")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              activo === "favoritos"
                ? "bg-lime-300 text-black"
                : "text-gray-700"
            }`}
          >
            Favoritos
          </button>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-8 h-8 rounded-full bg-white shadow border border-gray-300 flex items-center justify-center"
        >
          <SlidersHorizontalIcon className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Filtros aplicados + total */}
      <div className="flex flex-wrap justify-between items-start gap-4 py-6">
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Filtros aplicados
          </p>
          <div className="flex flex-wrap gap-2">
            {["Humano", "Femenino", "Muerto"].map((filtro) => (
              <span
                key={filtro}
                className="flex items-center bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
              >
                {filtro}
                <button className="ml-2 text-gray-600 hover:text-gray-800">
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
          {filteredCharacters.length} personajes
        </div>
      </div>

      {/* Lista de personajes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCharacters.map((char) => (
          <Tarjeta
            key={char.id}
            nombre={char.name}
            especie={char.species}
            imagen={char.image}
            ubicacion={char.location.name}
            origen={char.origin.name}
            estado={
              char.status === "Alive"
                ? "Vivo"
                : char.status === "Dead"
                ? "Muerto"
                : "Desconocido"
            }
            esFavorito={false}
            onClick={() => setSelectedCharacter(char)}
          />
        ))}
      </div>

      {selectedCharacter && (
        <Suspense
          fallback={<p className="mt-6 text-center">Cargando detalle...</p>}
        >
          <CharacterDetail
            nombre={selectedCharacter.name}
            imagen={selectedCharacter.image}
            especie={selectedCharacter.species}
            estado={
              selectedCharacter.status === "Alive"
                ? "Vivo"
                : selectedCharacter.status === "Dead"
                ? "Muerto"
                : "Desconocido"
            }
            genero={selectedCharacter.gender}
            origen={selectedCharacter.origin.name}
            ubicacion={selectedCharacter.location.name}
            episodios={episodes}
          />
        </Suspense>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <AdvancedFilters
          valoresIniciales={filters}
          onAplicar={(filtros) => {
            setFilters(filtros);
            setShowModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default CharacterList;
