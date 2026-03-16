import React from 'react';
import Icon from '@/components/signup/FormularIcons';

interface ProgressIndicatorProps {
    currentStep: number;
}

const ProgressIndicator = ({ currentStep }: ProgressIndicatorProps) => {
    const steps = [
        { id: 1, label: 'Informations', icon: 'FileText' },
        { id: 2, label: 'Profil', icon: 'Settings' },
        { id: 3, label: 'Détails', icon: 'GraduationCap' },
        { id: 4, label: 'Confirmation', icon: 'ClipboardCheck' },
    ];

    const totalSteps = steps.length;

    const getStepStatus = (stepId: number) => {
        if (stepId < currentStep) return 'completed';
        if (stepId === currentStep) return 'current';
        return 'upcoming';
    };

    const getStepClasses = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500 text-white border-green-500';
            case 'current':
                return 'bg-primary text-primary-foreground border-primary';
            case 'upcoming':
                return 'bg-muted text-muted-foreground border-border';
            default:
                return 'bg-muted text-muted-foreground border-border';
        }
    };

    const getConnectorClasses = (stepId: number) => {
        if (stepId < currentStep) return 'bg-black h-1';
        return 'bg-gray-200 h-1';
    };

    return (
        <div className="w-full max-w-2xl mx-auto my-8 px-4">
            <div className="flex items-center justify-center">
                {steps.map((step, index) => {
                    const status = getStepStatus(step.id);
                    const isLast = index === totalSteps - 1;

                    return (
                        <div key={step.id} className="flex items-center flex-1">
                            <div className="flex flex-col items-center justify-center">
                                <div
                                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getStepClasses(status)}`}
                                >
                                    {status === 'completed' ? (
                                        <Icon name="Check" size={22} />
                                    ) : (
                                        <Icon name={step.icon as any} size={22} />
                                    )}
                                </div>
                                <span
                                    className={`text-xs font-medium mt-2 text-center transition-colors duration-300 ${
                                        status === 'current'
                                            ? 'text-primary'
                                            : status === 'completed'
                                              ? 'text-green-600'
                                              : 'text-muted-foreground'
                                    }`}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {!isLast && (
                                <div className="flex-1 mx-3 mb-5">
                                    <div className={`transition-all duration-300 rounded-full ${getConnectorClasses(step.id)}`} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progression</span>
                    <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProgressIndicator;
