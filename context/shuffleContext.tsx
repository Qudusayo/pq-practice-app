import { createContext, useContext, useState } from "react";

interface SwitchContextType {
  shuffled: boolean;
  selection: number[];
  shuffleToggler: () => void;
  toggleSelection: (entry: number) => void;
}

export const SwitchContext = createContext<SwitchContextType | null>(null);

export const SwitchProvider = ({ children }: { children: React.ReactNode }) => {
  const [shuffled, setShuffled] = useState(true);
  const [selection, setSelection] = useState<number[]>([1]);
  const shuffleToggler = () => setShuffled((isShuffled) => !isShuffled);

  const toggleSelection = (entry: number) => {
    setSelection((prevSelections) => {
      if (prevSelections.includes(entry)) {
        if (prevSelections.length !== 1) {
          return prevSelections.filter((sector) => sector != entry);
        } else {
          return prevSelections;
        }
      } else {
        return [...prevSelections, entry];
      }
    });
  };

  let sharedState = {
    shuffled,
    selection,
    toggleSelection,
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
