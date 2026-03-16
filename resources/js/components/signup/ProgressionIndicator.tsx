import React from 'react';
import Icon from '@/components/signup/FormularIcons';

interface ProgressIndicatorProps {
    currentStep: number;
    steps: { id: number; label: string; icon: string }[];
}

const ProgressIndicator = ({ currentStep, steps }: ProgressIndicatorProps) => {

    const totalSteps = steps.length;

    const getStepStatus = (stepId: number) => {
        if (stepId < currentStep) return 'completed';
        if (stepId === currentStep) return 'current';
        return 'upcoming';
    };

    const getStepClasses = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-slate-900 text-white border-slate-900';
            case 'current':
                return 'bg-white text-slate-900 border-slate-900 ring-4 ring-slate-50';
            case 'upcoming':
                return 'bg-white text-slate-300 border-slate-100';
            default:
                return 'bg-white text-slate-300 border-slate-100';
        }
    };

    const getConnectorClasses = (stepId: number) => {
        if (stepId < currentStep) return 'bg-slate-900 h-1';
        return 'bg-slate-100 h-1';
    };

    return (
        <div className="w-full max-w-2xl mx-auto my-12 px-4">
            <div className="flex items-center justify-center">
                {steps.map((step, index) => {
                    const status = getStepStatus(step.id);
                    const isLast = index === totalSteps - 1;

                    return (
                        <React.Fragment key={step.id}>
                            <div className="relative flex flex-col items-center">
                                <div
                                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-sm ${getStepClasses(status)}`}
                                >
                                    {status === 'completed' ? (
                                        <Icon name="Check" size={20} />
                                    ) : (
                                        <Icon name={step.icon as any} size={20} />
                                    )}
                                </div>
                                <div className="absolute top-14 w-32 flex justify-center">
                                    <span
                                        className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-500 text-center ${
                                            status === 'current'
                                                ? 'text-slate-900'
                                                : status === 'completed'
                                                  ? 'text-slate-700'
                                                  : 'text-slate-300'
                                        }`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                            </div>

                            {!isLast && (
                                <div className="flex-1 mx-4">
                                    <div className={`transition-all duration-700 rounded-full ${getConnectorClasses(step.id)}`} />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Progress bar and percentage */}
            <div className="mt-20 px-8">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                    <span>Avancement</span>
                    <span className="text-slate-900">{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                        className="bg-slate-900 h-1.5 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProgressIndicator;
