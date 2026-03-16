import React, { useRef, useState } from 'react';
import Icon from '@/components/signup/FormularIcons';

export interface UserFormData {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    imageFile: File | null;
    password: string;
    confirmPassword: string;
}

interface CommonFieldsProps {
    formData: UserFormData;
    onFieldChange: (field: keyof UserFormData, value: any) => void;
    errors: Partial<Record<keyof UserFormData, string>>;
    className?: string;
}

const FormCommunFields: React.FC<CommonFieldsProps> = ({ formData, onFieldChange, errors = {}, className = '' }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [localImgError, setLocalImgError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const getPasswordStrength = (password: string) => {
        if (!password) return { strength: 0, label: '', color: '', bg: 'bg-gray-300' };
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const levels = [
            { strength: 0, label: '', color: '', bg: 'bg-gray-300' },
            { strength: 1, label: 'Très faible', color: 'text-red-600', bg: 'bg-red-500' },
            { strength: 2, label: 'Faible', color: 'text-orange-500', bg: 'bg-orange-400' },
            { strength: 3, label: 'Moyen', color: 'text-yellow-500', bg: 'bg-yellow-400' },
            { strength: 4, label: 'Fort', color: 'text-green-600', bg: 'bg-green-500' },
            { strength: 5, label: 'Très fort', color: 'text-green-700', bg: 'bg-green-600' },
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
            onFieldChange('imageFile', null);
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
        onFieldChange('imageFile', file);
    };

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Informations personnelles</h3>
                <p className="text-sm text-muted-foreground">Renseignez vos informations de base pour créer votre compte</p>
            </div>

            {/* --- PROFILE IMAGE --- */}
            <div className="flex flex-col">
                <label className="block text-sm font-medium mb-2">Photo de profil</label>
                <div
                    onDrop={(e) => { e.preventDefault(); setDragActive(false); validateAndSetImage(e.dataTransfer.files?.[0]); }}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                    className={`relative w-full rounded-xl border-2 transition-all ${dragActive ? 'border-primary bg-primary/5' : 'border-dashed border-border bg-card'}`}
                >
                    <div className="flex items-center gap-4 p-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center flex-shrink-0">
                            {formData.imageFile ? (
                                <img src={URL.createObjectURL(formData.imageFile)} alt="Aperçu" className="h-full w-full object-cover" />
                            ) : (
                                <Icon name="UserRound" size={28} className="text-muted-foreground" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Glissez-déposez une image ici</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, WebP – max 3MB</p>
                            {formData.imageFile && (
                                <p className="mt-1 text-xs text-muted-foreground truncate">
                                    {formData.imageFile.name} · {formatBytes(formData.imageFile.size)}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm hover:opacity-90 transition">
                                <Icon name="Camera" size={16} /> Choisir
                            </button>
                            {formData.imageFile && (
                                <button type="button" onClick={() => validateAndSetImage(null)} className="inline-flex items-center gap-2 rounded-lg bg-muted text-foreground px-3 py-2 text-sm hover:opacity-90 transition">
                                    <Icon name="Trash2" size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                    <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => validateAndSetImage(e.target.files?.[0])} className="hidden" />
                </div>
                {(errors.imageFile || localImgError) && <p className="text-xs text-red-500 mt-2">{localImgError || errors.imageFile}</p>}
            </div>

            {/* --- NOM / PRENOM --- */}
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium mb-1">Prénom *</label>
                    <input type="text" placeholder="Votre prénom" value={formData.prenom || ''} onChange={(e) => onFieldChange('prenom', e.target.value)} className="w-full p-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:outline-none" />
                    {errors.prenom && <p className="text-xs text-red-500 mt-1">{errors.prenom}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Nom *</label>
                    <input type="text" placeholder="Votre nom" value={formData.nom || ''} onChange={(e) => onFieldChange('nom', e.target.value)} className="w-full p-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:outline-none" />
                    {errors.nom && <p className="text-xs text-red-500 mt-1">{errors.nom}</p>}
                </div>
            </div>

            {/* --- EMAIL --- */}
            <div>
                <label className="block text-sm font-medium mb-1">Adresse e-mail *</label>
                <input type="email" placeholder="votre.email@exemple.com" value={formData.email || ''} onChange={(e) => onFieldChange('email', e.target.value)} className="w-full p-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:outline-none" />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* --- TELEPHONE --- */}
            <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input type="tel" placeholder="+212 6 00 00 00 00" value={formData.telephone || ''} onChange={(e) => onFieldChange('telephone', e.target.value)} className="w-full p-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:outline-none" />
                {errors.telephone && <p className="text-xs text-red-500 mt-1">{errors.telephone}</p>}
            </div>

            {/* --- PASSWORD --- */}
            <div className="relative">
                <label className="block text-sm font-medium mb-1">Mot de passe *</label>
                <input type={showPassword ? 'text' : 'password'} placeholder="Créez un mot de passe sécurisé" value={formData.password || ''} onChange={(e) => onFieldChange('password', e.target.value)} className="w-full p-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:outline-none pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-muted-foreground hover:text-foreground">
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
                {formData.password && (
                    <div className="mt-2">
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                <div className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.bg}`} style={{ width: `${(passwordStrength.strength / 5) * 100}%` }} />
                            </div>
                            <span className={`text-xs font-medium ${passwordStrength.color}`}>{passwordStrength.label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">8+ caractères, majuscule, minuscule, chiffre et symbole</p>
                    </div>
                )}
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* --- CONFIRM PASSWORD --- */}
            <div className="relative">
                <label className="block text-sm font-medium mb-1">Confirmer le mot de passe *</label>
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirmez votre mot de passe" value={formData.confirmPassword || ''} onChange={(e) => onFieldChange('confirmPassword', e.target.value)} className="w-full p-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:outline-none pr-10" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 text-muted-foreground hover:text-foreground">
                    <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
                {formData.confirmPassword && formData.confirmPassword !== formData.password && (
                    <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
                )}
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>
        </div>
    );
};

export default FormCommunFields;
