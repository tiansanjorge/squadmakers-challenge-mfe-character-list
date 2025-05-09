import { useEffect, useState, Suspense, lazy } from "react";
import { Tarjeta } from "tarjeta-lib";
import { SlidersHorizontalIcon } from "lucide-react";
import { Modal } from "../components/Modal";
import { AdvancedFilters } from "../components/AdvancedFilters";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import type { RootState } from "../store";

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
  const dispatch = useDispatch();
  const favoritos = useSelector((state: RootState) => state.favorites);

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

  const filteredCharacters = characters
    .filter((char) => {
      const matchEspecie =
        filters.especie.length === 0 || filters.especie.includes(char.species);
      const matchGenero =
        filters.genero.length === 0 || filters.genero.includes(char.gender);
      const matchEstado =
        filters.estado.length === 0 || filters.estado.includes(char.status);

      return matchEspecie && matchGenero && matchEstado;
    })
    .filter((char) => {
      if (activo === "favoritos") {
        return favoritos.some((f) => f.id === char.id);
      }
      return true;
    });

  const removeFiltro = (tipo: keyof Filters, valor: string) => {
    setFilters((prev) => ({
      ...prev,
      [tipo]: prev[tipo].filter((v) => v !== valor),
    }));
  };

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
            {(["especie", "genero", "estado"] as const).flatMap((tipo) =>
              filters[tipo].map((valor) => (
                <span
                  key={`${tipo}-${valor}`}
                  className="flex items-center bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
                >
                  {valor}
                  <button
                    onClick={() => removeFiltro(tipo, valor)}
                    className="ml-2 text-gray-600 hover:text-gray-800"
                  >
                    ✕
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
          {filteredCharacters.length} personajes
        </div>
      </div>

      {/* Lista de personajes */}
      {filteredCharacters.length === 0 ? (
        <div className="text-center py-12">
          {activo === "favoritos" && favoritos.length === 0 ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Sin favoritos
              </h2>
              <p className="text-gray-600 mb-6">
                Aún no marcaste ningún personaje como favorito.
              </p>
              <button
                onClick={() => setActivo("todos")}
                className="bg-white border border-green-900 text-green-900 font-semibold py-2 px-6 rounded-full shadow-sm hover:bg-gray-100 transition"
              >
                Ver todos los personajes
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Oh no!</h2>
              <p className="text-gray-600 mb-6">
                ¡Pareces perdido en tu viaje!
              </p>
              <button
                onClick={() => {
                  setFilters({ especie: [], genero: [], estado: [] });
                  setActivo("todos");
                }}
                className="bg-white border border-green-900 text-green-900 font-semibold py-2 px-6 rounded-full shadow-sm hover:bg-gray-100 transition"
              >
                Limpiar filtros
              </button>
            </>
          )}
        </div>
      ) : (
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
              esFavorito={favoritos.some((f) => f.id === char.id)}
              onClick={() => setSelectedCharacter(char)}
              onToggleFavorito={() =>
                dispatch(
                  toggleFavorite({
                    id: char.id,
                    nombre: char.name,
                    especie: char.species,
                    imagen: char.image,
                    ubicacion: char.location.name,
                    origen: char.origin.name,
                    estado:
                      char.status === "Alive"
                        ? "Vivo"
                        : char.status === "Dead"
                        ? "Muerto"
                        : "Desconocido",
                  })
                )
              }
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={!!selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      >
        <Suspense
          fallback={<p className="text-center py-8">Cargando detalle...</p>}
        >
          {selectedCharacter && (
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
              esFavorito={favoritos.some((f) => f.id === selectedCharacter.id)}
              onToggleFavorito={() =>
                dispatch(
                  toggleFavorite({
                    id: selectedCharacter.id,
                    nombre: selectedCharacter.name,
                    especie: selectedCharacter.species,
                    imagen: selectedCharacter.image,
                    ubicacion: selectedCharacter.location.name,
                    origen: selectedCharacter.origin.name,
                    estado:
                      selectedCharacter.status === "Alive"
                        ? "Vivo"
                        : selectedCharacter.status === "Dead"
                        ? "Muerto"
                        : "Desconocido",
                  })
                )
              }
            />
          )}
        </Suspense>
      </Modal>

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
