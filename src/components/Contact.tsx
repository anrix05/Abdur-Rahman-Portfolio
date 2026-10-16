import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle2, Download, AlertCircle, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG } from '../config/site';

const Contact = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const errorRef = useRef<HTMLParagraphElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrorMsg(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);

        // Client-side validation
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setErrorMsg("Please fill in all fields before sending.");
            errorRef.current?.focus();
            return;
        }

        const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

        // 1. If VITE_FORM_ENDPOINT is configured, use Formspree-style JSON POST
        if (endpoint) {
            setIsSubmitting(true);
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

                if (response.ok) {
                    setSubmitted(true);
                    setForm({ name: '', email: '', message: '' });
                    setTimeout(() => successRef.current?.focus(), 100);
                } else {
                    const data = await response.json().catch(() => null);
                    setErrorMsg(data?.error || "Failed to send message. Please reach out directly via email.");
                    errorRef.current?.focus();
                }
            } catch {
                setErrorMsg("Network error sending message. Please reach out directly via email.");
                errorRef.current?.focus();
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        // 2. Fallback: Mailto flow when no backend endpoint is configured
        const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
        const mailtoLink = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
        
        try {
            const mailWindow = window.open(mailtoLink, '_blank');
            if (mailWindow) {
                setSubmitted(true);
            } else {
                window.location.href = mailtoLink;
                setSubmitted(true);
            }
        } catch {
            setErrorMsg(`Could not launch email client automatically. Please send directly to ${SITE_CONFIG.email}`);
            errorRef.current?.focus();
        }
    };

    return (
        <section className="relative w-full pt-0 pb-12">
            
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
                <span className={`text-xs font-mono tracking-[0.2em] uppercase font-semibold ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>05 / CONTACT</span>
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
                        isLight ? 'text-zinc-700' : 'text-zinc-300'
                    }`}>
                        I am currently open to full-time roles, internships, and freelance engineering contracts in Full-Stack and Mobile Development. 
                        Feel free to send a message or download my resume below.
                    </p>

                    <div className="space-y-3 pt-2 w-full">
                        {/* Direct Email */}
                        <a 
                            href={`mailto:${SITE_CONFIG.email}`} 
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
                                <p className={`text-[10px] sm:text-xs font-mono tracking-widest uppercase font-semibold ${
                                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                                }`}>DIRECT EMAIL</p>
                                <p className={`text-xs sm:text-sm font-mono font-medium truncate ${isLight ? 'text-zinc-950' : 'text-white'}`}>{SITE_CONFIG.email}</p>
                            </div>
                        </a>

                        {/* Resume Download Card */}
                        <a 
                            href={SITE_CONFIG.resumeUrl}
                            target="_blank" 
                            rel="noopener noreferrer"
                            download="Abdur_Rahman_Resume.pdf"
                            className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-colors group shadow-lg w-full ${
                                isLight 
                                    ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}
                            aria-label="Download Abdur Rahman's Resume (PDF)"
                        >
                            <div className={`p-3 rounded-xl border shrink-0 transition-colors ${
                                isLight 
                                    ? 'bg-zinc-100 border-zinc-200 text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white' 
                                    : 'bg-zinc-900 border-zinc-800 text-white group-hover:bg-white group-hover:text-black'
                            }`}>
                                <Download size={18} />
                            </div>
                            <div className="overflow-hidden">
                                <p className={`text-[10px] sm:text-xs font-mono tracking-widest uppercase font-semibold ${
                                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                                }`}>CURRICULUM VITAE</p>
                                <p className={`text-xs sm:text-sm font-mono font-medium truncate ${isLight ? 'text-zinc-950' : 'text-white'}`}>DOWNLOAD RESUME (PDF)</p>
                            </div>
                        </a>

                        {/* LinkedIn */}
                        <a 
                            href={SITE_CONFIG.linkedinUrl} 
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
                                <p className={`text-[10px] sm:text-xs font-mono tracking-widest uppercase font-semibold ${
                                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                                }`}>LINKEDIN</p>
                                <p className={`text-xs sm:text-sm font-mono font-medium truncate ${isLight ? 'text-zinc-950' : 'text-white'}`}>abdur-rahman-vit</p>
                            </div>
                        </a>

                        {/* GitHub */}
                        <a 
                            href={SITE_CONFIG.githubUrl} 
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
                                <p className={`text-[10px] sm:text-xs font-mono tracking-widest uppercase font-semibold ${
                                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                                }`}>GITHUB PROFILE</p>
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
                        <div 
                            ref={successRef}
                            tabIndex={-1}
                            role="status"
                            aria-live="polite"
                            className="flex flex-col items-center justify-center text-center py-12 space-y-4 w-full focus:outline-none"
                        >
                            <div className={`p-4 rounded-full border ${
                                isLight ? 'bg-zinc-100 text-zinc-950 border-zinc-300' : 'bg-zinc-900 text-white border-zinc-800'
                            }`}>
                                <CheckCircle2 size={36} />
                            </div>
                            <h3 className={`font-display text-xl sm:text-2xl font-bold uppercase tracking-wider ${
                                isLight ? 'text-zinc-950' : 'text-white'
                            }`}>MESSAGE DISPATCHED</h3>
                            <p className={`text-xs sm:text-sm max-w-md ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                                Thank you for reaching out! Your message has been received. You can also reach me directly at <span className={`font-mono font-bold ${isLight ? 'text-zinc-950' : 'text-white'}`}>{SITE_CONFIG.email}</span>.
                            </p>
                            <button
                                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                                className={`mt-2 text-xs font-mono underline tracking-widest uppercase cursor-pointer ${
                                    isLight ? 'text-zinc-700 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'
                                }`}
                            >
                                SEND ANOTHER MESSAGE
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6 w-full">
                            <div className="w-full">
                                <label 
                                    htmlFor="contact-name"
                                    className={`block text-[11px] sm:text-xs font-mono mb-2 uppercase tracking-widest font-semibold ${
                                        isLight ? 'text-zinc-700' : 'text-zinc-300'
                                    }`}
                                >YOUR NAME</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    aria-required="true"
                                    value={form.name}
                                    onChange={handleChange}
                                    onFocus={(e) => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                                    placeholder="JANE DOE"
                                    className={`w-full border rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 min-h-[48px] text-base transition-all font-mono ${
                                        isLight 
                                            ? 'bg-zinc-50 border-zinc-300 text-zinc-950 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950' 
                                            : 'bg-black border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white'
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                                <label 
                                    htmlFor="contact-email"
                                    className={`block text-[11px] sm:text-xs font-mono mb-2 uppercase tracking-widest font-semibold ${
                                        isLight ? 'text-zinc-700' : 'text-zinc-300'
                                    }`}
                                >YOUR EMAIL</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    inputMode="email"
                                    autoComplete="email"
                                    required
                                    aria-required="true"
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={(e) => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                                    placeholder="JANE@COMPANY.COM"
                                    className={`w-full border rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 min-h-[48px] text-base transition-all font-mono ${
                                        isLight 
                                            ? 'bg-zinc-50 border-zinc-300 text-zinc-950 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950' 
                                            : 'bg-black border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white'
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                                <label 
                                    htmlFor="contact-message"
                                    className={`block text-[11px] sm:text-xs font-mono mb-2 uppercase tracking-widest font-semibold ${
                                        isLight ? 'text-zinc-700' : 'text-zinc-300'
                                    }`}
                                >MESSAGE</label>
                                <textarea
                                    id="contact-message"
                                    rows={4}
                                    name="message"
                                    required
                                    aria-required="true"
                                    value={form.message}
                                    onChange={handleChange}
                                    onFocus={(e) => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                                    placeholder="TELL ME ABOUT YOUR PROJECT OR ROLE..."
                                    className={`w-full border rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 min-h-[120px] text-base transition-all font-mono ${
                                        isLight 
                                            ? 'bg-zinc-50 border-zinc-300 text-zinc-950 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950' 
                                            : 'bg-black border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white'
                                    }`}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 min-h-[48px] rounded-2xl font-mono font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                                    isLight 
                                        ? 'bg-zinc-950 text-white hover:bg-zinc-800' 
                                        : 'bg-white text-black hover:bg-zinc-200'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={15} className="animate-spin" />
                                        <span>SENDING...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>SEND MESSAGE</span>
                                        <Send size={15} />
                                    </>
                                )}
                            </button>

                            {errorMsg && (
                                <p 
                                    ref={errorRef}
                                    tabIndex={-1}
                                    role="alert"
                                    aria-live="assertive"
                                    className="text-xs text-rose-500 text-center font-mono pt-2 tracking-wider font-semibold flex items-center justify-center gap-1.5 focus:outline-none"
                                >
                                    <AlertCircle size={14} />
                                    <span>{errorMsg}</span>
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
