 import {createContext, useContext, useEffect, useState} from "react";

const THEME_KEY: string = "app-theme";

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    toggleTheme: ()=>void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
    children: React.ReactNode;
}

export default function ThemeProvider({children}:ThemeProviderProps){


    const currentTheme = window.localStorage.getItem(THEME_KEY);
    const storedTheme  = currentTheme==='dark' ? 'dark' : 'light';

    const [theme,setTheme] = useState<Theme>(storedTheme);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };
    
    

    useEffect(() => {
        debugger;
        const root = document.documentElement;
        if (theme === 'dark'){
            root.classList.add('dark');
        }else{
            root.classList.remove('dark');
        }
       window.localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const value:ThemeContextType =  {theme,toggleTheme}

    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
}

export function useTheme(){
    const ctx = useContext(ThemeContext);
    if(!ctx){
        throw new Error("useTheme debe usarse dentro de un ThemeProvider");
    }
    return ctx;
}