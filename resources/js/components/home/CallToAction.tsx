import { Link } from "@inertiajs/react";

export default function CallToAction() {
    return (
        <section className="bg-zinc-950 text-white py-40 px-4 sm:px-6 relative overflow-hidden">
            {/* Soft Organic Gradients */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#FE5F55] opacity-30 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#9BF6FF] opacity-20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
            
            <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
                <h2 className="text-7xl sm:text-[8rem] font-black mb-8 tracking-tighter leading-[0.9]">Prêt pour le <br/><span className="italic font-light opacity-90">changement ?</span></h2>
                <p className="text-2xl font-medium text-gray-300 mb-14 max-w-2xl mx-auto">
                    Rejoignez l'écosystème juridique le plus abouti du Maroc. Deux minutes suffisent.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link href="/register" className="bg-[#B4F8C8] text-black border-4 border-[#B4F8C8] rounded-[2rem] px-12 py-6 font-black text-2xl hover:bg-white hover:border-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(180,248,200,0.5)]">
                        Commencer maintenant
                    </Link>
                </div>
            </div>
            
            {/* Seamless transition bleed element to footer */}
            <div className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-r from-[#FFADAD] via-[#FFD6A5] to-[#CAFFBF]"></div>
        </section>
    );
}
