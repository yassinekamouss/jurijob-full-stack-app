import { useState, ReactNode } from 'react';
import ProgressIndicator from '@/components/signup/ProgressionIndicator';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigatorFormProps {
    children: (currentStep: number) => ReactNode;
    onNextStep: (currentStep: number) => Promise<boolean> | boolean;
    steps: { id: number; label: string; icon: string }[];
}

export default function FormNavigator({ children, onNextStep, steps }: NavigatorFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isNavigating, setIsNavigating] = useState(false);

    const totalSteps = steps.length;

    const nextStep = async () => {
        setIsNavigating(true);
        try {
            const canGoNext = await onNextStep(currentStep);
            if (!canGoNext) return;
            if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
        } finally {
            setIsNavigating(false);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <ProgressIndicator currentStep={currentStep} steps={steps} />

            <div className="w-full mt-4">{children(currentStep)}</div>

            <div className="flex items-center justify-between w-full mt-10 pt-8 border-t border-slate-50">
                <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1 || isNavigating}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all text-xs font-bold uppercase tracking-widest ${
                        currentStep === 1
                            ? 'text-slate-200 cursor-not-allowed'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                    <ChevronLeft size={16} /> Précédent
                </button>

                {currentStep < totalSteps && (
                    <button
                        type="button"
                        onClick={nextStep}
                        disabled={isNavigating}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isNavigating ? 'Validation...' : <>Suivant <ChevronRight size={16} /></>}
                    </button>
                )}
            </div>
        </div>
    );
}
