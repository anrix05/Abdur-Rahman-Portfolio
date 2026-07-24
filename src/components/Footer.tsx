const Footer = () => {
    return (
        <footer className="py-12 text-center text-zinc-500 text-xs border-t border-zinc-900 relative z-10 bg-black font-mono tracking-widest uppercase">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p>&copy; {new Date().getFullYear()} <span className="text-white font-bold">ABDUR RAHMAN</span>. ALL RIGHTS RESERVED.</p>
                <div className="flex items-center gap-6 font-mono text-[11px] text-zinc-500">
                    <span>DESIGNED & BUILT WITH REACT</span>
                    <span>•</span>
                    <span>MUMBAI, IN</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
