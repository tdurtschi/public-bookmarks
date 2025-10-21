import { createContext, useContext } from "react";

export const DependencyInjectionContext = createContext(undefined);

export function useDependencyInjection() {
  const context = useContext(DependencyInjectionContext);
  if (!context) {
    throw new Error(
      "useDependencyInjection must be used within a DependencyInjectionProvider",
    );
  }
  return context;
}

export function DependencyInjectionProvider({ children, services }) {
  return (
    <DependencyInjectionContext.Provider value={services}>
      {children}
    </DependencyInjectionContext.Provider>
  );
}
