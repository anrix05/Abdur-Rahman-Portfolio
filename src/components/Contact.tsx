import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CONTACT_EMAIL = 'abdur.rahman@vit.edu.in';

const Contact = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrorMsg(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setErrorMsg("Please fill in all fields before sending.");
            return;
        }

        const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
        const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        
        try {
            const mailWindow = window.open(mailtoLink, '_blank');
            if (mailWindow) {
                setSubmitted(true);
            } else {
                window.location.href = mailtoLink;
                setSubmitted(true);
            }
        } catch {
            setErrorMsg("Could not open email client automatically. Please send directly to abdur.rahman@vit.edu.in");
        }
    };

    return (
        <section className="relative w-full py-12">
            
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`mb-12 border-b pb-6 w-full ${
                    isLight ? 'border-zinc-200' : 'border-zinc-800'
                }`}
            >
                <span className="text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase">05 / CONTACT</span>
                <h2 className={`font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-[0.05em] uppercase mt-1 leading-tight break-words ${
                    isLight ? 'text-zinc-950' : 'text-white'
                }`}>
                    GET IN TOUCH
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
                
                {/* Left Info Column */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-5 w-full space-y-6"
                >
                    <p className={`text-sm sm:text-base leading-relaxed font-normal ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>
                        I am currently open to full-time roles, internships, and freelance engineering contracts in Frontend and Mobile Development. 
                        Feel free to send an inquiry message below.
                    </p>

                    <div className="space-y-3 pt-2 w-full">
                        <a 
                            href={`mailto:${CONTACT_EMAIL}`} 
                            className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-colors group shadow-lg w-full ${
                                isLight 
                                    ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}
                        >
                            <div className={`p-3 rounded-xl border shrink-0 transition-colors ${
                                isLight 
                                    ? 'bg-zinc-100 border-zinc-200 text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white' 
                                    : 'bg-zinc-900 border-zinc-800 text-white group-hover:bg-white group-hover:text-black'
                            }`}>
                                <Mail size={18} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] sm:text-xs text-zinc-500 font-mono tracking-widest uppercase">DIRECT EMAIL</p>
                                <p className={`text-xs sm:text-sm font-mono font-medium truncate ${isLight ? 'text-zinc-950' : 'text-white'}`}>{CONTACT_EMAIL}</p>
                            </div>
                        </a>

                        <a 
                            href="https://www.linkedin.com/in/abdur-rahman-vit/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-colors group shadow-lg w-full ${
                                isLight 
                                    ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}
                        >
                            <div className={`p-3 rounded-xl border shrink-0 transition-colors ${
                                isLight 
                                    ? 'bg-zinc-100 border-zinc-200 text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white' 
                                    : 'bg-zinc-900 border-zinc-800 text-white group-hover:bg-white group-hover:text-black'
                            }`}>
                                <Linkedin size={18} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] sm:text-xs text-zinc-500 font-mono tracking-widest uppercase">LINKEDIN</p>
                                <p className={`text-xs sm:text-sm font-mono font-medium truncate ${isLight ? 'text-zinc-950' : 'text-white'}`}>abdur-rahman-vit</p>
                            </div>
                        </a>

                        <a 
                            href="https://github.com/anrix05" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-colors group shadow-lg w-full ${
                                isLight 
                                    ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}
                        >
                            <div className={`p-3 rounded-xl border shrink-0 transition-colors ${
                                isLight 
                                    ? 'bg-zinc-100 border-zinc-200 text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white' 
                                    : 'bg-zinc-900 border-zinc-800 text-white group-hover:bg-white group-hover:text-black'
                            }`}>
                                <Github size={18} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] sm:text-xs text-zinc-500 font-mono tracking-widest uppercase">GITHUB PROFILE</p>
                                <p className={`text-xs sm:text-sm font-mono font-medium truncate ${isLight ? 'text-zinc-950' : 'text-white'}`}>anrix05</p>
                            </div>
                        </a>
                    </div>
                </motion.div>

                {/* Right Form Column */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`lg:col-span-7 w-full border p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl ${
                        isLight 
                            ? 'bg-white border-zinc-200 shadow-zinc-200/50' 
                            : 'bg-zinc-950 border-zinc-800'
                    }`}
                >
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 w-full">
                            <div className={`p-4 rounded-full border ${
                                isLight ? 'bg-zinc-100 text-zinc-950 border-zinc-300' : 'bg-zinc-900 text-white border-zinc-800'
                            }`}>
                                <CheckCircle2 size={36} />
                            </div>
                            <h3 className={`font-display text-xl sm:text-2xl font-bold uppercase tracking-wider ${
                                isLight ? 'text-zinc-950' : 'text-white'
                            }`}>MESSAGE DRAFT CREATED</h3>
                            <p className={`text-xs sm:text-sm max-w-md ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                Your email client has been launched with your message pre-filled. If it didn't open, reach me directly at <span className={`font-mono font-bold ${isLight ? 'text-zinc-950' : 'text-white'}`}>{CONTACT_EMAIL}</span>.
                            </p>
                            <button
                                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                                className={`mt-2 text-xs font-mono underline tracking-widest uppercase cursor-pointer ${
                                    isLight ? 'text-zinc-600 hover:text-zinc-950' : 'text-zinc-500 hover:text-white'
                                }`}
                            >
                                SEND ANOTHER MESSAGE
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 w-full">
                            <div className="w-full">
                                <label className={`block text-[11px] sm:text-xs font-mono mb-2 uppercase tracking-widest font-semibold ${
                                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                                }`}>YOUR NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="JANE DOE"
                                    className={`w-full border rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm transition-all font-mono ${
                                        isLight 
                                            ? 'bg-zinc-50 border-zinc-300 text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950' 
                                            : 'bg-black border-zinc-800 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white'
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                                <label className={`block text-[11px] sm:text-xs font-mono mb-2 uppercase tracking-widest font-semibold ${
                                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                                }`}>YOUR EMAIL</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="JANE@COMPANY.COM"
                                    className={`w-full border rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm transition-all font-mono ${
                                        isLight 
                                            ? 'bg-zinc-50 border-zinc-300 text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950' 
                                            : 'bg-black border-zinc-800 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white'
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                                <label className={`block text-[11px] sm:text-xs font-mono mb-2 uppercase tracking-widest font-semibold ${
                                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                                }`}>MESSAGE</label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="TELL ME ABOUT YOUR PROJECT OR ROLE..."
                                    className={`w-full border rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm transition-all font-mono ${
                                        isLight 
                                            ? 'bg-zinc-50 border-zinc-300 text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950' 
                                            : 'bg-black border-zinc-800 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white'
                                    }`}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 rounded-2xl font-mono font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl cursor-pointer ${
                                    isLight 
                                        ? 'bg-zinc-950 text-white hover:bg-zinc-800' 
                                        : 'bg-white text-black hover:bg-zinc-200'
                                }`}
                            >
                                <span>SEND MESSAGE</span>
                                <Send size={15} />
                            </button>

                            {errorMsg && (
                                <p className="text-xs text-rose-500 text-center font-mono pt-2 tracking-wider font-semibold">
                                    {errorMsg}
                                </p>
                            )}
                        </form>
                    )}
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
