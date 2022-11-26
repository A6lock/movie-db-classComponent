import { createContext } from 'react';

const { Provider: GenresProvider, Consumer: GenresConsumer } = createContext();
const { Provider: GuestSessionProvider, Consumer: GuestSessionConsumer } =
  createContext();

export {
  GenresProvider,
  GenresConsumer,
  GuestSessionProvider,
  GuestSessionConsumer,
};
