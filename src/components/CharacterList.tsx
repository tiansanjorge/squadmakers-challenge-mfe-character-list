import { useEffect, useState, Suspense, lazy } from "react";
import { Tarjeta } from "tarjeta-lib";
import "../index.css";

const CharacterDetail = lazy(() => import("detailApp/CharacterDetail"));

type Character = {
  id: number;
  name: string;
  species: string;
  image: string;
  location: { name: string; url: string };
  origin: { name: string; url: string };
  status: "Alive" | "Dead" | "unknown";
  gender: string;
  episode: string[];
};

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [episodes, setEpisodes] = useState<
    { nombre: string; codigo: string }[]
  >([]);

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

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {characters.map((char) => (
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
    </div>
  );
};

export default CharacterList;
