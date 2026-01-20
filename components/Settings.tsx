import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Briefcase, 
  Building2, 
  Camera, 
  Lock, 
  Save, 
  ShieldCheck,
  Circle
} from 'lucide-react';
import { UserData } from '../App';

interface SettingsProps {
  user: UserData;
  onUpdateUser: (data: UserData) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
  const [localUser, setLocalUser] = useState<UserData>(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLocalUser(prev => ({ ...prev, photo: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setLocalUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    onUpdateUser(localUser);
    alert('Configurações salvas com sucesso e sincronizadas com o sistema!');
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-500">
      {/* Input de arquivo invisível */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/png, image/jpeg, image/webp" 
        className="hidden" 
      />

      {/* Page Header - Resized for mobile */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-[32px] font-bold text-white tracking-tighter leading-tight">
            Meu Perfil
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-1 font-medium">
            Gerencie suas informações pessoais e credenciais de acesso.
          </p>
        </div>

        <div className="flex items-center gap-2.5 px-4 py-2 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-full shadow-[0_0_15px_rgba(124,58,237,0.1)] w-fit">
          <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <div className="absolute w-2 h-2 bg-emerald-500 rounded-full blur-[4px] opacity-70" />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Conta Ativa</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {/* Personal Info Card - Adjusted padding for mobile */}
        <div className="col-span-12 lg:col-span-8 bg-[#0F0F12] border border-[#1E1E22] rounded-3xl md:rounded-[32px] p-5 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/5 blur-[100px] pointer-events-none" />

          {/* Profile Header section - Scaled down for mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="relative group cursor-pointer" onClick={handleImageClick}>
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-[#7C3AED] p-1 shadow-[0_0_20px_rgba(124,58,237,0.2)] bg-black overflow-hidden flex items-center justify-center">
                {localUser.photo ? (
                  <img 
                    src={localUser.photo} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="text-gray-800">
                    <User className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-[#7C3AED] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-4 border-[#0F0F12] shadow-lg group-hover:scale-110 transition-transform">
                <Camera className="w-3 h-3 md:w-[14px] md:h-[14px] text-white" />
              </div>
            </div>

            <div className="text-center sm:text-left space-y-2 md:space-y-3">
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-white tracking-tight">{localUser.name || "Nome não definido"}</h3>
                <p className="text-[#94A3B8] text-xs md:text-base font-medium">{localUser.role || "Cargo"} {localUser.company ? `at ${localUser.company}` : ""}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-3">
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-lg text-[8px] md:text-[10px] font-black text-[#7C3AED] uppercase tracking-wider">Plano Pro</span>
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-[#1E1E22] border border-[#2D2D33] rounded-lg text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-wider">Member Since 2025</span>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 border-b border-[#1E1E22] pb-3 md:pb-4">
              <User size={16} className="text-[#7C3AED]" />
              <h4 className="text-xs md:text-sm font-bold text-white uppercase tracking-widest">Informações Pessoais</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <User size={10} />
                  Nome Completo
                </label>
                <input 
                  type="text" 
                  value={localUser.name}
                  placeholder="Seu nome completo"
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-4 py-3 md:px-5 md:py-3.5 text-xs md:text-sm text-white placeholder-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={10} />
                  Email Corporativo
                </label>
                <input 
                  type="email" 
                  value={localUser.email}
                  placeholder="exemplo@email.com"
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-4 py-3 md:px-5 md:py-3.5 text-xs md:text-sm text-white placeholder-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Building2 size={10} />
                  Empresa
                </label>
                <input 
                  type="text" 
                  value={localUser.company}
                  placeholder="Nome da sua empresa"
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-4 py-3 md:px-5 md:py-3.5 text-xs md:text-sm text-white placeholder-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Briefcase size={10} />
                  Cargo
                </label>
                <input 
                  type="text" 
                  value={localUser.role}
                  placeholder="Seu cargo operacional"
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-4 py-3 md:px-5 md:py-3.5 text-xs md:text-sm text-white placeholder-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSaveChanges}
                className="w-full md:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white px-6 py-3 md:px-8 md:py-3.5 rounded-xl text-xs md:text-sm font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Save size={16} />
                <span>Salvar Alterações</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="col-span-12 lg:col-span-4 bg-[#0F0F12] border border-[#1E1E22] rounded-3xl md:rounded-[32px] p-5 md:p-10 shadow-2xl h-fit">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/10">
                <Lock size={18} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white tracking-tight">Segurança</h4>
            </div>

            <p className="text-xs md:text-sm text-[#94A3B8] leading-relaxed font-medium">
              Escolha uma senha forte com no mínimo 8 caracteres.
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Senha Atual</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-4 py-2.5 md:px-5 md:py-3.5 text-xs md:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Nova Senha</label>
                <input 
                  type="password" 
                  placeholder="Nova senha segura"
                  className="w-full bg-[#050505] border border-[#1E1E22] rounded-xl px-4 py-2.5 md:px-5 md:py-3.5 text-xs md:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>
            </div>

            <button className="w-full py-2.5 md:py-3.5 rounded-xl border border-[#2D2D33] text-xs md:text-sm text-white font-bold hover:bg-white/5 transition-all active:scale-[0.98]">
              Atualizar Senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;