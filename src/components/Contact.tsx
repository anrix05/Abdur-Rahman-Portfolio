import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
    return (
        <section className="py-20 flex flex-col items-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
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
                        <a href="mailto:abdur.rahman@vit.edu.in" className="flex items-center gap-4 text-gray-300 hover:text-purple-400 transition-colors p-4 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30">
                            <FaEnvelope className="text-xl" />
                            <span>abdur.rahman@vit.edu.in</span>
                        </a>
                        <a href="https://www.linkedin.com/in/abdur-rahman-513a5b351" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/30">
                            <FaLinkedin className="text-xl" />
                            <span>LinkedIn Profile</span>
                        </a>
                        <a href="https://github.com/anrix05" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/30">
                            <FaGithub className="text-xl" />
                            <span>GitHub Profile</span>
                        </a>
                        {/* Phone number blocked for privacy in demo, can be added back */}
                        <div className="flex items-center gap-4 text-gray-300 p-4 bg-white/5 rounded-xl border border-white/5">
                            <FaPhone className="text-xl" />
                            <span>+91 8303870726</span>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
                >
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                            <input type="text" className="w-full bg-[#0b0b1e] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input type="email" className="w-full bg-[#0b0b1e] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea rows={4} className="w-full bg-[#0b0b1e] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" placeholder="What's on your mind?"></textarea>
                        </div>
                        <button type="button" className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                            Send Message
                        </button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
