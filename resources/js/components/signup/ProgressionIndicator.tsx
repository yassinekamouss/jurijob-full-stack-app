import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@/components/signup/FormularIcons';

type ProgressIndicatorProps = {
    currentStep: number;
    steps: { id: number; label: string; icon: string }[];
}

const ProgressIndicator = ({ currentStep, steps }: ProgressIndicatorProps) => {
    const { t } = useTranslation();
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

    const currentStepObj = steps.find((s) => s.id === currentStep);

    return (
        <div className="mx-auto my-6 w-full max-w-2xl px-2 sm:my-12 sm:px-4">
            <div className="flex items-center justify-center">
                {steps.map((step, index) => {
                    const status = getStepStatus(step.id);
                    const isLast = index === totalSteps - 1;

                    return (
                        <React.Fragment key={step.id}>
                            <div className="relative flex flex-col items-center">
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-500 sm:h-12 sm:w-12 ${getStepClasses(status)}`}
                                >
                                    {status === 'completed' ? (
                                        <Icon name="Check" className="h-4 w-4 sm:h-5 sm:w-5" />
                                    ) : (
                                        <Icon name={step.icon as any} className="h-4 w-4 sm:h-5 sm:w-5" />
                                    )}
                                </div>
                                <div className="absolute top-14 hidden justify-center sm:flex sm:w-24">
                                    <span
                                        className={`text-center text-[9px] font-black uppercase tracking-widest transition-colors duration-500 sm:text-[10px] ${
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
                                <div className="mx-0.5 flex-1 sm:mx-3">
                                    <div className={`rounded-full transition-all duration-700 ${getConnectorClasses(step.id)}`} />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Mobile active step label */}
            {currentStepObj && (
                <div className="mt-3 text-center sm:hidden">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-900">
                        {currentStepObj.label}
                    </span>
                </div>
            )}

            {/* Progress bar and percentage */}
            <div className="mt-6 px-2 sm:mt-20 sm:px-8">
                <div className="mb-2 flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 sm:mb-3">
                    <span>{t('auth.forms.navigator.progress')}</span>
                    <span className="text-slate-900">{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-1.5 rounded-full bg-slate-900 transition-all duration-700 ease-out"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProgressIndicator;
