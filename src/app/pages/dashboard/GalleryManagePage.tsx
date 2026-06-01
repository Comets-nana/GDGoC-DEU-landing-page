import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Calendar, ImageIcon, Link as LinkIcon } from 'lucide-react';

interface GalleryItem {
  id: number;
  imageUrl: string;
  eventName: string;
  date: string;
  description: string;
}

const initialData: GalleryItem[] = [
  { id: 1, imageUrl: '', eventName: '2024 DevFest Campus', date: '2024-11-20', description: 'GDGoC DEU DevFest Campus 행사 현장 사진입니다.' },
  { id: 2, imageUrl: '', eventName: '스터디 킥오프 미팅', date: '2024-03-08', description: '1학기 스터디 시작을 알리는 킥오프 미팅.' },
  { id: 3, imageUrl: '', eventName: 'Solution Challenge 팀 빌딩', date: '2024-02-17', description: 'Google Solution Challenge 참가팀 구성 모임.' },
  { id: 4, imageUrl: '', eventName: '종강 파티', date: '2023-12-22', description: '한 학기 동안 수고한 운영진 및 스터디원들과 함께한 종강 행사.' },
];

const emptyForm: Omit<GalleryItem, 'id'> = {
  imageUrl: '', eventName: '', date: '', description: '',
};

const PLACEHOLDER_GRADIENTS = [
  'from-[#4285F4]/20 to-[#1F86FB]/10',
  'from-[#EA4335]/20 to-[#C5392D]/10',
  'from-[#FBBC05]/20 to-[#E5AA00]/10',
  'from-[#34A853]/20 to-[#2D9448]/10',
];

export default function GalleryManagePage() {
  const [items, setItems] = useState<GalleryItem[]>(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<Omit<GalleryItem, 'id'>>(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);

  const openAdd = () => { setEditTarget(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (item: GalleryItem) => {
    setEditTarget(item);
    setForm({ imageUrl: item.imageUrl, eventName: item.eventName, date: item.date, description: item.description });
    setShowModal(true);
  };
  const handleSave = () => {
    if (!form.eventName.trim()) return;
    if (editTarget) setItems(prev => prev.map(i => i.id === editTarget.id ? { ...editTarget, ...form } : i));
    else setItems(prev => [{ ...form, id: Date.now() }, ...prev]);
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
          <h1 className="font-['Montserrat',sans-serif] font-black text-2xl text-gray-900">활동 갤러리</h1>
          <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mt-0.5">랜딩 페이지에 표시될 활동 사진 및 행사 기록을 관리합니다.</p>
        </div>
        <motion.button onClick={openAdd} className="flex items-center gap-2 bg-[#4285F4] hover:bg-[#1F86FB] text-white font-['Pretendard',sans-serif] font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Plus size={16} /><span className="hidden sm:inline">사진 추가</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            {/* Image area */}
            <div className={`relative h-44 bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length]} flex items-center justify-center overflow-hidden`}>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.eventName} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <ImageIcon size={32} />
                  <span className="font-['Pretendard',sans-serif] text-xs">이미지 없음</span>
                </div>
              )}
              {/* Action overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => openEdit(item)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-gray-700 transition-all font-['Pretendard',sans-serif] text-sm shadow-lg hover:bg-gray-50">
                  <Pencil size={14} />수정
                </button>
                <button onClick={() => setDeleteTarget(item)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500 text-white transition-all font-['Pretendard',sans-serif] text-sm shadow-lg hover:bg-red-600">
                  <Trash2 size={14} />삭제
                </button>
              </div>
            </div>
            {/* Info */}
            <div className="p-4">
              <h3 className="font-['Pretendard',sans-serif] font-bold text-sm text-gray-900 mb-1">{item.eventName}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-400 font-['Pretendard',sans-serif] mb-1.5">
                <Calendar size={11} />{item.date}
              </div>
              {item.description && (
                <p className="font-['Pretendard',sans-serif] text-xs text-gray-500 line-clamp-2">{item.description}</p>
              )}
            </div>
          </motion.div>
        ))}
        {items.length === 0 && <div className="col-span-full text-center py-16 text-gray-400 font-['Pretendard',sans-serif]">등록된 갤러리 항목이 없습니다.</div>}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Montserrat',sans-serif] font-black text-xl text-gray-900">{editTarget ? '갤러리 수정' : '사진 추가'}</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><LinkIcon size={14} />이미지 URL</label>
                  <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all" />
                  {form.imageUrl && (
                    <div className="mt-2 h-32 rounded-xl overflow-hidden bg-gray-100">
                      <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                  )}
                </div>
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">행사명</label>
                  <input value={form.eventName} onChange={e => setForm(f => ({ ...f, eventName: e.target.value }))} placeholder="행사 또는 활동명" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all" />
                </div>
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><Calendar size={13} />날짜</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all" />
                </div>
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">설명 (선택)</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="행사 또는 활동 설명" rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <motion.button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#1F86FB] text-white font-['Pretendard',sans-serif] font-semibold shadow-md" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{editTarget ? '저장' : '추가'}</motion.button>
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
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mb-6"><span className="font-semibold text-gray-700">"{deleteTarget.eventName}"</span> 항목을 삭제하시겠습니까?</p>
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
