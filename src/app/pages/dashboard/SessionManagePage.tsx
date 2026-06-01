import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Calendar, User, Monitor, MapPin } from 'lucide-react';

type SessionType = '온라인' | '오프라인';

interface Session {
  id: number;
  title: string;
  speaker: string;
  date: string;
  type: SessionType;
  description: string;
  thumbnailUrl: string;
}

const initialData: Session[] = [
  {
    id: 1,
    title: 'Flutter로 크로스플랫폼 앱 개발하기',
    speaker: '김민준',
    date: '2025-03-15',
    type: '오프라인',
    description: 'Flutter의 기본 개념부터 실제 앱 배포까지 다루는 세션입니다.',
    thumbnailUrl: '',
  },
  {
    id: 2,
    title: 'Google Cloud로 서버리스 아키텍처 구축',
    speaker: '이서연',
    date: '2025-02-28',
    type: '온라인',
    description: 'Cloud Functions, Firebase를 활용한 실습 중심 세션입니다.',
    thumbnailUrl: '',
  },
  {
    id: 3,
    title: 'LLM을 활용한 AI 챗봇 만들기',
    speaker: '박지호',
    date: '2025-02-14',
    type: '오프라인',
    description: 'Gemini API를 활용해 챗봇 애플리케이션을 만드는 실습 세션.',
    thumbnailUrl: '',
  },
];

const emptyForm: Omit<Session, 'id'> = {
  title: '',
  speaker: '',
  date: '',
  type: '오프라인',
  description: '',
  thumbnailUrl: '',
};

export default function SessionManagePage() {
  const [items, setItems] = useState<Session[]>(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Session | null>(null);
  const [form, setForm] = useState<Omit<Session, 'id'>>(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<Session | null>(null);

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item: Session) => {
    setEditTarget(item);
    setForm({ title: item.title, speaker: item.speaker, date: item.date, type: item.type, description: item.description, thumbnailUrl: item.thumbnailUrl });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editTarget) {
      setItems(prev => prev.map(i => i.id === editTarget.id ? { ...editTarget, ...form } : i));
    } else {
      setItems(prev => [{ ...form, id: Date.now() }, ...prev]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setItems(prev => prev.filter(i => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Montserrat',sans-serif] font-black text-2xl text-gray-900">최근 세션</h1>
          <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mt-0.5">랜딩 페이지에 표시될 최근 세션 정보를 관리합니다.</p>
        </div>
        <motion.button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#EA4335] hover:bg-[#C5392D] text-white font-['Pretendard',sans-serif] font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus size={16} />
          <span className="hidden sm:inline">세션 추가</span>
        </motion.button>
      </div>

      <div className="grid gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-start gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            {/* Color block thumbnail */}
            <div className="w-full sm:w-20 h-14 sm:h-16 rounded-xl bg-gradient-to-br from-[#EA4335]/20 to-[#EA4335]/10 flex items-center justify-center shrink-0">
              <Monitor size={24} className="text-[#EA4335]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-['Pretendard',sans-serif] font-bold text-base text-gray-900 mb-1">{item.title}</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-['Pretendard',sans-serif] mb-2">
                <span className="flex items-center gap-1"><User size={11} />{item.speaker}</span>
                <span className="flex items-center gap-1"><Calendar size={11} />{item.date}</span>
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${
                  item.type === '온라인' ? 'bg-[#4285F4]/10 text-[#4285F4]' : 'bg-[#34A853]/10 text-[#34A853]'
                }`}>
                  {item.type === '온라인' ? <Monitor size={10} /> : <MapPin size={10} />}
                  {item.type}
                </span>
              </div>
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 line-clamp-1">{item.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => openEdit(item)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all font-['Pretendard',sans-serif] text-sm">
                <Pencil size={14} /><span className="hidden sm:inline">수정</span>
              </button>
              <button onClick={() => setDeleteTarget(item)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-all font-['Pretendard',sans-serif] text-sm">
                <Trash2 size={14} /><span className="hidden sm:inline">삭제</span>
              </button>
            </div>
          </motion.div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-16 text-gray-400 font-['Pretendard',sans-serif]">등록된 세션이 없습니다.</div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Montserrat',sans-serif] font-black text-xl text-gray-900">
                  {editTarget ? '세션 수정' : '세션 추가'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'title', label: '세션 제목', placeholder: '세션 제목 입력' },
                  { key: 'speaker', label: '발표자', placeholder: '발표자 이름' },
                  { key: 'date', label: '날짜', placeholder: '', type: 'date' },
                  { key: 'thumbnailUrl', label: '썸네일 URL (선택)', placeholder: 'https://...' },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">{label}</label>
                    <input
                      type={type ?? 'text'}
                      value={(form as Record<string, string>)[key] ?? ''}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#EA4335]/30 focus:border-[#EA4335] transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">세션 유형</label>
                  <div className="flex gap-3">
                    {(['오프라인', '온라인'] as SessionType[]).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, type: t }))}
                        className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-['Pretendard',sans-serif] font-semibold transition-all ${
                          form.type === t
                            ? t === '온라인' ? 'border-[#4285F4] bg-[#4285F4]/10 text-[#4285F4]' : 'border-[#34A853] bg-[#34A853]/10 text-[#34A853]'
                            : 'border-gray-200 text-gray-500'
                        }`}
                      >
                        {t === '온라인' ? <Monitor size={14} className="inline mr-1" /> : <MapPin size={14} className="inline mr-1" />}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">설명</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="세션 설명"
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#EA4335]/30 focus:border-[#EA4335] transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <motion.button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#EA4335] to-[#C5392D] text-white font-['Pretendard',sans-serif] font-semibold shadow-md" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {editTarget ? '저장' : '추가'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500" /></div>
              <h3 className="font-['Montserrat',sans-serif] font-black text-lg text-gray-900 mb-2">삭제 확인</h3>
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mb-6"><span className="font-semibold text-gray-700">"{deleteTarget.title}"</span>을 삭제하시겠습니까?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-['Pretendard',sans-serif] font-semibold transition-all">삭제</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
