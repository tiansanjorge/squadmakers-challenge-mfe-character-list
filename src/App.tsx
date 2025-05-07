import "./App.css";
import { CharacterList } from "./components/characterlist";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-center py-6">Personajes</h1>
        <CharacterList />
      </div>
    </>
  );
}

export default App;
