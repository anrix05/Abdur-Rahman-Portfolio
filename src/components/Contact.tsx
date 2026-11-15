import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle2, Download, AlertCircle, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG } from '../config/site';
import { TiltCard } from './common/TiltCard';

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
        <section className="relative w-full pt-0 pb-12 scroll-mt-28 [perspective:1400px]">
            
            {/* Header with 3D Reveal */}
            <motion.div
                initial={{ opacity: 0, rotateX: 12, y: 40, z: -80 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`mb-12 border-b pb-6 w-full will-change-transform ${
                    isLight ? 'border-zinc-200' : 'border-zinc-800'
                }`}
            >
                <span className={`text-[clamp(10px,2.5vw,12px)] font-mono tracking-[0.2em] uppercase font-semibold ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>05 / CONTACT</span>
                <h2 className={`font-display font-extrabold text-[clamp(1.5rem,6vw,3rem)] tracking-[0.04em] sm:tracking-[0.08em] uppercase mt-1 leading-tight break-words ${
                    isLight ? 'text-zinc-950' : 'text-white'
                }`}>
                    GET IN TOUCH
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
                
                {/* Left Info Column */}
                <motion.div
                    initial={{ opacity: 0, rotateX: 12, y: 40, z: -80 }}
                    whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-5 w-full space-y-6 will-change-transform"
                >
                    <p className={`text-sm sm:text-base leading-relaxed font-normal ${
                        isLight ? 'text-zinc-700' : 'text-zinc-300'
                    }`}>
                        I am currently open to full-time roles, internships, and freelance engineering contracts in Full-Stack and Mobile Development. 
                        Feel free to send a message or download my resume below.
                    </p>

                    {/* Editorial Location & Availability Card with TiltCard */}
                    <TiltCard maxTilt={6}>
                        <div className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 shadow-lg [transform-style:preserve-3d] ${
                            isLight ? 'bg-zinc-100/70 border-zinc-200' : 'bg-zinc-950 border-zinc-800'
                        }`}>
                            <div 
                                style={{ transform: 'translateZ(24px)' }}
                                className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase transition-transform"
                            >
                                <span className={isLight ? 'text-zinc-600 font-semibold' : 'text-zinc-400'}>CURRENT BASE</span>
                                <span className="inline-flex items-center gap-1.5 text-emerald-500 font-bold">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    ACTIVE
                                </span>
                            </div>
                            <p 
                                style={{ transform: 'translateZ(18px)' }}
                                className={`text-base sm:text-lg font-display font-extrabold uppercase mt-2 tracking-wide transition-transform ${
                                    isLight ? 'text-zinc-950' : 'text-white'
                                }`}
                            >
                                MUMBAI, MAHARASHTRA, IN
                            </p>
                            <p 
                                style={{ transform: 'translateZ(12px)' }}
                                className={`text-xs font-mono mt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}
                            >
                                19.0760° N, 72.8777° E · IST (UTC+05:30)
                            </p>
                        </div>
                    </TiltCard>

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
                                }`}>DIRECT INBOX</p>
                                <p className={`font-mono text-xs sm:text-sm truncate font-bold mt-0.5 ${
                                    isLight ? 'text-zinc-950' : 'text-white'
                                }`}>{SITE_CONFIG.email}</p>
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
                                }`}>NETWORK</p>
                                <p className={`font-mono text-xs sm:text-sm truncate font-bold mt-0.5 ${
                                    isLight ? 'text-zinc-950' : 'text-white'
                                }`}>linkedin.com/in/anrix</p>
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
                                }`}>OPEN SOURCE</p>
                                <p className={`font-mono text-xs sm:text-sm truncate font-bold mt-0.5 ${
                                    isLight ? 'text-zinc-950' : 'text-white'
                                }`}>github.com/anrix-official</p>
                            </div>
                        </a>

                        {/* Resume PDF Download */}
                        <a 
                            href="/resume.pdf" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-colors group shadow-lg w-full ${
                                isLight 
                                    ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}
                            aria-label="Download Resume (PDF)"
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
                                <p className={`font-mono text-xs sm:text-sm truncate font-bold mt-0.5 ${
                                    isLight ? 'text-zinc-950' : 'text-white'
                                }`}>resume.pdf</p>
                            </div>
                        </a>
                    </div>
                </motion.div>

                {/* Right Form Column with TiltCard */}
                <motion.div
                    initial={{ opacity: 0, rotateX: 12, y: 40, z: -80 }}
                    whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-7 w-full will-change-transform"
                >
                    <TiltCard maxTilt={5} className="w-full">
                        <div className={`p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border shadow-2xl relative [transform-style:preserve-3d] ${
                            isLight 
                                ? 'bg-white border-zinc-200 shadow-zinc-200/50' 
                                : 'bg-zinc-950 border-zinc-800'
                        }`}>
                            {submitted ? (
                                <div 
                                    ref={successRef}
                                    tabIndex={-1}
                                    role="status"
                                    aria-live="polite"
                                    style={{ transform: 'translateZ(30px)' }}
                                    className="py-12 sm:py-16 text-center space-y-4 focus:outline-none"
                                >
                                    <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 size={28} />
                                    </div>
                                    <h3 className={`font-display font-extrabold text-xl sm:text-2xl uppercase tracking-wider ${
                                        isLight ? 'text-zinc-950' : 'text-white'
                                    }`}>
                                        MESSAGE DISPATCHED
                                    </h3>
                                    <p className={`text-xs sm:text-sm font-mono max-w-sm mx-auto ${
                                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                                    }`}>
                                        Thank you for reaching out. I'll get back to you promptly within 24 hours.
                                    </p>
                                    <button 
                                        type="button"
                                        onClick={() => setSubmitted(false)}
                                        className={`mt-4 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                                            isLight 
                                                ? 'bg-zinc-100 text-zinc-900 border-zinc-300 hover:bg-zinc-200' 
                                                : 'bg-zinc-900 text-zinc-200 border-zinc-700 hover:bg-zinc-800'
                                        }`}
                                    >
                                        SEND ANOTHER MESSAGE
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 w-full [transform-style:preserve-3d]">
                                    <div className="w-full">
                                        <label 
                                            htmlFor="contact-name"
                                            className={`block text-[11px] sm:text-xs font-mono mb-2 uppercase tracking-widest font-semibold ${
                                                isLight ? 'text-zinc-700' : 'text-zinc-300'
                                            }`}
                                        >NAME</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            required
                                            aria-required="true"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="YOUR NAME OR ORGANIZATION"
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
                                        >EMAIL</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="email"
                                            required
                                            aria-required="true"
                                            value={form.email}
                                            onChange={handleChange}
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
                                        style={{ transform: 'translateZ(20px)' }}
                                        className={`w-full inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 min-h-[48px] rounded-2xl font-mono font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
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
                        </div>
                    </TiltCard>
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
