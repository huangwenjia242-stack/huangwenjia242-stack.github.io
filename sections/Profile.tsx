
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue, useSpring, useScroll, useMotionTemplate } from 'framer-motion';
import { createPortal } from 'react-dom';
import ExperienceModal from '../components/ExperienceModal';
import Magnetic from '../components/Magnetic';

// ==========================================
// 🟢 CONFIGURATION: GLOBAL ZOOM & LAYOUT
// ==========================================

// 🟢 1. GLOBAL SCALE: Adjusts the zoom level of the entire section
const PROFILE_SCALE = 0.7;

// 🟢 2. CARD DIMENSIONS: Standard dimensions before scaling
const CARD_WIDTH = '550px';
const CARD_HEIGHT = '180px';

// 🟢 3. CARD POSITIONS: Adjust each timeline card's Top, Left, and Rotation
const CARD_POSITIONS = [
    { top: '0%',  left: '55%', rotate: '-2deg' }, // was 5%
    { top: '23%', left: '60%', rotate: '1deg' },  // was 28%
    { top: '46%', left: '56%', rotate: '-1deg' }, // was 51%
    { top: '69%', left: '59%', rotate: '2deg' },  // was 74%
];

// --- DATA ---
const experienceData = [
  { 
      id: '1', 
      year: '2024 - 2026', 
      role: 'Digital Media Design (Transfer)', 
      company: 'University of Ulsan', // 韩国蔚山大学
      color: '#005C4B', 
      desc: 'Currently pursuing a degree in Digital Media Design as a transfer student in South Korea. Focusing on interactive media, visual communication, and the integration of design with emerging technologies.',
      // 翻译：目前作为插班生在韩国攻读数字媒体设计学位。专注于交互媒体、视觉传达以及设计与新兴技术的融合。
      tags: ['DIGITAL MEDIA', 'INTERACTIVE DESIGN', 'STUDY ABROAD']
  },
  { 
      id: '2', 
      year: '2025 - 2026', 
      role: 'UI Designer (Intern)', 
      company: 'Sichuan Media Company', // 四川传媒公司
      color: '#FF7F27', 
      desc: 'Completed a 3-month internship focusing on UI design. Assisted in creating user interfaces for digital platforms, maintaining visual consistency, and collaborating with the creative team to deliver high-quality design assets.',
      // 翻译：完成了为期三个月的UI设计实习。协助创建数字化平台的业务界面，保持视觉一致性，并与创意团队协作交付高质量的设计资产。
      tags: ['UI DESIGN', 'INTERNSHIP', 'VISUAL ASSETS']
  },
  { 
      id: '3', 
      year: '2023 - 2024', 
      role: 'UI Designer (Intern)', 
      company: 'Sichuan Tongdahai Co., Ltd.', // 四川省通达海公司
      color: '#FFCC00',
      desc: 'Gained professional experience as a UI Design Intern. Participated in the design process of software interfaces, conducting user research, and optimizing user flows to enhance the overall digital experience.',
      // 翻译：作为UI设计实习生获得专业经验。参与软件界面的设计过程，进行用户研究，并优化用户流程以提升整体数字化体验。
      tags: ['UI/UX', 'SOFTWARE INTERFACE', 'USER RESEARCH'] 
  },
  { 
      id: '4', 
      year: '2020 - 2023', 
      role: 'Software Technology', 
      company: 'SWUFE Chengxin (Tianfu College)', // 西南财经大学天府学院
      color: '#55FF55',
      desc: 'Studied Software Technology, building a strong foundation in logic, programming principles, and technical structures. This technical background provides a unique logical perspective for UX and digital design.',
      // 翻译：学习软件技术，在逻辑、编程原理和技术架构方面打下了坚实基础。这一技术背景为UX和数字化设计提供了独特的逻辑视角。
      tags: ['SOFTWARE TECH', 'LOGICAL DESIGN', 'FOUNDATION']
  },
];

// --- DEPTH CONFIG ---
const DEPTHS = {
    FLOOR: -300,
    PROPS: -290,
    MAIN: -50,
};

// --- COMPONENTS ---

