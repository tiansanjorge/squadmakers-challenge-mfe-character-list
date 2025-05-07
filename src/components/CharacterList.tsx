import { useEffect, useState, lazy, Suspense } from "react";
import { Tarjeta } from "tarjeta-lib";

const CharacterDetail = lazy(() => import("detailApp/CharacterDetail"));

type Character = {
  id: number;
  name: string;
  species: string;
  image: string;
  location: { name: string };
  origin: { name: string };
  status: "Alive" | "Dead" | "unknown";
  gender: string;
  episode: string[];
};

type Episode = {
  id: number;
  name: string;
  episode: string;
};

export const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results));
  }, []);

  useEffect(() => {
    if (selectedCharacter) {
      const episodeIds = selectedCharacter.episode.map((url) =>
        url.split("/").pop()
      );
      const endpoint = `https://rickandmortyapi.com/api/episode/${episodeIds.join(
        ","
      )}`;

      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => setEpisodes(Array.isArray(data) ? data : [data]));
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
            ultimaUbicacion={char.location.name}
            primeraAparicion={char.origin.name}
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
        <Suspense fallback={<div>Cargando detalle...</div>}>
          <CharacterDetail
            nombre={selectedCharacter.name}
            imagen={selectedCharacter.image}
            especie={selectedCharacter.species}
            ultimaUbicacion={selectedCharacter.location.name}
            primeraAparicion={selectedCharacter.origin.name}
            estado={
              selectedCharacter.status === "Alive"
                ? "Vivo"
                : selectedCharacter.status === "Dead"
                ? "Muerto"
                : "Desconocido"
            }
            genero={selectedCharacter.gender}
            episodios={episodes}
          />
        </Suspense>
      )}
    </div>
  );
};
