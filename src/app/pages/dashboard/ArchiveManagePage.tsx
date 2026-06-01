import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Tag, Link as LinkIcon, Users } from 'lucide-react';

interface ArchiveItem {
  id: number;
  title: string;
  period: string;
  participants: number;
  tags: string[];
  resultUrl: string;
  description: string;
}

const initialData: ArchiveItem[] = [
  {
    id: 1,
    title: 'Web Frontend 스터디 2024 1기',
    period: '2024.03 ~ 2024.06',
    participants: 8,
    tags: ['React', 'TypeScript', 'Next.js'],
    resultUrl: 'https://github.com/example',
    description: '리액트 기초부터 Next.js 배포까지 학습하며 팀 프로젝트를 완성했습니다.',
  },
  {
    id: 2,
    title: 'AI/ML 스터디 2024 1기',
    period: '2024.03 ~ 2024.05',
    participants: 6,
    tags: ['Python', 'TensorFlow', 'Kaggle'],
    resultUrl: '',
    description: '머신러닝 기초를 익히고 Kaggle 대회에 참가했습니다.',
  },
  {
    id: 3,
    title: 'Flutter 앱 개발 스터디',
    period: '2023.09 ~ 2023.12',
    participants: 5,
    tags: ['Flutter', 'Dart', 'Firebase'],
    resultUrl: 'https://play.google.com/example',
    description: '플러터로 실제 앱을 개발하여 스토어 배포까지 진행했습니다.',
  },
];

const emptyForm: Omit<ArchiveItem, 'id'> = {
  title: '', period: '', participants: 0, tags: [], resultUrl: '', description: '',
};

export default function ArchiveManagePage() {
  const [items, setItems] = useState<ArchiveItem[]>(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<ArchiveItem | null>(null);
  const [form, setForm] = useState<Omit<ArchiveItem, 'id'>>(emptyForm);
  const [tagInput, setTagInput] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<ArchiveItem | null>(null);

  const openAdd = () => { setEditTarget(null); setForm(emptyForm); setTagInput(''); setShowModal(true); };
  const openEdit = (item: ArchiveItem) => {
    setEditTarget(item);
    setForm({ title: item.title, period: item.period, participants: item.participants, tags: [...item.tags], resultUrl: item.resultUrl, description: item.description });
    setTagInput('');
    setShowModal(true);
  };
  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editTarget) setItems(prev => prev.map(i => i.id === editTarget.id ? { ...editTarget, ...form } : i));
    else setItems(prev => [...prev, { ...form, id: Date.now() }]);
    setShowModal(false);
  };
  const handleDelete = () => {
    if (!deleteTarget) return;
    setItems(prev => prev.filter(i => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  };
  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) setForm(f => ({ ...f, tags: [...f.tags, tag] }));
    setTagInput('');
  };
  const removeTag = (tag: string) => setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Montserrat',sans-serif] font-black text-2xl text-gray-900">스터디 아카이브</h1>
          <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mt-0.5">종료된 스터디 기록을 아카이브로 관리합니다.</p>
        </div>
        <motion.button onClick={openAdd} className="flex items-center gap-2 bg-[#FBBC05] hover:bg-[#E5AA00] text-white font-['Pretendard',sans-serif] font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Plus size={16} /><span className="hidden sm:inline">아카이브 추가</span>
        </motion.button>
      </div>

      <div className="grid gap-4">
        {items.map((item, i) => (
          <motion.div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-start gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <div className="flex-1 min-w-0">
              <h3 className="font-['Pretendard',sans-serif] font-bold text-base text-gray-900 mb-1">{item.title}</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-['Pretendard',sans-serif] mb-2">
                <span className="bg-[#FBBC05]/10 text-[#FBBC05] px-2 py-0.5 rounded-full font-semibold">{item.period}</span>
                <span className="flex items-center gap-1"><Users size={11} />{item.participants}명</span>
                {item.resultUrl && (
                  <a href={item.resultUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#4285F4] hover:underline">
                    <LinkIcon size={11} />결과물
                  </a>
                )}
              </div>
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mb-2 line-clamp-1">{item.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#FBBC05]/10 text-[#9A7A00] text-xs font-['Pretendard',sans-serif]">
                    <Tag size={10} />{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => openEdit(item)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all font-['Pretendard',sans-serif] text-sm"><Pencil size={14} /><span className="hidden sm:inline">수정</span></button>
              <button onClick={() => setDeleteTarget(item)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-all font-['Pretendard',sans-serif] text-sm"><Trash2 size={14} /><span className="hidden sm:inline">삭제</span></button>
            </div>
          </motion.div>
        ))}
        {items.length === 0 && <div className="text-center py-16 text-gray-400 font-['Pretendard',sans-serif]">등록된 아카이브가 없습니다.</div>}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Montserrat',sans-serif] font-black text-xl text-gray-900">{editTarget ? '아카이브 수정' : '아카이브 추가'}</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">스터디명</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="스터디 이름" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#FBBC05]/40 focus:border-[#FBBC05] transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">활동 기간</label>
                    <input value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} placeholder="예: 2024.03 ~ 2024.06" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#FBBC05]/40 focus:border-[#FBBC05] transition-all" />
                  </div>
                  <div>
                    <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">참가 인원</label>
                    <input type="number" value={form.participants} onChange={e => setForm(f => ({ ...f, participants: Number(e.target.value) }))} placeholder="0" min={0} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#FBBC05]/40 focus:border-[#FBBC05] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">설명</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="스터디 소개" rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#FBBC05]/40 focus:border-[#FBBC05] transition-all resize-none" />
                </div>
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">태그</label>
                  <div className="flex gap-2 mb-2">
                    <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="태그 입력 후 Enter" className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#FBBC05]/40 focus:border-[#FBBC05] transition-all" />
                    <button onClick={addTag} className="px-3 py-2.5 bg-[#FBBC05] text-white rounded-xl hover:bg-[#E5AA00] transition-all"><Plus size={16} /></button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FBBC05]/10 text-[#9A7A00] text-xs font-['Pretendard',sans-serif]">
                        {tag}<button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors"><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><LinkIcon size={14} />결과물 링크 (선택)</label>
                  <input value={form.resultUrl} onChange={e => setForm(f => ({ ...f, resultUrl: e.target.value }))} placeholder="https://github.com/..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#FBBC05]/40 focus:border-[#FBBC05] transition-all" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <motion.button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FBBC05] to-[#E5AA00] text-white font-['Pretendard',sans-serif] font-semibold shadow-md" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{editTarget ? '저장' : '추가'}</motion.button>
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
