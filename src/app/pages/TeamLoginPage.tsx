import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router';
import headerLogo from '../../assets/header_logo.png';

export default function TeamLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/team/dashboard');
  };

  const handleGoogleLogin = () => {
    navigate('/team/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-gray-100 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#4285F4]/10 to-[#1F86FB]/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#EA4335]/10 to-[#FBBC05]/5 blur-3xl -z-10" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-[#34A853]/10 to-[#34A853]/5 blur-3xl -z-10" />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          {headerLogo
            ? <img src={headerLogo} alt="GDGoC DEU" className="h-8 md:h-10 w-auto cursor-pointer" onClick={() => navigate('/')} />
            : <span className="font-['Montserrat',sans-serif] font-black text-lg text-gray-900 cursor-pointer" onClick={() => navigate('/')}>GDGoC <span className="text-[#4285F4]">DEU</span></span>
          }
          <button
            onClick={() => navigate('/')}
            className="font-['Pretendard',sans-serif] text-sm text-gray-500 hover:text-[#4285F4] transition-colors"
          >
            메인 페이지로 돌아가기
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pt-20">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50">
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4285F4] to-[#1F86FB] mb-4 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <LogIn size={28} className="text-white" />
              </motion.div>
              <h1 className="font-['Montserrat',sans-serif] font-black text-2xl text-gray-900 mb-1">
                Team Member Login
              </h1>
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500">
                GDGoC DEU 운영진 전용 대시보드
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="font-['Pretendard',sans-serif] text-sm text-gray-700 mb-1.5 block">
                  아이디
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="아이디 입력"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-['Pretendard',sans-serif] text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40 focus:border-[#4285F4] transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-['Pretendard',sans-serif] text-sm text-gray-700 mb-1.5 block">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="비밀번호 입력"
                    className="w-full pl-10 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl font-['Pretendard',sans-serif] text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40 focus:border-[#4285F4] transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#4285F4] to-[#1F86FB] text-white font-['Montserrat',sans-serif] font-bold py-3.5 rounded-xl shadow-lg mt-2 flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogIn size={18} />
                로그인
              </motion.button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="font-['Pretendard',sans-serif] text-xs text-gray-400">또는</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <motion.button
              onClick={handleGoogleLogin}
              className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-['Pretendard',sans-serif] font-medium py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-3 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google 계정으로 로그인
            </motion.button>
          </div>

          <p className="text-center font-['Pretendard',sans-serif] text-xs text-gray-400 mt-6 mb-6">
            대시보드 계정이 없으신가요?{' '}
            <span className="text-[#4285F4] cursor-pointer hover:underline" onClick={() => navigate('/contact')}>관리자에게 문의하세요</span>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
