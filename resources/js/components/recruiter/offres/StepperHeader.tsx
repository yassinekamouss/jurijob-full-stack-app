"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
    id: number;
    name: string;
    fullName: string;
}

interface Props {
    currentStep: number;
}

const steps: Step[] = [
    { id: 1, name: 'Informations', fullName: 'Informations de Base' },
    { id: 2, name: 'Critères', fullName: 'Critères de l\'Offre' },
    { id: 3, name: 'Récapitulatif', fullName: 'Récapitulatif Final' },
];

export default function CreativeStepper({ currentStep }: Props) {
    return (
        <nav aria-label="Progress" className="relative mx-auto w-full max-w-4xl px-8 py-12">
            <div className="relative flex items-center justify-between">

                {/* Background Track (La ligne grise en fond) */}
                <div className="absolute top-5 left-0 row-start-1 h-[2px] w-full bg-gray-100" />

                {/* Active Progress Line (La ligne qui se remplit) */}
                <motion.div
                    className="absolute top-5 left-0 h-[2px] bg-black origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: (currentStep - 1) / (steps.length - 1) }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    style={{ width: '100%' }}
                />

                {steps.map((step) => {
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;
                    const isUpcoming = currentStep < step.id;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center">
                            {/* Circle Indicator */}
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.2 : 1,
                                    backgroundColor: isCompleted || isActive ? "#000" : "#fff",
                                    borderColor: isCompleted || isActive ? "#000" : "#e5e7eb",
                                }}
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-500 shadow-sm",
                                    isActive && "ring-4 ring-black/10"
                                )}
                            >
                                <AnimatePresence mode="wait">
                                    {isCompleted ? (
                                        <motion.div
                                            key="check"
                                            initial={{ rotate: -45, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ scale: 0 }}
                                        >
                                            <Check className="h-5 w-5 text-white" strokeWidth={3} />
                                        </motion.div>
                                    ) : (
                                        <motion.span
                                            key="number"
                                            className={cn(
                                                "text-sm font-bold",
                                                isActive ? "text-white" : "text-gray-500"
                                            )}
                                        >
                                            {step.id}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Labels Container */}
                            <div className="absolute top-14 flex flex-col items-center whitespace-nowrap">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        y: isActive ? 0 : 4,
                                        opacity: isUpcoming ? 0.4 : 1,
                                    }}
                                    className="flex flex-col items-center"
                                >
                                    {/* Titre Principal */}
                                    <span className={cn(
                                        "text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300",
                                        isActive ? "text-black" : "text-gray-400"
                                    )}>
                                        {step.name}
                                    </span>

                                    {/* Sous-titre descriptif (uniquement si actif) */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.span
                                                initial={{ opacity: 0, height: 0, y: -5 }}
                                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                                exit={{ opacity: 0, height: 0, y: -5 }}
                                                className="text-[10px] font-medium text-gray-500 mt-1"
                                            >
                                                {step.fullName}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {/* Indicateur de position (Barre sous le texte) */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="mt-2 h-1 w-1 rounded-full bg-black"
                                            transition={{ type: "spring", bounce: 0.3 }}
                                        />
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}