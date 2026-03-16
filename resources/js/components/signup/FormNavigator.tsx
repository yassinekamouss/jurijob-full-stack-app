import { useState, ReactNode } from 'react';
import ProgressIndicator from '@/components/signup/ProgressionIndicator';

interface NavigatorFormProps {
    children: (currentStep: number) => ReactNode;
    onNextStep: (currentStep: number) => Promise<boolean> | boolean;
}

export default function FormNavigator({ children, onNextStep }: NavigatorFormProps) {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = async () => {
        const canGoNext = await onNextStep(currentStep);
        if (!canGoNext) return;
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <ProgressIndicator currentStep={currentStep} />

            <div className="w-full">{children(currentStep)}</div>

            <div className="flex justify-between w-full mt-6">
                <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-5 py-2 rounded-lg transition-all text-sm font-medium ${
                        currentStep === 1
                            ? 'bg-muted text-muted-foreground cursor-not-allowed'
                            : 'bg-secondary text-secondary-foreground hover:opacity-90'
                    }`}
                >
                    Précédent
                </button>

                <button
                    type="button"
                    onClick={nextStep}
                    disabled={currentStep === 4}
                    className={`px-5 py-2 rounded-lg transition-all text-sm font-medium ${
                        currentStep === 4
                            ? 'bg-muted text-muted-foreground cursor-not-allowed'
                            : 'bg-primary text-primary-foreground hover:opacity-90'
                    }`}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
}
