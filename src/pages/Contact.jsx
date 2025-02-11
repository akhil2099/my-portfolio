import React, { useState } from 'react';
import { Send, Sparkles, Mail } from 'lucide-react';
import { useDocTitle } from '../components/CustomHook.jsx';

const Background = () => (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
      <div className="absolute inset-0 opacity-60">
        <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] top-1/3 left-1/3 animate-pulse" />
        <div
          className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] bottom-1/3 right-1/3 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>
    </div>
);

const Contact = () => {
    useDocTitle('itsmeakhil - contacts');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 2 - 1;
        const y = ((e.clientY - top) / height) * 2 - 1;

        window.requestAnimationFrame(() => {
            setMousePosition({ x: x * 10, y: y * 10 });
        });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const mailToUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=akhilvimal7@gmail.com&su=New Inquiry&body=From: ${email}`;
        window.open(mailToUrl, '_blank');
        setTimeout(() => setIsSubmitting(false), 2000);
    };

    const cardStyle = {
        transform: `perspective(600px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
        boxShadow: `${mousePosition.x * 2}px ${mousePosition.y * 2}px 20px rgba(0, 0, 0, 0.15)`,
        transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
    };

    return (
        <>
        <div className="min-h-screen h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 flex flex-col justify-center items-center p-6 relative overflow-hidden">
            {/* Include NavBar */}
            <Background />

            <div
                className="w-full max-w-lg bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-200 ease-out"
                style={cardStyle}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="relative p-10">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-gray-600 text-6xl font-extralight opacity-10">Contact Us</span>
                    </div>
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-700 text-center mb-8 flex items-center justify-center">
                        <Sparkles className="mr-2" /> Get In Touch
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-700 to-blue-700 rounded-lg blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-300"></div>
                            <div className="relative">
                                <Mail className="absolute top-3 left-3 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-3 bg-gray-700 border border-transparent rounded-lg text-white placeholder-gray-400 
                                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                               transition-all duration-300 ease-in-out
                                               group-hover:shadow-xl group-hover:shadow-blue-800/50
                                               group-hover:scale-105 transform group-hover:translate-y-[-5px] group-hover:translate-x-[5px]"
                                    required
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`w-full flex justify-center items-center py-3 px-5 text-sm font-medium text-white 
                                       rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                       hover:shadow-2xl hover:shadow-blue-600/50 hover:translate-y-[-5px]
                                       ${isSubmitting ? 'bg-blue-500' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 hover: to-blue-800'}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    Send Message <Send className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default Contact;
