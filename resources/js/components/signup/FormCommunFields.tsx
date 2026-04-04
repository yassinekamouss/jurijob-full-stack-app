import React, { useRef, useState } from 'react';
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
            { strength: 1, label: 'Très faible', color: 'text-red-500', bg: 'bg-red-500' },
            { strength: 2, label: 'Faible', color: 'text-orange-500', bg: 'bg-orange-400' },
            { strength: 3, label: 'Moyen', color: 'text-yellow-500', bg: 'bg-yellow-400' },
            { strength: 4, label: 'Fort', color: 'text-green-500', bg: 'bg-green-500' },
            { strength: 5, label: 'Très fort', color: 'text-green-600', bg: 'bg-green-600' },
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

    const validateAndSetImage = (file: File | undefined | null) => {
        if (!file) {
            onFieldChange('image_file', null);
            setLocalImgError(null);
            return;
        }
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        const maxBytes = 3 * 1024 * 1024;
        if (!allowed.includes(file.type)) {
            setLocalImgError('Formats acceptés: JPG, PNG, WebP');
            return;
        }
        if (file.size > maxBytes) {
            setLocalImgError('La taille maximale est 3 MB');
            return;
        }
        setLocalImgError(null);
        onFieldChange('image_file', file);
    };

    const inputClasses = "w-full p-3 border border-slate-200 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all placeholder:text-slate-400";
    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Informations personnelles</h3>
                <p className="text-sm text-slate-500">Renseignez vos informations de base pour créer votre compte</p>
            </div>

            {/* --- PROFILE IMAGE --- */}
            {!isRecruiter && (
                <div className="flex flex-col">
                    <label className={labelClasses}>Photo de profil</label>
                    <div
                        onDrop={(e) => { e.preventDefault(); setDragActive(false); validateAndSetImage(e.dataTransfer.files?.[0]); }}
                        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                        className={`relative w-full rounded-xl border-2 transition-all ${dragActive ? 'border-slate-900 bg-slate-50' : 'border-dashed border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                        <div className="flex items-center gap-4 p-4">
                            <div className="h-16 w-16 rounded-full overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center flex-shrink-0">
                                {formData.image_file ? (
                                    <img src={URL.createObjectURL(formData.image_file)} alt="Aperçu" className="h-full w-full object-cover" />
                                ) : (
                                    <Icon name="UserRound" size={28} className="text-slate-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-900">Glissez-déposez une image ici</p>
                                <p className="text-xs text-slate-500">PNG, JPG, WebP – max 3MB</p>
                                {formData.image_file && (
                                    <p className="mt-1 text-xs text-slate-600 font-medium truncate">
                                        {formData.image_file.name} · {formatBytes(formData.image_file.size)}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-3 py-2 text-sm font-medium hover:bg-slate-800 transition">
                                    <Icon name="Camera" size={16} /> Choisir
                                </button>
                                {formData.image_file && (
                                    <button type="button" onClick={() => validateAndSetImage(null)} className="inline-flex items-center gap-2 rounded-lg bg-slate-100 text-slate-700 px-3 py-2 text-sm font-medium hover:bg-slate-200 transition">
                                        <Icon name="Trash2" size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => validateAndSetImage(e.target.files?.[0])} className="hidden" />
                    </div>
                    {(errors.image_file || localImgError) && <p className="text-xs text-red-500 mt-2 font-medium">{localImgError || errors.image_file}</p>}
                </div>
            )}

            {/* --- NOM / PRENOM --- */}
            {!isRecruiter && (
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Prénom *</label>
                        <input type="text" placeholder="Votre prénom" value={formData.prenom || ''} onChange={(e) => onFieldChange('prenom', e.target.value)} className={inputClasses} />
                        {errors.prenom && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.prenom}</p>}
                    </div>
                    <div>
                        <label className={labelClasses}>Nom *</label>
                        <input type="text" placeholder="Votre nom" value={formData.nom || ''} onChange={(e) => onFieldChange('nom', e.target.value)} className={inputClasses} />
                        {errors.nom && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.nom}</p>}
                    </div>
                </div>
            )}

            {/* --- EMAIL --- */}
            <div>
                <label className={labelClasses}>Adresse e-mail *</label>
                <input type="email" placeholder="votre.email@exemple.com" value={formData.email || ''} onChange={(e) => onFieldChange('email', e.target.value)} className={inputClasses} />
                {errors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.email}</p>}
            </div>

            {/* --- TELEPHONE --- */}
            <div>
                <label className={labelClasses}>Téléphone</label>
                <input 
                    type="tel" 
                    placeholder="+212600000000" 
                    value={formData.telephone || ''} 
                    onChange={(e) => {
                        const val = e.target.value;
                        onFieldChange('telephone', val);
                        if (val && !/^\+?[0-9]*$/.test(val)) {
                            setLocalPhoneError('Format: + et chiffres uniquement');
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
                <label className={labelClasses}>Mot de passe *</label>
                <input type={showPassword ? 'text' : 'password'} placeholder="Créez un mot de passe sécurisé" value={formData.password || ''} onChange={(e) => onFieldChange('password', e.target.value)} className={`${inputClasses} pr-10`} />
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
                        <p className="text-[11px] text-slate-400 mt-1">8+ caractères, majuscule, minuscule, chiffre et symbole</p>
                    </div>
                )}
                {errors.password && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.password}</p>}
            </div>

            {/* --- CONFIRM PASSWORD --- */}
            <div className="relative">
                <label className={labelClasses}>Confirmer le mot de passe *</label>
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirmez votre mot de passe" value={formData.password_confirmation || ''} onChange={(e) => onFieldChange('password_confirmation', e.target.value)} className={`${inputClasses} pr-10`} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors">
                    <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
                {formData.password_confirmation && formData.password_confirmation !== formData.password && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium">Les mots de passe ne correspondent pas</p>
                )}
                {errors.password_confirmation && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.password_confirmation}</p>}
            </div>
        </div>
    );
};

export default FormCommunFields;
