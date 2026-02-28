import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Instagram, Linkedin, Link as LinkIcon, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import headerLogo from '../../assets/header_logo.png';
import footerLogo from '../../assets/footer_logo.png';

// Smooth scroll utility
const smoothScroll = (target: string) => {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 3D Glass Object Component
function GlassObject({ 
  color, 
  size, 
  mobileSize,
  borderRadius, 
  className = "",
  mobileClassName = "",
  mouseX,
  mouseY,
  parallaxStrength = 20
}: { 
  color: string;
  size: number;
  mobileSize?: number;
  borderRadius: number;
  className?: string;
  mobileClassName?: string;
  mouseX: any;
  mouseY: any;
  parallaxStrength?: number;
}) {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const actualSize = isMobile && mobileSize ? mobileSize : size;
  const x = useTransform(mouseX, [0, windowSize.width], [-parallaxStrength, parallaxStrength]);
  const y = useTransform(mouseY, [0, windowSize.height], [-parallaxStrength, parallaxStrength]);

  return (
    <motion.div 
      className={`absolute ${isMobile && mobileClassName ? mobileClassName : className}`}
      style={{ x: isMobile ? 0 : x, y: isMobile ? 0 : y }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div 
        className="relative shadow-[0px_25px_50px_0px]" 
        style={{ 
          width: actualSize,
          height: actualSize,
          borderRadius,
          backgroundImage: color,
          boxShadow: `0px 25px 50px 0px ${color.includes('66, 133, 244') ? 'rgba(66,133,244,0.5)' : 
                                          color.includes('253, 43, 37') ? 'rgba(253,43,37,0.5)' :
                                          color.includes('255, 166, 0') ? 'rgba(255,166,0,0.5)' :
                                          'rgba(0,170,71,0.5)'}`
        }}
      >
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_20px_0px_rgba(255,255,255,0.4)]" />
      </div>
    </motion.div>
  );
}

// Navigation Bar
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Study', href: '#study' },
    { label: 'Team Member', href: '#team' },
    { label: 'Event', href: '#event' },
    { label: 'Recruit', href: '#recruit' },
    { label: 'Contact', href: '#footer' }
  ];

  const handleMenuClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => smoothScroll(href), 100);
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <img 
            src={headerLogo} 
            alt="GDGoC DEU" 
            className="h-8 md:h-10 w-auto"
          />
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 lg:gap-8 font-['Montserrat',sans-serif] font-bold text-sm lg:text-base">
            {menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href}
                onClick={(e) => handleMenuClick(e, item.href)}
                className="hover:text-[#4285F4] transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-[60px] right-4 left-4 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex flex-col gap-4">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleMenuClick(e, item.href)}
                    className="font-['Montserrat',sans-serif] font-bold text-lg py-3 px-4 rounded-xl hover:bg-[#4285F4] hover:text-white transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hero Section
