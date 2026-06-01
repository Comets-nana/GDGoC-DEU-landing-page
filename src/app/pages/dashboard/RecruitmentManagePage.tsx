import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Tag, Link as LinkIcon, ToggleLeft, ToggleRight } from 'lucide-react';

type RecruitmentStatus = '모집중' | '마감';

interface Recruitment {
  id: number;
  title: string;
  description: string;
  status: RecruitmentStatus;
  tags: string[];
  link: string;
}

const initialData: Recruitment[] = [
  {
    id: 1,
    title: 'Web Frontend 스터디',
    description: 'React, TypeScript를 중심으로 프론트엔드 기술 스택을 함께 학습합니다.',
    status: '모집중',
    tags: ['React', 'TypeScript', 'Tailwind'],
    link: 'https://forms.gle/example',
  },
  {
    id: 2,
    title: 'AI/ML 스터디',
    description: 'Python과 PyTorch를 활용한 머신러닝 기초부터 실전까지 다룹니다.',
    status: '마감',
    tags: ['Python', 'PyTorch', 'ML'],
    link: 'https://forms.gle/example2',
  },
  {
    id: 3,
    title: 'Android 앱 개발 스터디',
    description: 'Kotlin으로 안드로이드 앱을 처음부터 만들어봅니다.',
    status: '모집중',
    tags: ['Kotlin', 'Android', 'Jetpack'],
    link: 'https://forms.gle/example3',
  },
];

const emptyForm: Omit<Recruitment, 'id'> = {
  title: '',
  description: '',
  status: '모집중',
  tags: [],
  link: '',
};

export default function RecruitmentManagePage() {
  const [items, setItems] = useState<Recruitment[]>(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Recruitment | null>(null);
  const [form, setForm] = useState<Omit<Recruitment, 'id'>>(emptyForm);
  const [tagInput, setTagInput] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Recruitment | null>(null);

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setTagInput('');
    setShowModal(true);
  };

  const openEdit = (item: Recruitment) => {
    setEditTarget(item);
    setForm({ title: item.title, description: item.description, status: item.status, tags: [...item.tags], link: item.link });
    setTagInput('');
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editTarget) {
      setItems(prev => prev.map(i => i.id === editTarget.id ? { ...editTarget, ...form } : i));
    } else {
      setItems(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setItems(prev => prev.filter(i => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm(f => ({ ...f, tags: [...f.tags, tag] }));
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Montserrat',sans-serif] font-black text-2xl text-gray-900">스터디 모집</h1>
          <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mt-0.5">랜딩 페이지에 표시될 스터디 모집 항목을 관리합니다.</p>
        </div>
        <motion.button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#4285F4] hover:bg-[#1F86FB] text-white font-['Pretendard',sans-serif] font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus size={16} />
          <span className="hidden sm:inline">스터디 추가</span>
        </motion.button>
      </div>

      {/* Cards */}
      <div className="grid gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-start gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-['Pretendard',sans-serif] ${
                  item.status === '모집중'
                    ? 'bg-[#34A853]/10 text-[#34A853]'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {item.status}
                </span>
                <h3 className="font-['Pretendard',sans-serif] font-bold text-base text-gray-900">{item.title}</h3>
              </div>
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#4285F4]/8 text-[#4285F4] text-xs font-['Pretendard',sans-serif]">
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => openEdit(item)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all font-['Pretendard',sans-serif] text-sm"
              >
                <Pencil size={14} />
                <span className="hidden sm:inline">수정</span>
              </button>
              <button
                onClick={() => setDeleteTarget(item)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-all font-['Pretendard',sans-serif] text-sm"
              >
                <Trash2 size={14} />
                <span className="hidden sm:inline">삭제</span>
              </button>
            </div>
          </motion.div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-16 text-gray-400 font-['Pretendard',sans-serif]">
            등록된 스터디 모집이 없습니다.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
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
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Montserrat',sans-serif] font-black text-xl text-gray-900">
                  {editTarget ? '스터디 수정' : '스터디 추가'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">스터디명</label>
                  <input
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="스터디 이름"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all"
                  />
                </div>

                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">설명</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="스터디 설명"
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">모집 상태</label>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, status: f.status === '모집중' ? '마감' : '모집중' }))}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all font-['Pretendard',sans-serif] text-sm font-semibold ${
                      form.status === '모집중'
                        ? 'border-[#34A853] bg-[#34A853]/10 text-[#34A853]'
                        : 'border-gray-200 bg-gray-50 text-gray-500'
                    }`}
                  >
                    {form.status === '모집중' ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                    {form.status}
                  </button>
                </div>

                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">태그</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="태그 입력 후 Enter"
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all"
                    />
                    <button onClick={addTag} className="px-3 py-2.5 bg-[#4285F4] text-white rounded-xl hover:bg-[#1F86FB] transition-all">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#4285F4]/10 text-[#4285F4] text-xs font-['Pretendard',sans-serif]">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <LinkIcon size={14} /> 신청 링크
                  </label>
                  <input
                    value={form.link}
                    onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
                    placeholder="https://forms.gle/..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all"
                >
                  취소
                </button>
                <motion.button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#1F86FB] text-white font-['Pretendard',sans-serif] font-semibold shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editTarget ? '저장' : '추가'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={22} className="text-red-500" />
              </div>
              <h3 className="font-['Montserrat',sans-serif] font-black text-lg text-gray-900 mb-2">삭제 확인</h3>
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mb-6">
                <span className="font-semibold text-gray-700">"{deleteTarget.title}"</span>을 삭제하시겠습니까?<br />
                이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-['Pretendard',sans-serif] font-semibold transition-all"
                >
                  삭제
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
