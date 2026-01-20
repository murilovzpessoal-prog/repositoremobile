import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Cpu, Zap, ShieldCheck } from 'lucide-react';
import { supabase } from '../src/lib/supabase';

interface LoginPageProps {
    onLogin: (email: string, remember: boolean) => void;
}

interface LoginFormProps {
    onSubmit: (email: string, password: string, remember: boolean) => void;
}

interface VideoBackgroundProps {
    videoUrl: string;
}

interface FormInputProps {
    icon: React.ReactNode;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

interface ToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
    id: string;
}

// FormInput Component - Refined and Thin
const FormInput: React.FC<FormInputProps> = ({ icon, type, placeholder, value, onChange, required }) => {
    return (
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-blue-400 transition-colors duration-500">
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/[0.01] border border-white/5 rounded-2xl text-white placeholder-white/10 focus:outline-none focus:border-blue-500/20 focus:ring-1 focus:ring-blue-500/5 transition-all font-light tracking-wide text-sm"
            />
        </div>
    );
};

// ToggleSwitch Component - Elegant version
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, id }) => {
    return (
        <div
            onClick={onChange}
            className="relative inline-flex h-4 w-9 md:h-5 md:w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-500 ease-in-out bg-white/5 border border-white/5"
            style={{ backgroundColor: checked ? '#7c3aed' : undefined }}
        >
            <span
                className={`inline-block h-3 w-3 md:h-3.5 md:w-3.5 transform rounded-full bg-white transition-transform duration-500 ease-in-out ${checked ? 'translate-x-5 md:translate-x-5.5' : 'translate-x-0.5'
                    }`}
            />
        </div>
    );
};

// VideoBackground Component - Optimized for Max Clarity and UHD Quality
const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl }) => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-purple-900/5 z-10" />
            <div className="absolute inset-0 bg-black/5 z-10" />

            <video
                key={videoUrl}
                className="absolute inset-0 min-w-full min-h-full object-cover scale-[1.01] opacity-95 transition-opacity duration-1000"
                style={{ objectPosition: 'center' }}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full z-15 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-pink-600/5 blur-[120px] rounded-full z-15 pointer-events-none" />
        </div>
    );
};

// Main LoginForm Component
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert(error.message);
                setIsSubmitting(false);
                return;
            }

            setIsSuccess(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            onSubmit(email, password, remember);
        } catch (error: any) {
            alert(error.message || 'Ocorreu um erro ao autenticar.');
        } finally {
            setIsSubmitting(false);
            setIsSuccess(false);
        }
    };

    return (
        <div className="p-5 md:p-16 rounded-[32px] md:rounded-[48px] backdrop-blur-[40px] bg-black/30 border border-white/[0.05] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="mb-5 md:mb-14 text-center relative z-20">
                <h2 className="text-2xl md:text-4xl font-light mb-3 md:mb-5 relative group inline-block tracking-[0.15em] font-['Syne'] uppercase">
                    <span className="absolute -inset-10 bg-gradient-to-r from-purple-600/10 via-blue-500/10 to-pink-600/10 blur-[80px] opacity-40 group-hover:opacity-100 transition-all duration-1000"></span>
                    <span className="relative inline-block text-white antialiased">
                        Nexbuild <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">IA</span>
                    </span>
                </h2>

                <p className="text-[10px] md:text-xs font-light tracking-[0.05em] leading-relaxed italic text-white/30 max-w-[240px] md:max-w-[280px] mx-auto">
                    Um novo padrão de construção, onde tudo se conecta.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 relative z-20">
                <div className="space-y-1.5">
                    <label className="text-[8px] md:text-[9px] font-medium text-white/20 uppercase tracking-[0.4em] ml-1">Identidade Operacional</label>
                    <FormInput
                        icon={<Mail size={14} />}
                        type="email"
                        placeholder="nome@nexbuild.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[8px] md:text-[9px] font-medium text-white/20 uppercase tracking-[0.4em] ml-1">Protocolo de Segurança</label>
                    <div className="relative">
                        <FormInput
                            icon={<Lock size={14} />}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10 hover:text-white transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between py-1 px-1">
                    <div className="flex items-center space-x-3">
                        <ToggleSwitch
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            id="remember-me"
                        />
                        <label
                            htmlFor="remember-me"
                            className="text-[8px] md:text-[9px] text-white/25 cursor-pointer hover:text-white transition-colors uppercase font-medium tracking-[0.2em]"
                        >
                            Manter Sessão
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 md:py-5 rounded-2xl ${isSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-black hover:bg-gradient-to-r hover:from-purple-600 hover:via-blue-600 hover:to-pink-600 hover:text-white'
                        } font-bold uppercase tracking-[0.4em] text-[9px] md:text-[10px] transition-all duration-700 ease-in-out transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 shadow-2xl relative overflow-hidden`}
                >
                    <span className="relative z-10">{isSubmitting ? 'Sincronizando...' : 'Autenticar Acesso'}</span>
                    {!isSubmitting && !isSuccess && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    )}
                </button>
            </form>

            <div className="mt-8 md:mt-14 pt-6 md:pt-8 border-t border-white/[0.03] flex flex-col items-center relative z-20">
                <div className="flex gap-6 md:gap-8 mb-4 md:mb-6 opacity-10">
                    <Cpu size={12} className="text-blue-400" />
                    <Zap size={12} className="text-purple-400" />
                    <ShieldCheck size={12} className="text-pink-400" />
                </div>
                <p className="text-center text-[9px] md:text-[10px] text-white/15 italic font-light tracking-wide">
                    Problemas na autenticação?{' '}
                    <a href="https://www.contate.me/nexbuild" target="_blank" rel="noopener noreferrer" className="font-medium text-white/30 hover:text-blue-400 transition-colors uppercase text-[8px] md:text-[9px] tracking-widest ml-1">
                        Suporte Direto
                    </a>
                </p>
            </div>
        </div>
    );
};

// Main LoginPage Component
const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const handleFormSubmit = (email: string, password: string, remember: boolean) => {
        onLogin(email, remember);
    };

    // Link direto UHD/4K Cloudinary para qualidade máxima
    const directVideoUrl = "https://res.cloudinary.com/dbd4llbo5/video/upload/v1768679846/2759477-uhd_3840_2160_30fps_1_kxbf8p.mp4";

    return (
        <div className="fixed inset-0 z-[1000] bg-[#020205] flex items-center justify-center p-4 overflow-hidden font-['Inter'] selection:bg-purple-500/30">
            <VideoBackground videoUrl={directVideoUrl} />

            <div className="relative z-20 w-full max-w-[340px] md:max-w-lg animate-in fade-in zoom-in-95 duration-1000">
                <LoginForm onSubmit={handleFormSubmit} />
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-10 pointer-events-none text-center w-full px-4">
                <span className="text-[7px] md:text-[10px] text-white uppercase tracking-[0.4em] md:tracking-[1em] font-light italic font-mono">Nexbuild_Elite_Architecture // 2025</span>
            </div>
        </div>
    );
};

export default LoginPage;