const FloorMarquee: React.FC<{ direction: 'left' | 'right', text: string, className?: string, rotate?: number, style?: React.CSSProperties }> = React.memo(({ direction, text, className, rotate = 0, style }) => {
    return (
        <div 
            className="absolute left-[-20%] w-[140%] pointer-events-auto overflow-visible flex will-change-transform"
            style={{ 
                transform: `translateZ(${DEPTHS.PROPS - 10}px) rotate(${rotate}deg)`, 
                zIndex: 0,
                ...style,
            }}
        >
            <motion.div
                className={`flex whitespace-nowrap ${className}`}
                initial={{ x: direction === 'left' ? '0%' : '-50%' }}
                animate={{ x: direction === 'left' ? '-50%' : '0%' }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="mx-4 transition-colors duration-300">
                        {text} <span className="mx-4 opacity-30">•</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
});

const ProfileTimelineCard: React.FC<{ 
    item: any, 
    onClick: () => void, 
    index: number, 
    style: React.CSSProperties 
}> = React.memo(({ item, onClick, index, style }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const randomDuration = useMemo(() => 4 + Math.random() * 2, []);
    const randomDelay = useMemo(() => Math.random() * 2, []);

    const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top } = ref.current.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // 🟢 UPDATED: Spring physics adjusted for overshoot/recoil
            initial={{ opacity: 0, x: 400, scale: 0.9 }} 
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ margin: "-10%" }} // Removed once: true to allow replay
            transition={{ 
                delay: index * 0.15, 
                type: "spring", 
                stiffness: 50,    
                damping: 9,       
                mass: 1,          
                
                // Specific overrides for the continuous floating/hover animations
                y: {
                    duration: isHovered ? 0.3 : randomDuration,
                    repeat: isHovered ? 0 : Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: isHovered ? 0 : randomDelay
                },
                rotateZ: {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "mirror"
                }
            }}
            // 找到第 138 行左右的 className，在最后加上 pointer-events-auto
className="absolute rounded-[2rem] cursor-pointer group perspective-1000 transform-gpu will-change-transform pointer-events-auto"
            style={{ 
                ...style, 
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                transformStyle: "preserve-3d" 
            }}
            animate={{
                y: isHovered ? -10 : [0, -10, 0], 
                rotateZ: isHovered ? 0 : [0, 0.5, -0.5, 0]
            }}
        >
            <div 
                className="absolute -left-16 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center pointer-events-none"
                style={{ transform: 'translateZ(10px)' }}
            >
                <div className="absolute left-full top-1/2 w-8 h-[1px] bg-white/20 group-hover:w-12 transition-all duration-300" />
                <div className="w-3 h-3 rounded-full bg-gray-300 group-hover:bg-white transition-colors duration-300 z-10" />
                <div 
                    className="absolute inset-0 rounded-full border border-gray-400 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" 
                    style={{ borderColor: item.color }}
                />
                 <div 
                    className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-all duration-500" 
                    style={{ backgroundColor: item.color }}
                />
            </div>

            <motion.div 
                className="absolute inset-0 rounded-[2rem] shadow-sm" 
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ z: 20, scale: 1.02 }} 
            >
                <motion.div
                    className="absolute -inset-[1px] rounded-[2rem] z-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: item.color,
                        maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                        WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                    }}
                />
                
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md border border-white/60 rounded-[2rem] overflow-hidden z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-60 pointer-events-none" />

                    {/* Reverted Content Sizes */}
                    <div className="relative p-6 flex flex-col justify-center h-full z-20">
                        <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-3">
                                 <span className="font-albert-black text-3xl text-black/90 group-hover:text-black transition-colors">
                                    {item.company}
                                 </span>
                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-black">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                 </svg>
                             </div>

                             <span 
                                className="px-4 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md"
                                style={{ 
                                    backgroundColor: 'rgba(255,255,255,0.4)', 
                                    borderColor: 'rgba(255,255,255,0.6)',
                                    color: '#555' 
                                }}
                             >
                                {item.year}
                             </span>
                        </div>
                        
                        <div className="text-gray-600 font-albert-light text-lg flex items-center gap-2 mb-2">
                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                             </svg>
                             {item.role}
                        </div>

                        <p className="text-sm text-gray-500 font-albert-light leading-snug line-clamp-2 whitespace-pre-line">
                            {item.desc}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
});

