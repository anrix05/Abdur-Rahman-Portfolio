import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const CONTACT_EMAIL = 'abdur.rahman@vit.edu.in';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        setSubmitted(true);
    };

    return (
        <section className="py-20 flex flex-col items-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-neon-lime to-emerald"
            >
                Get In Touch
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl px-4">

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <h3 className="text-2xl font-bold text-white">Let's Connect</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        I'm currently looking for new opportunities in Frontend Development and React Native. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-4">
                        <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 text-gray-300 hover:text-neon-lime transition-colors p-4 bg-white/5 rounded-xl border border-white/5 hover:border-neon-lime/30">
                            <FaEnvelope className="text-xl" />
                            <span>{CONTACT_EMAIL}</span>
                        </a>
                        <a href="https://www.linkedin.com/in/abdur-rahman-vit/" className="flex items-center gap-4 text-gray-300 hover:text-emerald transition-colors p-4 bg-white/5 rounded-xl border border-white/5 hover:border-emerald/30">
                            <FaLinkedin className="text-xl" />
                            <span>LinkedIn Profile</span>
                        </a>
                        <a href="https://github.com/anrix05" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/30">
                            <FaGithub className="text-xl" />
                            <span>GitHub Profile</span>
                        </a>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
                >
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                            <div className="text-5xl">✅</div>
                            <h4 className="text-xl font-bold text-white">Message Ready!</h4>
                            <p className="text-gray-400">Your email client should have opened. If not, reach me directly at {CONTACT_EMAIL}</p>
                            <button
                                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                                className="mt-4 text-neon-lime underline text-sm"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-lime focus:ring-1 focus:ring-neon-lime transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-lime focus:ring-1 focus:ring-neon-lime transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                    className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-lime focus:ring-1 focus:ring-neon-lime transition-all"
                                    placeholder="What's on your mind?"
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-neon-lime to-emerald text-obsidian font-bold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(204,255,0,0.2)]">
                                Send Message
                            </button>
                        </form>
                    )}
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