function HeroSection({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16 md:pt-0">
      {/* 3D Glass Objects - Desktop */}
      <GlassObject 
        color="linear-gradient(135deg, rgba(66, 133, 244, 0.8) 0%, rgba(31, 134, 251, 0.6) 100%)"
        size={280}
        mobileSize={120}
        borderRadius={60}
        className="hidden md:block top-[10%] left-[5%] -rotate-25"
        mobileClassName="top-[5%] left-[-40px] -rotate-25 opacity-60"
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxStrength={30}
      />
      <GlassObject 
        color="linear-gradient(135deg, rgba(255, 166, 0, 0.8) 0%, rgba(255, 215, 0, 0.6) 100%)"
        size={200}
        mobileSize={90}
        borderRadius={50}
        className="hidden md:block top-[35%] left-[15%] rotate-35"
        mobileClassName="top-[15%] left-[10px] rotate-35 opacity-50"
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxStrength={25}
      />
      <GlassObject 
        color="linear-gradient(135deg, rgba(0, 170, 71, 0.8) 0%, rgba(52, 168, 83, 0.6) 100%)"
        size={240}
        mobileSize={100}
        borderRadius={55}
        className="hidden md:block top-[65%] left-[10%] -rotate-15"
        mobileClassName="bottom-[5%] left-[-30px] -rotate-15 opacity-50"
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxStrength={20}
      />
      <GlassObject 
        color="linear-gradient(126.254deg, rgba(253, 43, 37, 0.8) 0%, rgba(255, 107, 107, 0.6) 100%)"
        size={220}
        mobileSize={110}
        borderRadius={70}
        className="hidden md:block top-[15%] right-[8%] rotate-15"
        mobileClassName="top-[8%] right-[-40px] rotate-15 opacity-60"
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxStrength={28}
      />
      <GlassObject 
        color="linear-gradient(135deg, rgba(66, 133, 244, 0.8) 0%, rgba(31, 134, 251, 0.6) 100%)"
        size={220}
        mobileSize={95}
        borderRadius={55}
        className="hidden md:block top-[45%] right-[12%] -rotate-30"
        mobileClassName="top-[40%] right-[-20px] -rotate-30 opacity-50"
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxStrength={22}
      />
      <GlassObject 
        color="linear-gradient(135deg, rgba(255, 166, 0, 0.8) 0%, rgba(255, 215, 0, 0.6) 100%)"
        size={260}
        mobileSize={105}
        borderRadius={60}
        className="hidden md:block top-[70%] right-[10%] rotate-25"
        mobileClassName="bottom-[10%] right-[-35px] rotate-25 opacity-60"
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxStrength={26}
      />

      {/* Mobile Glass Objects */}
      <div className="md:hidden">
        <GlassObject 
          color="linear-gradient(135deg, rgba(66, 133, 244, 0.7) 0%, rgba(31, 134, 251, 0.5) 100%)"
          size={120}
          borderRadius={40}
          className="top-[5%] left-[-40px] -rotate-25 opacity-60"
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxStrength={0}
        />
        <GlassObject 
          color="linear-gradient(135deg, rgba(255, 166, 0, 0.7) 0%, rgba(255, 215, 0, 0.5) 100%)"
          size={90}
          borderRadius={35}
          className="top-[15%] right-[-30px] rotate-35 opacity-50"
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxStrength={0}
        />
        <GlassObject 
          color="linear-gradient(126.254deg, rgba(253, 43, 37, 0.7) 0%, rgba(255, 107, 107, 0.5) 100%)"
          size={110}
          borderRadius={45}
          className="bottom-[20%] left-[-35px] rotate-15 opacity-60"
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxStrength={0}
        />
        <GlassObject 
          color="linear-gradient(135deg, rgba(0, 170, 71, 0.7) 0%, rgba(52, 168, 83, 0.5) 100%)"
          size={100}
          borderRadius={40}
          className="bottom-[10%] right-[-40px] -rotate-20 opacity-50"
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxStrength={0}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl">
        <motion.div 
          className="inline-block bg-black text-white px-6 md:px-8 py-2 md:py-3 rounded-full mb-6 md:mb-8 font-['Pretendard',sans-serif] font-medium text-sm md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          2026년 1학기
        </motion.div>
        
        <motion.h1 
          className="font-['Montserrat',sans-serif] font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-3 md:mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          NEW CHAPTER
        </motion.h1>
        <motion.h1 
          className="font-['Montserrat',sans-serif] font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 md:mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          COMING UP NEXT
        </motion.h1>
        
        <motion.h2 
          className="font-['Montserrat',sans-serif] font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Who is Next Chapter?
        </motion.h2>
        
        <motion.p 
          className="font-['Pretendard',sans-serif] font-medium text-lg md:text-xl lg:text-2xl mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          GDGoC DEU 신규 멤버 모집
        </motion.p>

        <motion.a
          href="https://docs.google.com/forms/d/e/1FAIpQLSflSzbIop33OO8dVyZdls-eojtcUGMX7HgTXGH2i1c-MJQ6Kg/viewform"
          className="inline-block bg-[#4285F4] hover:bg-[#1F86FB] text-white font-['Montserrat',sans-serif] font-bold text-base md:text-lg lg:text-xl px-8 md:px-12 py-3 md:py-4 rounded-full shadow-2xl transition-all duration-300 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Apply for 2026-01
        </motion.a>
      </div>
    </section>
  );
}

