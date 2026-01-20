import React from 'react';
import { Menu } from 'lucide-react';

interface MobileMenuButtonProps {
  onOpenMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onOpenMenu }) => (
  <div className="md:hidden flex mb-6">
    <button 
      onClick={onOpenMenu} 
      className="p-3 bg-[#0F0F12] rounded-xl border border-white/10 text-white"
    >
      <Menu size={24} />
    </button>
  </div>
);

export default MobileMenuButton;
