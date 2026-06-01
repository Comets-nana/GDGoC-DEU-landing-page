import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Mail, FileText, Paperclip, Send, CheckCircle, Loader2, Home, X } from 'lucide-react';
import headerLogo from '../../assets/header_logo.png';

type SubmitState = 'form' | 'sending' | 'done';

export default function ContactPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitState, setSubmitState] = useState<SubmitState>('form');
  const [form, setForm] = useState({
    title: '',
    content: '',
    email: '',
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => {
        const existing = prev.map(f => f.name);
        return [...prev, ...newFiles.filter(f => !existing.includes(f.name))];
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (name: string) => setFiles(prev => prev.filter(f => f.name !== name));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('sending');
  };

  useEffect(() => {
    if (submitState === 'sending') {
      const timer = setTimeout(() => setSubmitState('done'), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitState]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
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

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <AnimatePresence mode="wait">
          {submitState === 'form' && (
            <motion.div
              key="form"
              className="w-full max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4285F4] to-[#1F86FB] mb-4 shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <Mail size={28} className="text-white" />
                </motion.div>
                <h1 className="font-['Montserrat',sans-serif] font-black text-2xl md:text-3xl text-gray-900 mb-1">
                  1:1 Contact
                </h1>
                <p className="font-['Pretendard',sans-serif] text-sm text-gray-500">
                  GDGoC DEU 운영진에게 문의하세요
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 space-y-5">
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <FileText size={14} />문의 제목 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="문의 제목을 입력해주세요"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-['Pretendard',sans-serif] text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40 focus:border-[#4285F4] transition-all"
                  />
                </div>

                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <Mail size={14} />회신받을 이메일 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="example@email.com"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-['Pretendard',sans-serif] text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40 focus:border-[#4285F4] transition-all"
                  />
                </div>

                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">
                    문의 내용 <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    placeholder="문의 내용을 자세히 입력해주세요"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-['Pretendard',sans-serif] text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40 focus:border-[#4285F4] transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <Paperclip size={14} />첨부 파일 <span className="text-gray-400 font-normal">(선택)</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full px-4 py-3 bg-gray-50 border border-dashed rounded-xl font-['Pretendard',sans-serif] text-sm text-gray-400 cursor-pointer hover:bg-gray-100 hover:border-[#4285F4] transition-all flex items-center gap-2 ${files.length === 0 ? 'border-gray-200' : 'border-[#4285F4]/40'}`}
                  >
                    <Paperclip size={14} className="shrink-0" />
                    <span>파일을 선택하거나 클릭하여 업로드하세요 (여러 개 가능)</span>
                  </div>
                  {files.length > 0 && (
                    <ul className="mt-2 space-y-1.5">
                      {files.map(f => (
                        <li key={f.name} className="flex items-center gap-2 px-3 py-2 bg-[#4285F4]/5 rounded-lg">
                          <Paperclip size={12} className="text-[#4285F4] shrink-0" />
                          <span className="font-['Pretendard',sans-serif] text-xs text-gray-700 flex-1 truncate">{f.name}</span>
                          <span className="font-['Pretendard',sans-serif] text-xs text-gray-400 shrink-0">
                            {(f.size / 1024).toFixed(0)} KB
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(f.name)}
                            className="text-gray-400 hover:text-red-400 transition-colors shrink-0"
                          >
                            <X size={13} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4285F4] to-[#1F86FB] text-white font-['Montserrat',sans-serif] font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all mt-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} />
                  문의 제출하기
                </motion.button>
              </form>
            </motion.div>
          )}

          {(submitState === 'sending' || submitState === 'done') && (
            <motion.div
              key="result"
              className="w-full max-w-md text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {submitState === 'sending' ? (
                  <motion.div
                    key="sending"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#4285F4] to-[#1F86FB] mb-6 shadow-2xl">
                      <Loader2 size={40} className="text-white animate-spin" />
                    </div>
                    <h2 className="font-['Montserrat',sans-serif] font-black text-2xl md:text-3xl text-gray-900 mb-3">
                      Sending...
                    </h2>
                    <p className="font-['Pretendard',sans-serif] text-lg text-gray-700 mb-2">
                      문의 글이 운영진에게 전달 중입니다
                    </p>
                    <p className="font-['Pretendard',sans-serif] text-sm text-gray-400">
                      잠시만 기다려주세요
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#34A853] to-[#2D9448] mb-6 shadow-2xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle size={40} className="text-white" />
                    </motion.div>
                    <h2 className="font-['Montserrat',sans-serif] font-black text-2xl md:text-3xl text-gray-900 mb-3">
                      Sent!
                    </h2>
                    <p className="font-['Pretendard',sans-serif] text-lg text-gray-700 mb-2">
                      문의 글이 전달되었습니다
                    </p>
                    <p className="font-['Pretendard',sans-serif] text-sm text-gray-400 mb-8">
                      입력해주신 이메일을 통해 빠른 시일 내 답변을 드리도록 하겠습니다
                    </p>
                    <motion.button
                      onClick={() => navigate('/')}
                      className="bg-[#34A853] hover:bg-[#2D9448] text-white font-['Montserrat',sans-serif] font-bold px-8 py-3.5 rounded-full shadow-xl flex items-center justify-center gap-2 mx-auto transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Home size={18} />
                      메인 페이지로 돌아가기
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
