
export default function ThemeToggle() {
    // TODO
    //const { theme, toggleTheme } = useTheme();
    /* --------------------------- */
    // Eliminar
    const theme = "light";
    const toggleTheme = () =>{
        alert('Cambiando el tema...');
    }
    /* --------------------------- */

    const label = theme === "light" ? "🌞 Light" : "🌙 Dark";

    return (
        
        <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-md border border-slate-400 bg-white text-xs flex items-center gap-2 dark:bg-slate-800 dark:border-slate-500"
        >
            <span>{label}</span>
        </button>
        
    );
}