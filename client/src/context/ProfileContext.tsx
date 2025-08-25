import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ProfileContextType {
  isProfile: boolean;
  setIsProfile: (value: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [isProfile, setIsProfile] = useState(false);

  return (
    <ProfileContext.Provider value={{ isProfile, setIsProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within ProfileProvider");
  return context;
};
