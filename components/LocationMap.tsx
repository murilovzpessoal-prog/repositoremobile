import React, { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Instagram, Phone, Mail, MapPin } from 'lucide-react'

interface LocationMapProps {
  key?: React.Key
  location?: string
  address?: string
  coordinates?: string
  className?: string
  status?: string
  reviews?: number
  stars?: number
  phone?: string
  website?: string
  mapsUrl?: string
}

export function LocationMap({
  location = "Famiglia Mancini Trattoria",
  address = "Rua Avanhandava, 81",
  coordinates = "23.5505° S, 46.6333° W",
  status = "ABERTO AGORA",
  reviews = 27785,
  stars = 5,
  phone,
  website,
  mapsUrl,
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8])
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      layout
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className}`}
      style={{
        perspective: 1000,
        zIndex: isExpanded ? 50 : 1
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        layout
        className="relative overflow-hidden rounded-2xl bg-[#0F0F12] border border-white/5 shadow-2xl mx-auto"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          width: isExpanded ? "100%" : 280,
          maxWidth: isExpanded ? 340 : 280,
          height: isExpanded ? 320 : 160,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
        }}
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Map Elements (Buildings) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute top-[20%] left-[35%] w-12 h-14 bg-white/[0.03] border border-white/5 rounded-lg" />
              <div className="absolute top-[45%] left-[10%] w-16 h-20 bg-white/[0.03] border border-white/5 rounded-lg" />
              <div className="absolute bottom-[10%] right-[10%] w-20 h-20 bg-white/[0.03] border border-white/5 rounded-lg" />
              <motion.div className="absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2" initial={{ scale: 0, y: -20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}>
                <div className="relative">
                  <div className="absolute -inset-6 bg-purple-600/30 blur-2xl rounded-full" />
                  <MapPin size={36} className="text-[#9333ea] drop-shadow-lg" fill="currentColor" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <div className="relative">
              <motion.div layout className="relative" animate={{ opacity: isExpanded ? 0 : 1 }}>
                <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                </motion.svg>
              </motion.div>
              {isExpanded && (
                <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                </motion.svg>
              )}
            </div>
            <motion.div layout className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md ${status.includes('FECHADO') ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5 border border-white/10 shadow-lg'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${status.includes('FECHADO') ? 'bg-red-400' : 'bg-emerald-400'}`} />
              <span className={`text-[9px] font-black tracking-widest uppercase ${status.includes('FECHADO') ? 'text-red-400' : 'text-gray-400'}`}>{status}</span>
            </motion.div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <motion.h3
                layout
                onClick={(e) => { e.stopPropagation(); window.open(mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank'); }}
                className="text-white font-black text-lg tracking-tight uppercase italic leading-none antialiased hover:text-purple-400 transition-colors"
                animate={{ x: isHovered && !isExpanded ? 4 : 0 }}
              >
                {location}
              </motion.h3>
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div key="expanded-address" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6 pt-1">
                    <p className="text-gray-400 text-[13px] font-medium italic opacity-70 leading-tight">{address}</p>
                    <div className="flex items-center gap-3 pt-1">
                      {[
                        {
                          Icon: Instagram,
                          color: 'hover:text-pink-500',
                          action: () => {
                            const igQuery = website && website.includes('instagram.com')
                              ? website
                              : `https://www.instagram.com/explore/tags/${location.replace(/\s+/g, '')}/`;
                            window.open(igQuery, '_blank');
                          }
                        },
                        {
                          Icon: Phone,
                          color: 'hover:text-emerald-500',
                          action: () => {
                            if (phone) window.open(`tel:${phone.replace(/\s+/g, '')}`, '_self');
                            else alert('Telefone não disponibilizado por esta empresa.');
                          }
                        },
                        {
                          Icon: Mail,
                          color: 'hover:text-blue-500',
                          action: () => {
                            window.open(`mailto:?subject=Proposta Estratégica - ${location}&body=Olá, vi sua empresa no Google...`, '_self');
                          }
                        },
                        {
                          Icon: MapPin,
                          color: 'hover:text-red-500',
                          action: () => window.open(mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ' ' + address)}`, '_blank')
                        }
                      ].map(({ Icon, color, action }, i) => (
                        <div
                          key={i}
                          onClick={(e) => { e.stopPropagation(); action(); }}
                          className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 ${color} hover:border-purple-500/30 transition-all shadow-xl backdrop-blur-sm cursor-pointer`}
                        >
                          <Icon size={16} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="collapsed-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < stars ? 'bg-purple-500 shadow-[0_0_4px_#A855F7]' : 'bg-white/10'}`} />
                    ))}
                    <span className="text-[10px] text-gray-500 ml-1 font-bold">({reviews} reviews)</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div layout className="h-[2px] bg-gradient-to-r from-purple-500/80 via-purple-400/20 to-transparent w-full" />
            <motion.p layout className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-1" animate={{ opacity: isExpanded ? 0.3 : 0.6 }}>{isExpanded ? 'DETALHAMENTO_IA_PRO_OK' : 'Clique para ver mais detalhes'}</motion.p>
          </div>
        </div>
        <motion.div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" animate={{ x: isHovered ? ['-100%', '100%'] : '-100%' }} transition={{ duration: 1.5, ease: "easeInOut" }} />
      </motion.div>
      <AnimatePresence>
        {isHovered && !isExpanded && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute -bottom-6 left-1/2 text-[9px] font-black text-gray-800 uppercase tracking-[0.4em] whitespace-nowrap" style={{ x: "-50%" }}>Clique para expandir</motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}