const ExperienceModalCard: React.FC<{ selectedExp: any, onClose: () => void }> = ({ selectedExp, onClose }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top } = ref.current.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            layoutId={`card-${selectedExp.id}`}
            ref={ref}
            onMouseMove={handleMouseMove}
            initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: -90, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="relative w-full max-w-2xl transform-gpu overflow-hidden group"
            style={{ 
                transformStyle: "preserve-3d",
                borderRadius: '2.5rem',
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div 
                className="absolute inset-4 rounded-[2.5rem] transition-opacity duration-300 pointer-events-none"
                style={{ 
                    boxShadow: `0 0 100px -10px ${selectedExp.color}`,
                    opacity: 0.04,
                    zIndex: -1
                }}
            />
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem]"
                style={{
                    border: '1.5px solid transparent',
                    background: selectedExp.color,
                    opacity: 0.15,
                    maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                    maskComposite: 'exclude', 
                    WebkitMaskComposite: 'xor',
                    padding: '1.5px', 
                    backgroundClip: 'content-box',
                }}
            >
                 <div className="absolute inset-0 bg-transparent" /> 
            </motion.div>
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/50 pointer-events-none z-20 mix-blend-overlay" />
             <div 
                className="absolute inset-0 rounded-[2.5rem] blur-md mix-blend-multiply transition-all duration-500"
                style={{ 
                    backgroundColor: selectedExp.color, 
                    transform: 'translate(4px, 4px) scale(0.99)', 
                    opacity: 0.015, 
                    zIndex: -1 
                }} 
            />
            <div 
                className="absolute inset-0 rounded-[2.5rem] blur-md mix-blend-screen transition-all duration-500"
                style={{ 
                    backgroundColor: '#ffffff', 
                    transform: 'translate(-4px, -4px) scale(0.99)', 
                    opacity: 0.01,
                    zIndex: -2 
                }} 
            />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[60px] saturate-150 rounded-[2.5rem] shadow-2xl" />
            <div className="relative z-20 p-10 md:p-14">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors border border-black/5 backdrop-blur-sm text-black/60"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/20" style={{ backgroundColor: selectedExp.color }}>
                        {selectedExp.company.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-3xl font-albert-black text-black">{selectedExp.company}</h2>
                        <span className="text-gray-500 font-mono">{selectedExp.year}</span>
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-black mb-2">{selectedExp.role}</h3>
                    <p className="text-lg text-gray-800 leading-relaxed font-albert-regular whitespace-pre-line">
                        {selectedExp.desc}
                    </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {selectedExp.tags && selectedExp.tags.map((tag: string, i: number) => (
                         <span key={i} className="px-3 py-1 bg-white/60 border border-white/60 rounded-lg text-xs text-gray-600 font-bold uppercase backdrop-blur-md shadow-sm">
                            {tag}
                         </span>
                    ))}
                </div>
                <div 
                    className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-[80px] pointer-events-none"
                    style={{ backgroundColor: selectedExp.color, opacity: 0.02 }} 
                />
            </div>
        </motion.div>
    );
};

