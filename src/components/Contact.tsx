import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle2 } from 'lucide-react';

const CONTACT_EMAIL = 'abdur.rahman@vit.edu.in';

const Contact = () => {
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
                className="mb-14 border-b border-zinc-800 pb-6"
            >
                <span className="text-xs font-mono text-zinc-500 tracking-[0.25em] uppercase">05 / CONTACT</span>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[0.1em] uppercase text-white mt-1">
                    GET IN TOUCH
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Info Column */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-5 space-y-6"
                >
                    <p className="text-zinc-400 text-base leading-relaxed font-normal">
                        I am currently open to full-time roles, internships, and freelance engineering contracts in Frontend and Mobile Development. 
                        Feel free to send a inquiry message below.
                    </p>

                    <div className="space-y-3 pt-2">
                        <a 
                            href={`mailto:${CONTACT_EMAIL}`} 
                            className="flex items-center gap-4 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors group"
                        >
                            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white group-hover:bg-white group-hover:text-black transition-colors">
                                <Mail size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">DIRECT EMAIL</p>
                                <p className="text-sm font-mono font-medium text-white">{CONTACT_EMAIL}</p>
                            </div>
                        </a>

                        <a 
                            href="https://www.linkedin.com/in/abdur-rahman-vit/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors group"
                        >
                            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white group-hover:bg-white group-hover:text-black transition-colors">
                                <Linkedin size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">LINKEDIN</p>
                                <p className="text-sm font-mono font-medium text-white">abdur-rahman-vit</p>
                            </div>
                        </a>

                        <a 
                            href="https://github.com/anrix05" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors group"
                        >
                            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white group-hover:bg-white group-hover:text-black transition-colors">
                                <Github size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">GITHUB PROFILE</p>
                                <p className="text-sm font-mono font-medium text-white">anrix05</p>
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
                    className="lg:col-span-7 bg-zinc-950 border border-zinc-800 p-8 sm:p-10 rounded-3xl"
                >
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                            <div className="p-4 rounded-full bg-zinc-900 text-white border border-zinc-800">
                                <CheckCircle2 size={36} />
                            </div>
                            <h3 className="font-display text-2xl font-bold uppercase text-white tracking-wider">MESSAGE DRAFT CREATED</h3>
                            <p className="text-sm text-zinc-400 max-w-md">
                                Your email client has been launched with your message pre-filled. If it didn't open, reach me directly at <span className="text-white font-mono">{CONTACT_EMAIL}</span>.
                            </p>
                            <button
                                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                                className="mt-2 text-xs font-mono text-zinc-500 hover:text-white underline tracking-widest uppercase"
                            >
                                SEND ANOTHER MESSAGE
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-widest">YOUR NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="JANE DOE"
                                    className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-white transition-all font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-widest">YOUR EMAIL</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="JANE@COMPANY.COM"
                                    className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-white transition-all font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-widest">MESSAGE</label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="TELL ME ABOUT YOUR PROJECT OR ROLE..."
                                    className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-white transition-all font-mono"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white text-black font-mono font-extrabold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl"
                            >
                                <span>SEND MESSAGE</span>
                                <Send size={15} />
                            </button>

                            {errorMsg && (
                                <p className="text-xs text-rose-400 text-center font-mono pt-2 tracking-wider">
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