// Study Section with Horizontal Scroll
function StudySection() {
    const navigate = useNavigate();
  const [activeSemester, setActiveSemester] = useState('25-02');
  
  const studies = {
    '24-02': [
      {
        title: 'Project Study',
        description: '학생들에게 제공되는 서비스 (프론트엔드 / 백엔드) 개발하기',
        tags: ['Project', 'Frontend', 'Backend'],
        link: 'https://www.notion.so/gdsc-deu/Project-Study-263e8617357a80bda64ef77fe02cae49?v=25ae8617357a815880ad000c64c0b95b&source=copy_link'
      },
      {
        title: 'HTML-to-React Frontend Study',
        description: 'HTML부터 React까지 배우는 웹 개발 스터디',
        tags: ['React', 'TypeScript', 'Next.js'],
        link: 'https://github.com/GDG-on-Campus-DEU/HTML-To-React-24-25'
      },
      {
        title: 'Spring Study',
        description: 'Spring 프레임워크를 활용한 백엔드 개발 스터디',
        tags: ['React', 'TypeScript', 'Next.js'],
        link: 'https://minadotcho.notion.site/Spring-Boot-11300600f91780b7b778c5545c9ac0aa'
      },
      {
        title: 'Algorithm Study',
        description: 'React와 TypeScript로 배우는 현대적인 웹 개발',
        tags: ['React', 'TypeScript', 'Next.js'],
        link: '/study/algorithm-study-24-02'
      }
    ],
    '25-01': [
      {
        title: 'Frontend Study',
        description: 'React와 JavaScript를 활용한 웹 개발 스터디',
        tags: ['React', 'JavaScript', 'Vite'],
        link: '/study/frontend-study-25-01'
      },
      {
        title: 'Backend Study',
        description: 'Spring 프레임워크를 활용한 백엔드 개발 스터디',
        tags: ['Spring', 'Backend'],
        link: 'https://github.com/GDG-on-Campus-DEU/24-25-backend-project-study'
      },
      {
        title: 'Game Study',
        description: '유니티5 2D(전반), 언리얼(후반) 엔진을 활용한 게임 개발을 함께 배우는 스터디',
        tags: ['Game', 'Unity5', 'Unreal Engine'],
        link: '/study/game-study-25-01'
      },
      {
        title: 'Security Study',
        description: '정보보호로 알아보는 보안 스터디',
        tags: ['Security'],
        link: '/study/security-study-25-01'
      }
    ],
    '25-02': [
      {
        title: 'Algorithm Study',
        description: '"백준 / 프로그래머스 알고리즘 문제 풀이"를 함께 공부하며, 서로의 풀이 과정을 공유하고 효율적인 접근 방법을 배우는 스터디',
        tags: ['Algorithm', 'Baekjoon', 'Programmers'],
        link: 'https://www.notion.so/gdsc-deu/Algorithm-278e8617357a80dc9e2ec94ea86d9b77?v=25ae8617357a815880ad000c64c0b95b&source=copy_link'
      },
      {
        title: 'Project Study',
        description: '서비스 기획, 구현, 공개를 목표로 하는 프로젝트 스터디',
        tags: ['Project', 'Frontend', 'Backend'],
        link: 'https://www.notion.so/gdsc-deu/25-26-Q1-271e8617357a8080ad15eee990f8aac9?v=25ae8617357a815880ad000c64c0b95b&source=copy_link'
      },
      {
        title: 'Cross Platform Study',
        description: '나만의 크로스 플랫폼 앱 개발',
        tags: ['Cross Platform', 'Android', 'iOS', 'Swift'],
        link: 'https://www.notion.so/gdsc-deu/271e8617357a80d7b255f251fe703d3f?v=25ae8617357a815880ad000c64c0b95b&source=copy_link'
      },
      {
        title: 'Writing Study',
        description: '한 달에 기술관련 글 최소 1개 발행을 목표로 하는 스터디',
        tags: ['Writing', 'Blog', 'tistory', 'velog'],
        link: 'https://www.notion.so/gdsc-deu/271e8617357a80d580d7d2a21914bc3a?v=25ae8617357a815880ad000c64c0b95b&source=copy_link'
      },
      {
        title: 'Java & Spring Backend Study',
        description: 'Spring Intermediate 스터디는 기존 스프링 부트에 관한 지식에 더해 테스트 및 배포 과정까지 학습하며 보다 깊이 있는 탐구를 진행하는 스터디',
        tags: ['Java', 'Spring', 'Backend'],
        link: 'https://www.notion.so/gdsc-deu/Java-Spring-272e8617357a80459eede4df7d85da10?v=25ae8617357a815880ad000c64c0b95b&source=copy_link'
      },
      {
        title: 'MineCraft Object-Oriented Programming Study',
        description: '마인크래프트 모딩 툴 (Bukkit API)를 통해 개발하며 자바생태계 / 자바에 대해 더 깊이 알아보기',
        tags: ['MineCraft', 'Object-Oriented', 'Java'],
        link: '/study/minecraft-oop'
      },
    ]
  };

  return (
    <section id="study" className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-black text-white px-6 md:px-8 py-2 md:py-3 rounded-full mb-4 md:mb-6 font-['Pretendard',sans-serif] font-medium text-sm md:text-lg">
            스터디 아카이브
          </div>
          <h2 className="font-['Montserrat',sans-serif] font-black text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">The Archive</h2>
          <p className="font-['Pretendard',sans-serif] text-base md:text-lg lg:text-xl text-gray-600 px-4">
            학기별 진행된 스터디를 살펴보세요
          </p>
        </motion.div>

        {/* Tab Switcher - Horizontal scroll */}
        <div className="overflow-x-auto mb-8 md:mb-12 scrollbar-hide">
          <div className="flex justify-start md:justify-center gap-3 md:gap-4 min-w-max pb-2">
            {['24-02', '25-01', '25-02'].map((semester) => (
              <motion.button
                key={semester}
                onClick={() => setActiveSemester(semester)}
                className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full font-['Montserrat',sans-serif] font-bold text-base md:text-lg transition-all whitespace-nowrap ${
                  activeSemester === semester
                    ? 'bg-[#4285F4] text-white shadow-xl'
                    : 'bg-white/80 backdrop-blur-xl hover:bg-white shadow-lg'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {semester}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Study Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={activeSemester}
        >
          {studies[activeSemester as keyof typeof studies].map((study, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="font-['Montserrat',sans-serif] font-bold text-xl md:text-2xl mb-2 md:mb-3">{study.title}</h3>
              <p className="font-['Pretendard',sans-serif] text-sm md:text-base text-gray-600 mb-3 md:mb-4">{study.description}</p>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {study.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 md:px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm font-['Pretendard',sans-serif]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              {/* Learn More 버튼 - 조건부 렌더링 */}
                {study.link.startsWith('/') ? (
                // 내부 링크: navigate 사용
                    <button 
                        onClick={() => navigate(study.link)}
                        className="inline-block bg-black text-white px-5 md:px-6 py-2 rounded-full text-sm md:text-base font-['Montserrat',sans-serif] font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        Learn More
                    </button>
                    ) : (
                    // 외부 링크: 기존 <a> 태그 사용
                    <a 
                        href={study.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-black text-white px-5 md:px-6 py-2 rounded-full text-sm md:text-base font-['Montserrat',sans-serif] font-bold hover:bg-gray-800 transition-colors"
                    >
                        Learn More
                    </a>
                )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Team Member Section with Updated Tags
function TeamMemberSection() {
  const teamMembers = [
    {
      name: '김상윤',
      role: 'Team Member',
      tags: ['#Community Team'],
      color: '#4285F4',
      imageUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/%EC%83%81%EC%9C%A4_%EA%B9%80_8x3fV4H.jpg'
    },
    {
      name: '남규모',
      role: 'Team Member',
      tags: ['#Promotion Team'],
      color: '#EA4335',
      imageUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/%EA%B7%9C%EB%AA%A8_%EB%82%A8.jpg'
    },
    {
      name: '송녕경',
      role: 'Team Member',
      tags: ['#Promotion Team', '#Community Team'],
      color: '#FBBC05',
      imageUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/%EB%85%95%EA%B2%BD_%EC%86%A1.jpg'
    },
    {
      name: '양진원',
      role: 'Team Member',
      tags: ['#Event Team', '#Community Team'],
      color: '#34A853',
      imageUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/contentbuilder/GDG-Bevy-DefaultProfile_xY7OLAZ.png'
    },
    {
      name: '정연준',
      role: 'Team Member',
      tags: ['#Community Team'],
      color: '#4285F4',
      imageUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/contentbuilder/GDG-Bevy-DefaultProfile_xY7OLAZ.png'
    },
    {
      name: '최범준',
      role: 'Team Member',
      tags: ['#Promotion Team', '#Event Team'],
      color: '#EA4335',
      imageUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/contentbuilder/GDG-Bevy-DefaultProfile_xY7OLAZ.png'
    }
  ];

  return (
    <section id="team" className="py-12 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-black text-white px-6 md:px-8 py-2 md:py-3 rounded-full mb-4 md:mb-6 font-['Pretendard',sans-serif] font-medium text-sm md:text-lg">
            운영진
          </div>
          <h2 className="font-['Montserrat',sans-serif] font-black text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">Team Members</h2>
          <p className="font-['Pretendard',sans-serif] text-base md:text-lg lg:text-xl text-gray-600 px-4">
            GDGoC DEU를 이끌어가는 사람들
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all border-4"
              style={{ borderColor: member.color }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              {/* Profile Image with Color Border */}
              <div className="mb-4 md:mb-6 mx-auto w-20 h-20 md:w-24 md:h-24">
                <div 
                  className="w-full h-full rounded-full p-1 shadow-lg"
                  style={{ 
                    backgroundColor: member.color,
                    boxShadow: `0 8px 24px ${member.color}40`
                  }}
                >
                  <img 
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
              </div>
              
              <h3 className="font-['Pretendard',sans-serif] font-bold text-xl md:text-2xl text-center mb-2">{member.name}</h3>
              <p className="font-['Montserrat',sans-serif] text-sm md:text-base text-gray-600 text-center mb-3 md:mb-4">{member.role}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {member.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 md:px-3 py-1 rounded-full text-xs md:text-sm font-['Pretendard',sans-serif] text-white"
                    style={{ backgroundColor: member.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Event Section with Lightbox Modal
function EventSection() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const events = [
    {
      title: 'Solution Challenge',
      description: '구글의 글로벌 해커톤 참여',
      images: ['https://images-ext-1.discordapp.net/external/3areHw_xxhcFVa-KhIuTfbWct9NHSbEP8s96Hz9jNl0/https/storage.googleapis.com/vision-hack2skill-production/innovator/USER00000009/1741756018250-Group2199765.png?format=webp&quality=lossless&width=807&height=807']
    },
    {
      title: 'Tech Seminar Series',
      description: '매달 진행되는 기술 세미나',
      images: [
        'https://media.discordapp.net/attachments/1327602998842626151/1327626334318624879/IMG_6250.jpg?ex=69a392a0&is=69a24120&hm=de53d6706186e63889b896073e8eab5fb9e4775bb834464205134158651df5ed&=&format=webp&width=937&height=703',
        'https://media.discordapp.net/attachments/1290254636195778560/1290262824672563200/20240927_190410.jpg?ex=69a41865&is=69a2c6e5&hm=c7d6b5f939b913123d07590efcabea45ce064c59195a09a4354d9590f1551719&=&format=webp&width=937&height=703',
        'https://media.discordapp.net/attachments/1357007754560278609/1357007757051695396/IMG_5933.jpg?ex=69a3acb5&is=69a25b35&hm=065e2fe4cf71200a8820fcf4d7f42a523f1da4dc032eec809af0cad97ae61598&=&format=webp&width=937&height=703',
        'https://media.discordapp.net/attachments/1374715718842716160/1374715720360919191/IMG_3263.jpg?ex=69a427c8&is=69a2d648&hm=5e2357ed2ac1cec9c065352cb73faf5bfd2027e0c5c4864822fb59cf87c5d62e&=&format=webp&width=1250&height=703',
        'https://media.discordapp.net/attachments/1408700427146362890/1408700427897409659/IMG_3974.jpg?ex=69a3dd82&is=69a28c02&hm=819f363da2e0f210099541cc8d7141af94e48439b759adb0949290886cf8779f&=&format=webp&width=937&height=703',
        'https://media.discordapp.net/attachments/1438480505942183966/1438480717406535700/20251113_174524.jpg?ex=69a41990&is=69a2c810&hm=5319297431edf4df3a5d172571294fa7b0f0b1191db6df1fc8bee3fa4bc0ee59&=&format=webp&width=1318&height=616',
        'https://media.discordapp.net/attachments/1446120746626711563/1446144840705245244/IMG_8676.jpg?ex=69a3a316&is=69a25196&hm=347fd75fbc7e5a0810b2515142a18579b92e5e272bb54a6828772cdb6663a831&=&format=webp&width=937&height=703'
      ]
    },
    {
      title: 'Google I/O Extended',
      description: 'Google I/O Extended 참여 기회 제공',
      images: [
        'https://lh3.googleusercontent.com/pw/AP1GczNI5WvyvxDcN06QmSnTHm7OxVRFB51_OXfnXlb6bmZ_5KZDS9kbiBIaiYMQLglkAv869YFweLj1oMlurH7oEdS9_uy42RFi7mjmBmvLZ2P6FnjNNzRaYQwSfLs_M7tRxCtuZIOD6AuTqSCmrhzLvW9_Ng=w1139-h758-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczP8ZHJmoX9u3Dt8CBAi2q5Y-6My1vrvhVzY94QmJZNGZd_RyrdtO6TMvvwukJKDI2KLyvscCvbGX6rqkvDzIm8stX8oSuHiL-E1YUWU6I8PWcIGbNKzy5r4Sm6Dw86ibGcsNxXsO9Ym6F0pO515_QJDng=w1011-h758-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczMdbcIn0SPAy32UeP0MJh3l5ggl5sWdHRLZ8c9iPAt0GnLo63tngD0GCMlxFvPxjzctFMY3CY-ASlxWs5ANHn2X3Cipyuvp8KL3vF1nZ3hROsstbr3iK6WqUMYsTtyqRssKW4IK4Xb4YBI1eGBdVqbOXA=w1139-h758-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczM8VjE4r3aBHE5LO1qN6CsHkLYDVbfHVeklAmncX3Wa6EWpcPXudgxRKxuWL19z7s2Y43oSpLPlQaFIlQc0bescpfiu9-zc1t6d3xZIxEezfmrswwibPpXAr-rgIOphW1jzLSoaC0NSkmoQRcVJOhCHiQ=w1139-h758-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczMSycOGv-1x1v5CXMJIhcR0Rp9EkLuZR9pidJfVFQqeweg9jYiO7Z-Ny2v4h0Xk4YcAkuYUk7doFW-Yag0HofKI5wl48C15Ce9sYe6UCWiAIa67VstCu8-pXnVAVsym-Td3WFNulprqVEEQ0wyBRqqDQg=w1011-h758-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczN8-vMQaIpqdmSzjgPNHunhmfbAMHTZFSpT2pHsR9iPTiqd1s_aRLyj88bBKrahLUQ1gdo7UYL_e8N34fwieRvrMJHScRHvbULnb2O7Tj3X9i4cErUG1OJvcbZhkmeCsU0cnVuyJkVpggYPfdWpYOnnWg=w1139-h758-s-no-gm?authuser=0'
      ]
    },
    {
      title: 'Hackathon',
      description: '24시간 해커톤',
      images: [
        'https://lh3.googleusercontent.com/pw/AP1GczOHIEc-SnKYQiobEMWD5l-ouMbboWduGKOmMHgqbgJ1k-wZOw1rBGQy2xWtTzll6MdfZ8xjbPHc8uKALvYXXhzPkz1EDiwT3dYfmHeDqlB_kvpD8pZ1DirIOjxtxJsOrECA2iCrflRqmg8acV91rM0S=w1348-h758-s-no-gm?authuser=0', 
        'https://lh3.googleusercontent.com/pw/AP1GczPQU4bfbYu8-1bzw2H2ltyjOUhL43A39aVNXJqAaQMTWrGzPaqsePquFWYM1gZ_mytMFy1lUcTiojTwMhJNhi0cV3VkdHEDsXDdSwAv__gdbEWBS8TALApFo9pi_9p9fPlmZFQ9UyohZy05GAQPTloP=w1011-h758-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczNTU5av0ApKZClb5vaj_FQzpXxIIVXpJnalFyM9_MF6q9zLn83QZk-7tp7Xzl8aANdNJWyxkXRoYlP5UPpu_WkxKpXedaqDGFuEuOi9FUsyFH8a8KjYiO12NstuQMhMK6dGFQ213qLZvkLhD07zznxG=w1137-h758-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczOTsJKancL-T7woeG1oIUYUE3ih1pztPLiOBbzIN-z2l2ZAgxqUjaBx2QBWrx7MV8q6XhvGELf6LeC2GorA3EzUxfpjZgi1DJ42Cyq2_yEeQX_qDpauxCxbHGt7_L57iBztDjVKQ8bzsSbvibwNwSPo=w1137-h758-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczMgw9LWWhGqLWvjK64SVnKlG28C4C6nYudebSiGw9zk14hf_AguEfCnUt19jsgL1AoomVxTlIUNO0HoiXKGWFL4-7c6xjTuIEZWZwpauDuLrPCYWAJgj206GE-Q47A4WjtzkbepF6iodU24eC_W67bt=w1137-h758-s-no-gm?authuser=0',
      ]
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedEvent(index);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedEvent !== null) {
      setCurrentImageIndex((prev) => 
        prev === events[selectedEvent].images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent !== null) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? events[selectedEvent].images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="event" className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-black text-white px-6 md:px-8 py-2 md:py-3 rounded-full mb-4 md:mb-6 font-['Pretendard',sans-serif] font-medium text-sm md:text-lg">
            활동 갤러리
          </div>
          <h2 className="font-['Montserrat',sans-serif] font-black text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">Past Events</h2>
          <p className="font-['Pretendard',sans-serif] text-base md:text-lg lg:text-xl text-gray-600 px-4">
            우리가 함께한 순간들
          </p>
        </motion.div>

        {/* Uniform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all border border-white/20 cursor-pointer h-64 flex flex-col justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openLightbox(index)}
            >
              <h3 className="font-['Montserrat',sans-serif] font-bold text-lg md:text-xl mb-2 text-center">{event.title}</h3>
              <p className="font-['Pretendard',sans-serif] text-sm md:text-base text-gray-600 text-center">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedEvent !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={closeLightbox}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 max-w-4xl w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>

              {/* Image Slider */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={events[selectedEvent].images[currentImageIndex]}
                  alt={events[selectedEvent].title}
                  className="w-full h-[60vh] object-cover"
                />

                {/* Navigation Arrows */}
                {events[selectedEvent].images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-['Montserrat',sans-serif]">
                  {currentImageIndex + 1} / {events[selectedEvent].images.length}
                </div>
              </div>

              {/* Event Info */}
              <div className="mt-4 text-center text-white">
                <h3 className="font-['Montserrat',sans-serif] font-bold text-2xl mb-2">{events[selectedEvent].title}</h3>
                <p className="font-['Pretendard',sans-serif] text-lg">{events[selectedEvent].description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Recruitment Section
function RecruitmentSection() {
  return (
    <section id="recruit" className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-black text-white px-6 md:px-8 py-2 md:py-3 rounded-full mb-4 md:mb-6 font-['Pretendard',sans-serif] font-medium text-sm md:text-lg">
            모집 안내
          </div>
          <h2 className="font-['Montserrat',sans-serif] font-black text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">NO INTERVIEW</h2>
          <p className="font-['Pretendard',sans-serif] text-base md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-12 px-4">
            면접 없이, 지원서로만 여러분의 열정을 보여주세요
          </p>

          {/* Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
            {[
              { step: '1', title: '지원서 작성', desc: '간단한 온라인 폼 작성' },
              { step: '2', title: '서류 검토', desc: '여러분의 열정을 확인' },
              { step: '3', title: '최종 결과', desc: '합격 통보 및 온보딩' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#4285F4] text-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 font-['Montserrat',sans-serif] font-black text-xl md:text-2xl">
                  {item.step}
                </div>
                <h3 className="font-['Pretendard',sans-serif] font-bold text-lg md:text-xl mb-2">{item.title}</h3>
                <p className="font-['Pretendard',sans-serif] text-sm md:text-base text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="https://docs.google.com/forms/d/e/1FAIpQLSflSzbIop33OO8dVyZdls-eojtcUGMX7HgTXGH2i1c-MJQ6Kg/viewform"
            className="inline-block bg-[#EA4335] hover:bg-[#FD2B25] text-white font-['Montserrat',sans-serif] font-bold text-lg md:text-xl lg:text-2xl px-10 md:px-16 py-4 md:py-5 rounded-full shadow-2xl transition-all duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Application
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Back to Top Button
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur-xl border-2 border-gray-200 shadow-2xl flex items-center justify-center hover:bg-white hover:border-[#4285F4] transition-all group"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ChevronUp size={24} className="text-gray-700 group-hover:text-[#4285F4] transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Footer with Copyright
function Footer() {
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/GDG-on-Campus-DEU' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/gdgoc.deu/' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/gdsc-deu/' },
    { icon: LinkIcon, label: 'Website', href: 'https://gdg.community.dev/gdg-on-campus-dong-eui-university-busan-south-korea/' }
  ];

  return (
    <footer id="footer" className="bg-black text-white py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Top Row - Space Between */}
          <div className="flex items-center justify-between mb-6">
            {/* Left: GDGoC DEU Logo */}
            <img 
              src={footerLogo} 
              alt="GDGoC DEU" 
              className="h-10 w-auto"
            />
            
            {/* Right: Contact Us + Icons */}
            <div className="flex items-center gap-6">
              <span className="font-['Pretendard',sans-serif] font-medium text-lg text-gray-300">
                Contact Us
              </span>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="text-gray-400 hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom Row - University Name */}
          <p className="font-['Pretendard',sans-serif] text-gray-400 text-sm mb-3">
            Google Developer Groups on Campus - Dong-Eui University
          </p>

          {/* Copyright - Left Aligned */}
          <p className="font-['Pretendard',sans-serif] text-gray-500 text-xs">
            © 2026 GDGoC DEU. All rights reserved.
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Logo - Fluid Scaling */}
          <div className="flex justify-center mb-8">
            <img 
              src={footerLogo} 
              alt="GDGoC DEU" 
              className="h-8 w-auto max-w-[80%]"
            />
          </div>

          {/* University Name - Fluid Typography */}
          <p className="font-['Pretendard',sans-serif] text-gray-400 text-sm leading-relaxed text-center mb-6 px-6">
            Google Developer Groups on Campus<br />Dong-Eui University
          </p>

          {/* Contact Us Label - Improved Spacing */}
          <p className="font-['Pretendard',sans-serif] font-medium text-base text-gray-300 text-center mb-5">
            Contact Us
          </p>

          {/* Social Icons - Enhanced Touch Targets */}
          <div className="flex justify-center gap-4 mb-8 px-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-12 h-12 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white hover:bg-white/10 active:scale-95 transition-all"
                aria-label={social.label}
              >
                <social.icon size={20} className="text-gray-400" />
              </a>
            ))}
          </div>

          {/* Copyright - Fluid Bottom Spacing */}
          <p className="font-['Pretendard',sans-serif] text-gray-500 text-xs text-center px-6">
            © 2026 GDGoC DEU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection mouseX={mouseX} mouseY={mouseY} />
      <StudySection />
      <TeamMemberSection />
      <EventSection />
      <RecruitmentSection />
      <BackToTop />
      <Footer />
    </div>
  );
}