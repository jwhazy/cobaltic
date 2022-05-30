import { createContext, ReactNode, useMemo } from "react";

interface DefaultContext {}

const AppContext = createContext<Partial<DefaultContext>>({});

type Props = {
  children: ReactNode;
};

function AppProvider({ children }: Props) {
  const value = useMemo(() => ({}), []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
