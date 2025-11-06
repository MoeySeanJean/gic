import { createContext, useContext, useState } from "react";

interface UnsavedChangesContextType {
  isDirty: boolean;
  setDirty: (dirty: boolean) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  pendingPath: string | null;
  setPendingPath: (path: string | null) => void;
}

const UnsavedChangesContext = createContext<UnsavedChangesContextType | null>(null);

export const UnsavedChangesProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDirty, setDirty] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  return (
    <UnsavedChangesContext.Provider value={{ isDirty, setDirty, showModal, setShowModal, pendingPath, setPendingPath }}>
      {children}
    </UnsavedChangesContext.Provider>
  );
};

export const useUnsavedChanges = () => {
  const context = useContext(UnsavedChangesContext);
  if (!context) throw new Error("useUnsavedChanges must be used within UnsavedChangesProvider");
  return context;
};
