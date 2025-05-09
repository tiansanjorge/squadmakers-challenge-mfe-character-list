import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import CharacterList from "./CharacterList";
import * as ReactList from "react";
console.log("React in list:", ReactList);

type Props = {
  searchText: string;
  resetSearch: () => void;
};

const CharacterListWithStore = ({ searchText, resetSearch }: Props) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CharacterList searchText={searchText} resetSearch={resetSearch} />
    </PersistGate>
  </Provider>
);

export default CharacterListWithStore;
