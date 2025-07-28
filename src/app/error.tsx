"use client"
import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"

export default function ErrorPage() {
    const [isVisible, setIsVisible] = useState(false)
    const [glitchActive, setGlitchActive] = useState(false)

    useEffect(() => {
        setIsVisible(true)

        // Trigger glitch effect periodically
        const glitchInterval = setInterval(() => {
            setGlitchActive(true)
            setTimeout(() => setGlitchActive(false), 200)
        }, 3000)

        return () => clearInterval(glitchInterval)
    }, [])



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/30 rounded-full blur-2xl animate-ping"></div>
            </div>

            <div className={`relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Error Icon with Animation */}
                <div className="relative mb-8">
                    <div className="mx-auto w-32 h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/25">
                        <AlertTriangle
                            size={64}
                            className={`text-white transition-transform duration-200 ${glitchActive ? 'scale-110 rotate-3' : 'scale-100'}`}
                        />
                    </div>
                    {/* Glowing ring */}
                    <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-red-400/30 rounded-full animate-spin-slow"></div>
                </div>

                {/* Error Code */}
                <div className="mb-6">
                    <span className={`text-6xl md:text-8xl font-black bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent transition-all duration-200 ${glitchActive ? 'blur-sm' : 'blur-none'}`}>
                        ERROR
                    </span>
                </div>

                {/* Main heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    Oops! Something went{' '}
                    <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                        wrong
                    </span>
                </h1>

                {/* Description */}
                <p>
                    Don&apos;t worry, it&apos;s not you, it&apos;s us. Our team has been notified and we&apos;re working on it.
                </p>



                {/* Error ID */}
                <div className="mt-12 text-slate-500 text-sm">
                    Error ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
                }
                
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    )
}