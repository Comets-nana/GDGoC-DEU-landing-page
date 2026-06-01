import { useState } from 'react';
import { Outlet, useNavigate, useLocation, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Video, Users, Image, LogOut, Menu, X, Home, ChevronRight, MessageSquare } from 'lucide-react';
import headerLogo from '../../assets/header_logo.png';

const navItems = [
  { path: 'studies', label: '스터디 관리', icon: BookOpen, color: '#4285F4' },
  { path: 'sessions', label: '최근 세션', icon: Video, color: '#EA4335' },
  { path: 'team-members', label: 'Team Member 관리', icon: Users, color: '#34A853' },
  { path: 'gallery', label: '활동 갤러리', icon: Image, color: '#4285F4' },
  { path: 'inquiry', label: '1:1 문의 관리', icon: MessageSquare, color: '#EA4335' },
];

export default function TeamDashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          {headerLogo
            ? <img src={headerLogo} alt="GDGoC DEU" className="h-8 w-auto cursor-pointer" onClick={() => navigate('/')} />
            : <span className="font-['Montserrat',sans-serif] font-black text-base text-gray-900 cursor-pointer" onClick={() => navigate('/')}>GDGoC <span className="text-[#4285F4]">DEU</span></span>
          }
          <button
            className="lg:hidden text-gray-400 hover:text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="font-['Pretendard',sans-serif] text-xs text-gray-400 uppercase tracking-widest">
            콘텐츠 관리
          </p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.path);
            return (
              <NavLink
                key={item.path}
                to={`/team/dashboard/${item.path}`}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#4285F4]/8 text-[#4285F4]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-all"
                  style={{ backgroundColor: isActive ? item.color : '#F3F4F6' }}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
                </div>
                <span className={`font-['Pretendard',sans-serif] text-sm flex-1 ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
                {isActive && <ChevronRight size={14} className="text-[#4285F4]" />}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 transition-all"
          >
            <Home size={16} />
            <span className="font-['Pretendard',sans-serif] text-sm">메인 페이지</span>
          </button>
          <button
            onClick={() => navigate('/team/login')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-50 transition-all"
          >
            <LogOut size={16} />
            <span className="font-['Pretendard',sans-serif] text-sm">로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div>
              <h2 className="font-['Montserrat',sans-serif] font-bold text-base text-gray-900">
                GDGoC DEU 관리자 대시보드
              </h2>
              <p className="font-['Pretendard',sans-serif] text-xs text-gray-400 hidden sm:block">
                GDGoC DEU 콘텐츠 관리 시스템
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="font-['Pretendard',sans-serif] text-xs font-semibold text-gray-700">Team Member</p>
              <p className="font-['Pretendard',sans-serif] text-xs text-gray-400">운영진</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4285F4] to-[#1F86FB] flex items-center justify-center shadow-md">
              <span className="font-['Montserrat',sans-serif] font-bold text-xs text-white">TM</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
