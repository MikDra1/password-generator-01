/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, createContext } from "react";
import useScreenSize from "../hooks/useScreenSize";

const ProjectContext = createContext({
  isMobile: false,
  isTablet: false,
  password: '',
  setPassword: (password: string) => {}
});

function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [password, setPassword] = useState("");
  const screenSize = useScreenSize();

  useEffect(
    function () {
      setIsMobile(screenSize.width <= 600);
      setIsTablet(screenSize.width <= 1200);
    },
    [screenSize.width]
  );

  return (
    <ProjectContext.Provider
      value={{
        isMobile: isMobile ?? false,
        isTablet: isTablet ?? false,
        password: password ?? '',
        setPassword: setPassword
      }}  
    >
      {children}
    </ProjectContext.Provider>
  );
}

function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined)
    throw new Error("ProjectContext was used outside the ProjectProvider");
  return context;
}

export { ProjectProvider, useProject };
