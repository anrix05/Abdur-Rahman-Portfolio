import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <footer 
            className={`pt-10 text-xs border-t relative z-10 font-mono tracking-widest uppercase transition-colors duration-500 ${
                isLight 
                    ? 'bg-[#fafafa] border-zinc-200 text-zinc-600' 
                    : 'bg-black border-zinc-900 text-zinc-500'
            }`}
            style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 text-center sm:text-left">
                <p className="text-[11px] sm:text-xs">
                    &copy; {new Date().getFullYear()} <span className={`font-bold ${isLight ? 'text-zinc-950' : 'text-white'}`}>ABDUR RAHMAN</span>. ALL RIGHTS RESERVED.
                </p>
                <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[10px] sm:text-[11px] ${
                    isLight ? 'text-zinc-600' : 'text-zinc-500'
                }`}>
                    <span>FULL-STACK & MOBILE DEV</span>
                    <span aria-hidden="true">•</span>
                    <span>MUMBAI, IN</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
