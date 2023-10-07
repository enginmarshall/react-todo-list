import * as React from "react";
import { IAppContext } from "./models/IAppContext";

export const appContext = React.createContext<IAppContext | null>(null);

export const AppContextProvider = appContext.Provider;

export const AppContextConsumer = appContext.Consumer;
