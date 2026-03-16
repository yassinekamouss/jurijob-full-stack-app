import Reveal from "@/components/home/Reveal";

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 md:py-32 bg-white text-black antialiased overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Section */}
                <div className="text-center mb-20 md:mb-32">
                    <Reveal direction="up">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Comment ça marche
                        </h2>
                    </Reveal>
                    <Reveal direction="up" delay={0.1}>
                        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Une approche simplifiée et performante pour connecter les meilleurs talents aux entreprises en pleine croissance.
                        </p>
                    </Reveal>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    
                    {/* Desktop Dotted Line (Hidden on Mobile) */}
                    <div className="hidden md:block absolute top-[35%] left-[15%] right-[15%] h-[40px] z-0 pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
                            <path 
                                d="M0,50 Q500,80 1000,50" 
                                stroke="#E5E7EB" 
                                strokeWidth="2" 
                                strokeDasharray="6 6" 
                            />
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative z-10">
                        
                        {/* Step 1: Create Profile */}
                        <div className="flex flex-col items-center text-center">
                            <Reveal direction="up" delay={0.2} className="mb-10 flex items-center justify-center h-56 w-full">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-44 w-60">
                                    <div className="flex-grow p-5 space-y-3">
                                        <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
                                        <div className="h-2 w-32 bg-gray-100 rounded-full"></div>
                                        <div className="h-2 w-20 bg-gray-100 rounded-full"></div>
                                    </div>
                                    <div className="bg-black h-1/3 flex items-center px-5">
                                        <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal direction="up" delay={0.3} className="max-w-xs">
                                <h3 className="text-2xl font-bold mb-4">Créez votre profil</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Remplissez vos informations clés et mettez en avant vos compétences techniques et académiques en quelques minutes.
                                </p>
                            </Reveal>
                        </div>

                        {/* Step 2: Algorithm Match */}
                        <div className="flex flex-col items-center text-center">
                            <Reveal direction="up" delay={0.4} className="mb-10 flex items-center justify-center h-56 w-full">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm relative h-44 w-60 flex items-end justify-around pb-6 px-10">
                                    <div className="w-3 bg-black rounded-t-sm h-[40%]"></div>
                                    <div className="w-3 bg-black rounded-t-sm h-[70%]"></div>
                                    <div className="w-3 bg-black rounded-t-sm h-[55%]"></div>
                                    <div className="w-3 bg-black rounded-t-sm h-[85%]"></div>
                                    
                                    {/* Check Badge */}
                                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal direction="up" delay={0.5} className="max-w-xs">
                                <h3 className="text-2xl font-bold mb-4">Algorithme de Match</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Notre technologie analyse vos données pour vous proposer les opportunités les plus pertinentes selon votre potentiel.
                                </p>
                            </Reveal>
                        </div>

                        {/* Step 3: Career Boost */}
                        <div className="flex flex-col items-center text-center">
                            <Reveal direction="up" delay={0.6} className="mb-10 flex items-center justify-center h-56 w-full">
                                <div className="relative">
                                    <div className="bg-black rounded-[2rem] h-44 w-60 flex flex-col justify-center items-end pr-8 shadow-xl">
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Revenus</span>
                                        <span className="text-white text-2xl font-light">5 600</span>
                                    </div>
                                    {/* Floating Button */}
                                    <button className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white text-black px-6 py-2 rounded-full shadow-2xl font-semibold text-xs border border-gray-50 hover:scale-105 transition-transform duration-300">
                                        Ajouter
                                    </button>
                                </div>
                            </Reveal>
                            <Reveal direction="up" delay={0.7} className="max-w-xs">
                                <h3 className="text-2xl font-bold mb-4">Boostez votre carrière</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Accédez à des offres exclusives et commencez votre parcours professionnel dans les meilleures conditions.
                                </p>
                            </Reveal>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}