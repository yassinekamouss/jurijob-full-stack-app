import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@/components/signup/FormularIcons';

import { UserFormData } from '@/types';

type CommonFieldsProps = {
    formData: UserFormData;
    onFieldChange: (field: keyof UserFormData, value: any) => void;
    errors: Partial<Record<keyof UserFormData, string>>;
    className?: string;
    isRecruiter?: boolean;
}

const FormCommunFields: React.FC<CommonFieldsProps> = ({
    formData,
    onFieldChange,
    errors = {},
    className = '',
    isRecruiter = false
}) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [localImgError, setLocalImgError] = useState<string | null>(null);
    const [localPhoneError, setLocalPhoneError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const getPasswordStrength = (password: string) => {
        if (!password) return { strength: 0, label: '', color: '', bg: 'bg-slate-200' };
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const levels = [
            { strength: 0, label: '', color: '', bg: 'bg-slate-200' },
            { strength: 1, label: t('auth.forms.common.strength.very_weak'), color: 'text-red-500', bg: 'bg-red-500' },
            { strength: 2, label: t('auth.forms.common.strength.weak'), color: 'text-orange-500', bg: 'bg-orange-400' },
            { strength: 3, label: t('auth.forms.common.strength.medium'), color: 'text-yellow-500', bg: 'bg-yellow-400' },
            { strength: 4, label: t('auth.forms.common.strength.strong'), color: 'text-green-500', bg: 'bg-green-500' },
            { strength: 5, label: t('auth.forms.common.strength.very_strong'), color: 'text-green-600', bg: 'bg-green-600' },
        ];
        return levels[strength];
    };

    const passwordStrength = getPasswordStrength(formData.password || '');

    const formatBytes = (bytes: number) => {
        if (!bytes) return '0 B';
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
    };

    const inputClasses = "w-full p-3 border border-slate-200 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all placeholder:text-slate-400";
    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('auth.forms.common.title')}</h3>
                <p className="text-sm text-slate-500">{t('auth.forms.common.subtitle')}</p>
            </div>

            {/* --- NOM / PRENOM --- */}
            {!isRecruiter && (
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className={labelClasses}>{t('auth.forms.common.firstname_label')}</label>
                        <input type="text" placeholder={t('auth.forms.common.firstname_placeholder')} value={formData.prenom || ''} onChange={(e) => onFieldChange('prenom', e.target.value)} className={inputClasses} />
                        {errors.prenom && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.prenom}</p>}
                    </div>
                    <div>
                        <label className={labelClasses}>{t('auth.forms.common.lastname_label')}</label>
                        <input type="text" placeholder={t('auth.forms.common.lastname_placeholder')} value={formData.nom || ''} onChange={(e) => onFieldChange('nom', e.target.value)} className={inputClasses} />
                        {errors.nom && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.nom}</p>}
                    </div>
                </div>
            )}

            {/* --- EMAIL --- */}
            <div>
                <label className={labelClasses}>{t('auth.forms.common.email_label')}</label>
                <input type="email" placeholder={t('auth.forms.common.email_placeholder')} value={formData.email || ''} onChange={(e) => onFieldChange('email', e.target.value)} className={inputClasses} />
                {errors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.email}</p>}
            </div>

            {/* --- TELEPHONE --- */}
            <div>
                <label className={labelClasses}>{t('auth.forms.common.phone_label')}</label>
                <input
                    type="tel"
                    placeholder={t('auth.forms.common.phone_placeholder')}
                    value={formData.telephone || ''}
                    onChange={(e) => {
                        const val = e.target.value;
                        onFieldChange('telephone', val);
                        if (val && !/^\+?[0-9]*$/.test(val)) {
                            setLocalPhoneError(t('auth.forms.common.phone_format_error'));
                        } else {
                            setLocalPhoneError(null);
                        }
                    }}
                    className={`${inputClasses} ${localPhoneError ? 'border-red-300 ring-red-50' : ''}`}
                />
                {(errors.telephone || localPhoneError) && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium">
                        {localPhoneError || errors.telephone}
                    </p>
                )}
            </div>

            {/* --- PASSWORD --- */}
            <div className="relative">
                <label className={labelClasses}>{t('auth.forms.common.password_label')}</label>
                <input type={showPassword ? 'text' : 'password'} placeholder={t('auth.forms.common.password_placeholder')} value={formData.password || ''} onChange={(e) => onFieldChange('password', e.target.value)} className={`${inputClasses} pr-10`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors">
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
                {formData.password && (
                    <div className="mt-2.5">
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                                <div className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.bg}`} style={{ width: `${(passwordStrength.strength / 5) * 100}%` }} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${passwordStrength.color}`}>{passwordStrength.label}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{t('auth.forms.common.password_requirements')}</p>
                    </div>
                )}
                {errors.password && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.password}</p>}
            </div>

            {/* --- CONFIRM PASSWORD --- */}
            <div className="relative">
                <label className={labelClasses}>{t('auth.forms.common.confirm_password_label')}</label>
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder={t('auth.forms.common.confirm_password_placeholder')} value={formData.password_confirmation || ''} onChange={(e) => onFieldChange('password_confirmation', e.target.value)} className={`${inputClasses} pr-10`} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors">
                    <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
                {formData.password_confirmation && formData.password_confirmation !== formData.password && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium">{t('auth.forms.common.password_mismatch')}</p>
                )}
                {errors.password_confirmation && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.password_confirmation}</p>}
            </div>
        </div>
    );
};

export default FormCommunFields;
