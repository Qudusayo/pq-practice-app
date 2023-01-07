import { createContext, useContext, useState } from "react";

interface SwitchContextType {
  shuffled: boolean;
  shuffleToggler: () => void;
}

export const SwitchContext = createContext<SwitchContextType | null>(null);

export const SwitchProvider = ({ children }: { children: React.ReactNode }) => {
  const [shuffled, setShuffled] = useState(true);
  const shuffleToggler = () => setShuffled((isShuffled) => !isShuffled);

  let sharedState = {
    shuffled,
    shuffleToggler,
  };

  return (
    <SwitchContext.Provider value={sharedState}>
      {children}
    </SwitchContext.Provider>
  );
};

export function useSwitchContext() {
  return useContext(SwitchContext);
}