const StablePhoto: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            // 🌟 核心点 1：确保 pointer-events-auto 开启，且 z-index 足够高
            className="absolute w-[320px] h-[440px] md:w-[400px] md:h-[550px] pointer-events-auto group"
            style={{
                top: '-6%',
                left: '15%',
                zIndex: 30, // 提到 30，确保在图层上方
                transformStyle: "preserve-3d",
                z: DEPTHS.MAIN,
            }}
            initial={{ x: -1000, rotate: -45, opacity: 0 }}
            whileInView={{ 
                x: 0, 
                rotate: 2, 
                opacity: 1,
                y: [0, -10, 0]
            }}
            viewport={{ once: false }}
            transition={{ 
                x: { duration: 1.2, type: "spring", stiffness: 50, damping: 12 },
                y: { duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="w-full h-full rounded-[2rem] bg-white p-3 shadow-2xl cursor-pointer"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                <div className="w-full h-full relative overflow-hidden rounded-[1.5rem] bg-gray-100 transform-style-3d">
                    <img 
                        src="/tupian/HUANGWENJIA.jfif" 
                        alt="Profile" 
                        // 🌟 核心点 2：默认使用 filter grayscale (100% 黑白)
                        // 当鼠标移入父级（group）时，触发 group-hover:grayscale-0 恢复原本色彩
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform-gpu"
                        decoding="async"
                        loading="lazy"
                    />
                    {/* 鼠标悬停时光效遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.15)] rounded-[1.5rem] pointer-events-none" />
                </div>
            </motion.div>
        </motion.div>
    );
};

const NameTilt: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 200, damping: 10 });
    const mouseYSpring = useSpring(y, { stiffness: 200, damping: 10 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d" 
            }}
            className="inline-block"
        >
            <h2 className="text-7xl font-albert-black text-black leading-none mb-4 mix-blend-multiply tracking-tighter transform -skew-x-6 hover:text-black/70 transition-colors duration-300 pointer-events-none">
                HUANG<br/>WENJIA
            </h2>
        </motion.div>
    );
};


const Profile: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
  });
  const floorY = useTransform(scrollYProgress, [0, 1], ["-10%", "-30%"]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 30, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 30, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;
      x.set(clientX / w - 0.5);
      y.set(clientY / h - 0.5);
  };

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["35deg", "25deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-1%", "1%"]);

  return (
    <section 
        ref={containerRef}
        className="relative w-full bg-white overflow-hidden" 
        onMouseMove={handleMouseMove}
        style={{ height: '140vh' }}
    >
      <motion.div 
         className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center will-change-transform"
      >
        <div className="absolute inset-0 flex items-center justify-center perspective-2000">
            <motion.div
                className="relative w-full max-w-[1600px] will-change-transform transform-gpu"
                style={{
                    scale: PROFILE_SCALE, // 🟢 APPLIED GLOBAL SCALE
                    rotateX,
                    rotateY,
                    x: translateX,
                    y: floorY,
                    aspectRatio: '16/9',
                    transformStyle: "preserve-3d",
                }}
            >
                <div className="absolute inset-[-50%] bg-white transform-preserve-3d" style={{ transform: `translateZ(${DEPTHS.FLOOR}px)` }} />
                
                {/* Scaled Text (Reverted) */}
                <FloorMarquee 
                    direction="right" 
                    text="About Me" 
                    rotate={-5} 
                    className="text-[160px] font-albert-black text-gray-100 leading-none" 
                    style={{ top: '15%', zIndex: 1 }}
                />

                <div 
                    className="absolute pointer-events-none text-center w-[400px]"
                    style={{
                         top: '5%',
                         left: '15%',
                         transform: `translateZ(${DEPTHS.PROPS}px) rotateX(-5deg)`,
                         zIndex: 5
                    }}
                >
                    {/* Reverted Text */}
                    <h2 className="text-6xl font-albert-black text-gray-200 tracking-tighter">About Me</h2>
                </div>

                <StablePhoto />

                <motion.div 
                    className="absolute text-left pointer-events-auto"
                    style={{ 
                        top: '70%', 
                        left: '22%', 
                        transform: `translateZ(${DEPTHS.MAIN}px) rotateX(-10deg) rotateZ(-5deg)`,
                        width: '450px',
                        zIndex: 25
                    }}
                    initial={{ opacity: 0, y: 50, rotate: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5, duration: 1, type: "spring" }}
                >
                    <Magnetic strength={40}>
                        <motion.div
                            className="cursor-pointer"
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <NameTilt />
                            <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-500 pl-4 border-l-2 border-gray-300 pointer-events-none">
                                <span>EST. 2001</span>
                                <span>·</span>
                                <span>CHINA CHENGDU</span>
                                <span>·</span>
                                <span>DESIGNER</span>
                            </div>
                        </motion.div>
                    </Magnetic>
                </motion.div>

                {/* Timeline Cards */}
            {/* ========================================================= */}
                {/* 🌟 位置微调：将 w-1/2 改为 w-[60%]，让卡片自然向左移动，完美居中对齐 */}
                {/* ========================================================= */}
                <div 
                    // 核心修改：通过 w-[60%] 让右边容器变宽，卡片就会整体往左边靠，你可以根据视觉效果在 55% 到 65% 之间微调
                    className="absolute w-[100%] h-full right-0 pointer-events-auto"
                    style={{
                        zIndex: 40,
                        transformStyle: "preserve-3d",
                        transform: `translateZ(${DEPTHS.MAIN + 70}px) rotateX(-5deg)`,
                    }}
                >
                   {experienceData.map((item, idx) => (
                        <ProfileTimelineCard 
                            key={item.id} 
                            item={item} 
                            index={idx}
                            style={CARD_POSITIONS[idx] as React.CSSProperties}
                            onClick={() => {
                                console.log("Card clicked:", item.company);
                                setSelectedExp(item);
                            }}
                        />
                    ))}
                </div>

            </motion.div>
        </div>
      </motion.div>

      {/* FLIP MODAL OVERLAY */}
      {createPortal(
        <AnimatePresence>
            {selectedExp && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center perspective-2000 px-4">
                     <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="absolute inset-0 bg-white/40 backdrop-blur-md"
                        onClick={() => setSelectedExp(null)}
                     />
                     
                     <ExperienceModalCard 
                        selectedExp={selectedExp} 
                        onClose={() => setSelectedExp(null)} 
                     />
                </div>
            )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Profile;
