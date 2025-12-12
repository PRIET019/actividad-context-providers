import { createContext, useContext, useEffect, useState } from "react";
import es from "../locales/es.json";
import en from "../locales/en.json";



const translations = { es, en } as const;

const THEME_KEY: string = "app-theme";

type Language = 'es' | 'en';

type ThemeContextType = {
    language: Language;
    toggleTheme: ()=>void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


type ThemeProviderProps = {
    children: React.ReactNode;
}

export default function LanguageSwitcher({children}: ThemeContextType) {
    // TODO
    //const {language, setLanguage} = useLanguage();
    /* --------------------------- */
    // Eliminar
    const currentTheme = window.localStorage.getItem(THEME_KEY)
    const storedTheme = currentTheme === 'es' ? 'es' : 'en';

    const [language, setLanguage] = useState<Language>(storedTheme);


    const toggleTheme = () => {
        setLanguage((lang: Language) => (lang==="en" ? "es" : "en"));
    }


   
   useEffect(() => {
    const root = document.documentElement;
    if(language==='es'){
        root.classList.add('es');
    }else {
        root.classList.remove('es');
    }
    window.localStorage.setItem(THEME_KEY, language);
   }, [language]);

   const value:ThemeContextType = {language, toggleTheme}


    return (
        <div
            className="flex text-xs border rounded-md overflow-hidden bg-white dark:bg-slate-800 dark:border-slate-600">
            <button
                onClick={() => setLanguage("es")}
                className={`px-2 py-1 ${
                    language === "es"
                        ? "bg-slate-900 text-white"
                        : "text-slate-900 bg-white dark:bg-slate-800 dark:text-slate-100"
                }`}
            >
                ES
            </button>
            <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 ${
                    language === "en"
                        ? "bg-slate-900 text-white"
                        : "text-slate-900 bg-white dark:bg-slate-800 dark:text-slate-100"
                }`}
            >
                EN
            </button>
        </div>
    );

    export function useTheme(){
        const ctx = useContext(ThemeContext);
        if(!ctx){
            throw new Error("useTheme debe usarse dentro de un themProvider");
        }
        return ctx;
    }
}