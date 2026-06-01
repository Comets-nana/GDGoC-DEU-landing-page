import { motion } from 'motion/react';
import { BookX, Home } from 'lucide-react';
import { useNavigate } from 'react-router';
import headerLogo from '../../assets/header_logo.png';

export default function StudyNotAvailablePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          {headerLogo
            ? <img src={headerLogo} alt="GDGoC DEU" className="h-8 md:h-10 w-auto cursor-pointer" onClick={() => navigate('/')} />
            : <span className="font-['Montserrat',sans-serif] font-black text-lg md:text-xl text-gray-900 cursor-pointer" onClick={() => navigate('/')}>GDGoC <span className="text-[#4285F4]">DEU</span></span>
          }
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pt-20">
        <motion.div
          className="max-w-2xl w-full text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#EA4335] to-[#C5392D] mb-6 md:mb-8 shadow-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <BookX size={48} className="text-white" />
          </motion.div>

          <motion.h1
            className="font-['Montserrat',sans-serif] font-black text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            No Page Provided
          </motion.h1>

          <motion.p
            className="font-['Pretendard',sans-serif] text-xl md:text-2xl lg:text-3xl text-gray-700 mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            해당 스터디는 별도의 페이지를 운영하지 않습니다
          </motion.p>

          <motion.p
            className="font-['Pretendard',sans-serif] text-base md:text-lg text-gray-600 mb-8 md:mb-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            현재 활동 중인 스터디이지만, 별도의 페이지를 제공하지 않고 있습니다.<br />
            스터디 관련 문의는 GDGoC DEU 운영진에게 연락해주세요.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/')}
              className="bg-[#EA4335] hover:bg-[#C5392D] text-white font-['Montserrat',sans-serif] font-bold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={20} />
              메인 페이지로 돌아가기
            </motion.button>

            <motion.button
              onClick={() => navigate(-1)}
              className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 font-['Pretendard',sans-serif] font-medium text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              이전 페이지로
            </motion.button>
          </motion.div>

          <div className="absolute top-1/4 left-0 w-32 h-32 rounded-full bg-gradient-to-br from-[#4285F4]/20 to-[#1F86FB]/10 blur-3xl -z-10" />
          <div className="absolute bottom-1/4 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-[#FBBC05]/20 to-[#FFD700]/10 blur-3xl -z-10" />
        </motion.div>
      </main>
    </div>
  );
}
