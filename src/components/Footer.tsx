import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <footer className={`py-12 text-center text-xs border-t relative z-10 font-mono tracking-widest uppercase transition-colors duration-500 ${
            isLight 
                ? 'bg-[#fafafa] border-zinc-200 text-zinc-600' 
                : 'bg-black border-zinc-900 text-zinc-500'
        }`}>
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p>&copy; {new Date().getFullYear()} <span className={`font-bold ${isLight ? 'text-zinc-950' : 'text-white'}`}>ABDUR RAHMAN</span>. ALL RIGHTS RESERVED.</p>
                <div className={`flex items-center gap-6 font-mono text-[11px] ${
                    isLight ? 'text-zinc-600' : 'text-zinc-500'
                }`}>
                    <span>DESIGNED & BUILT WITH REACT</span>
                    <span>•</span>
                    <span>MUMBAI, IN</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
