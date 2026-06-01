import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Tag, Link as LinkIcon, Users, Calendar } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Semester {
  id: number;
  year: number;
  term: 1 | 2;
}

interface Study {
  id: number;
  semesterId: number;
  title: string;
  description: string;
  tags: string[];
  shareUrl: string;
  participants: number | null;
  recruitStart: string;
  recruitEnd: string | null;
  activityStart: string;
  activityEnd: string | null;
}

type StudyStatus = '모집 예정' | '모집중' | '모집 완료' | '진행중' | '종료';

// ─── Status Logic ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<StudyStatus, string> = {
  '모집 예정': 'bg-blue-100 text-blue-600',
  '모집중':    'bg-[#34A853]/10 text-[#34A853]',
  '모집 완료': 'bg-gray-100 text-gray-500',
  '진행중':    'bg-[#4285F4]/10 text-[#4285F4]',
  '종료':      'bg-gray-100 text-gray-400',
};

function getStatuses(study: Study): StudyStatus[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const rStart = new Date(study.recruitStart);
  const rEnd   = study.recruitEnd ? new Date(study.recruitEnd) : null;
  const aStart = new Date(study.activityStart);
  const aEnd   = study.activityEnd ? new Date(study.activityEnd) : null;

  const statuses: StudyStatus[] = [];
  if (today < rStart) statuses.push('모집 예정');
  if (today >= rStart && (rEnd === null || today <= rEnd)) statuses.push('모집중');
  if (rEnd !== null && today > rEnd && today < aStart) statuses.push('모집 완료');
  if (today >= aStart && (aEnd === null || today <= aEnd)) statuses.push('진행중');
  if (aEnd !== null && today > aEnd) statuses.push('종료');

  return statuses.length > 0 ? statuses : ['모집 예정'];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const YEAR_OPTIONS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 2 + i);
const semesterLabel = (s: Semester) => `${s.year}년 ${s.term}학기`;

// ─── Initial Data ─────────────────────────────────────────────────────────────

const initialSemesters: Semester[] = [
  { id: 1, year: 2024, term: 2 },
  { id: 2, year: 2025, term: 1 },
  { id: 3, year: 2025, term: 2 },
  { id: 4, year: 2026, term: 1 },
];

const initialStudies: Study[] = [
  {
    id: 1, semesterId: 4,
    title: 'Algorithm Study',
    description: '"백준·프로그래머스" 매주 3문제 이상 문제 풀이로 효율적인 접근 방법을 배우는 스터디',
    tags: ['Algorithm', 'Baekjoon', 'Programmers'],
    shareUrl: 'https://www.notion.so/gdsc-deu/ALGORITHM-32ce8617357a804fa860cebabb851480',
    participants: null,
    recruitStart: '2026-01-15', recruitEnd: '2026-02-20',
    activityStart: '2026-03-01', activityEnd: '2026-06-30',
  },
  {
    id: 2, semesterId: 4,
    title: 'Vibe Coding Project Study',
    description: 'AI 툴을 활용한 프로젝트 개발로 나만의 아이디어를 실제 서비스로 구현하는 스터디',
    tags: ['Vibe Coding', 'Project', 'Frontend', 'Backend'],
    shareUrl: 'https://www.notion.so/gdsc-deu/32ce8617357a8051a21cff8b806fc5ef',
    participants: null,
    recruitStart: '2026-01-15', recruitEnd: '2026-02-20',
    activityStart: '2026-03-01', activityEnd: '2026-06-30',
  },
  {
    id: 3, semesterId: 4,
    title: 'Writing Study',
    description: '한 달에 기술관련 글 최소 1개 발행을 목표로 하는 스터디',
    tags: ['Writing', 'Blog', 'tistory', 'velog'],
    shareUrl: 'https://www.notion.so/gdsc-deu/271e8617357a80d580d7d2a21914bc3a',
    participants: null,
    recruitStart: '2026-01-15', recruitEnd: '2026-02-20',
    activityStart: '2026-03-01', activityEnd: null,
  },
  {
    id: 4, semesterId: 3,
    title: 'Algorithm Study',
    description: '"백준 / 프로그래머스 알고리즘 문제 풀이"를 함께 공부하며 효율적인 접근 방법을 배우는 스터디',
    tags: ['Algorithm', 'Baekjoon', 'Programmers'],
    shareUrl: 'https://www.notion.so/gdsc-deu/Algorithm-278e8617357a80dc9e2ec94ea86d9b77',
    participants: null,
    recruitStart: '2025-08-20', recruitEnd: '2025-09-05',
    activityStart: '2025-09-10', activityEnd: '2025-12-20',
  },
  {
    id: 5, semesterId: 3,
    title: 'Java & Spring Backend Study',
    description: 'Spring Intermediate 스터디는 기존 스프링 지식에 더해 테스트 및 배포까지 탐구하는 스터디',
    tags: ['Java', 'Spring', 'Backend'],
    shareUrl: 'https://www.notion.so/gdsc-deu/Java-Spring-272e8617357a80459eede4df7d85da10',
    participants: null,
    recruitStart: '2025-08-20', recruitEnd: '2025-09-05',
    activityStart: '2025-09-10', activityEnd: '2025-12-20',
  },
  {
    id: 6, semesterId: 1,
    title: 'Web Frontend 스터디',
    description: '리액트 기초부터 Next.js 배포까지 학습하며 팀 프로젝트를 완성했습니다.',
    tags: ['React', 'TypeScript', 'Next.js'],
    shareUrl: 'https://github.com/GDG-on-Campus-DEU/HTML-To-React-24-25',
    participants: 8,
    recruitStart: '2024-08-20', recruitEnd: '2024-09-05',
    activityStart: '2024-09-10', activityEnd: '2024-12-20',
  },
];

// ─── Empty Form ───────────────────────────────────────────────────────────────

const emptyStudy: Omit<Study, 'id' | 'semesterId'> = {
  title: '', description: '', tags: [], shareUrl: '',
  participants: null,
  recruitStart: '', recruitEnd: null,
  activityStart: '', activityEnd: null,
};

// ─── Sub-component: SelectField ───────────────────────────────────────────────

function SelectField({ value, onChange, children, className = '' }: {
  value: string | number;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all pr-9 cursor-pointer">
        {children}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6" /></svg>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StudyManagePage() {
  const [semesters, setSemesters] = useState<Semester[]>(initialSemesters);
  const [studies, setStudies] = useState<Study[]>(initialStudies);
  const [selectedSemesterId, setSelectedSemesterId] = useState<number>(initialSemesters[initialSemesters.length - 1].id);

  // Study modal
  const [studyModal, setStudyModal] = useState<{ open: boolean; edit: Study | null }>({ open: false, edit: null });
  const [studyForm, setStudyForm] = useState<Omit<Study, 'id' | 'semesterId'>>(emptyStudy);
  const [tagInput, setTagInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Study | null>(null);

  // Semester modal
  const [semesterModal, setSemesterModal] = useState<{ open: boolean; edit: Semester | null }>({ open: false, edit: null });
  const [semesterForm, setSemesterForm] = useState<{ year: number; term: 1 | 2 }>({ year: new Date().getFullYear(), term: 1 });
  const [deleteSemesterTarget, setDeleteSemesterTarget] = useState<Semester | null>(null);

  // ── Derived ──
  const currentStudies = studies.filter(s => s.semesterId === selectedSemesterId);
  const selectedSemester = semesters.find(s => s.id === selectedSemesterId);

  // ── Study CRUD ──
  const openAdd = () => {
    setStudyForm(emptyStudy);
    setTagInput('');
    setStudyModal({ open: true, edit: null });
  };
  const openEdit = (study: Study) => {
    setStudyForm({
      title: study.title, description: study.description, tags: [...study.tags],
      shareUrl: study.shareUrl, participants: study.participants,
      recruitStart: study.recruitStart, recruitEnd: study.recruitEnd,
      activityStart: study.activityStart, activityEnd: study.activityEnd,
    });
    setTagInput('');
    setStudyModal({ open: true, edit: study });
  };
  const handleSave = () => {
    if (!studyForm.title.trim() || !studyForm.recruitStart || !studyForm.activityStart) return;
    if (studyForm.recruitEnd !== null && studyForm.recruitEnd === '') return;
    if (studyModal.edit) {
      setStudies(prev => prev.map(s => s.id === studyModal.edit!.id ? { ...studyModal.edit!, ...studyForm } : s));
    } else {
      setStudies(prev => [...prev, { ...studyForm, id: Date.now(), semesterId: selectedSemesterId }]);
    }
    setStudyModal({ open: false, edit: null });
  };
  const handleDelete = () => {
    if (!deleteTarget) return;
    setStudies(prev => prev.filter(s => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !studyForm.tags.includes(tag)) {
      setStudyForm(f => ({ ...f, tags: [...f.tags, tag] }));
    }
    setTagInput('');
  };
  const removeTag = (tag: string) => setStudyForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));

  // ── Semester CRUD ──
  const openAddSemester = () => {
    setSemesterForm({ year: new Date().getFullYear(), term: 1 });
    setSemesterModal({ open: true, edit: null });
  };
  const openEditSemester = (s: Semester) => {
    setSemesterForm({ year: s.year, term: s.term });
    setSemesterModal({ open: true, edit: s });
  };
  const saveSemester = () => {
    const duplicate = semesters.some(s =>
      s.year === semesterForm.year && s.term === semesterForm.term && s.id !== semesterModal.edit?.id
    );
    if (duplicate) return;
    if (semesterModal.edit) {
      setSemesters(prev => prev.map(s => s.id === semesterModal.edit!.id ? { ...s, ...semesterForm } : s));
    } else {
      const newId = Date.now();
      setSemesters(prev => [...prev, { id: newId, ...semesterForm }]);
      setSelectedSemesterId(newId);
    }
    setSemesterModal({ open: false, edit: null });
  };
  const deleteSemester = () => {
    if (!deleteSemesterTarget) return;
    const remaining = semesters.filter(s => s.id !== deleteSemesterTarget.id);
    setSemesters(remaining);
    setStudies(prev => prev.filter(s => s.semesterId !== deleteSemesterTarget.id));
    if (selectedSemesterId === deleteSemesterTarget.id)
      setSelectedSemesterId(remaining[remaining.length - 1]?.id ?? -1);
    setDeleteSemesterTarget(null);
  };

  const isDuplicateSemester = semesters.some(
    s => s.year === semesterForm.year && s.term === semesterForm.term && s.id !== semesterModal.edit?.id
  );

  // ── Validation ──
  const isDateOrderInvalid =
    studyForm.recruitEnd !== null && studyForm.recruitEnd !== '' &&
    studyForm.activityEnd !== null && studyForm.activityEnd !== '' &&
    studyForm.recruitEnd > studyForm.activityEnd;

  const isSaveDisabled =
    !studyForm.title.trim() ||
    !studyForm.recruitStart ||
    (studyForm.recruitEnd !== null && studyForm.recruitEnd === '') ||
    !studyForm.activityStart ||
    isDateOrderInvalid;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Montserrat',sans-serif] font-black text-2xl text-gray-900">스터디 관리</h1>
          <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mt-0.5">학기별 스터디를 등록·관리합니다.</p>
        </div>
        <motion.button onClick={openAdd}
          className="flex items-center gap-2 bg-[#4285F4] hover:bg-[#1F86FB] text-white font-['Pretendard',sans-serif] font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all"
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Plus size={16} /><span className="hidden sm:inline">스터디 추가</span>
        </motion.button>
      </div>

      {/* ── Semester Tabs ── */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {semesters.map(s => (
          <div key={s.id} className="relative group flex items-center">
            <button
              onClick={() => setSelectedSemesterId(s.id)}
              className={`px-4 py-2 rounded-xl font-['Pretendard',sans-serif] text-sm font-semibold transition-all ${
                selectedSemesterId === s.id
                  ? 'bg-[#4285F4] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#4285F4]/50'
              }`}
            >
              {semesterLabel(s)}
            </button>
            <div className="absolute -top-1 -right-1 hidden group-hover:flex items-center gap-0.5 z-10">
              <button onClick={() => openEditSemester(s)} className="w-5 h-5 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Pencil size={9} />
              </button>
              <button onClick={() => setDeleteSemesterTarget(s)} className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                <Trash2 size={9} />
              </button>
            </div>
          </div>
        ))}
        <button onClick={openAddSemester}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 hover:border-[#4285F4] hover:text-[#4285F4] font-['Pretendard',sans-serif] text-sm font-semibold transition-all">
          <Plus size={14} />학기 추가
        </button>
      </div>

      {/* ── Study List ── */}
      <div className="grid gap-4">
        {currentStudies.map((study, i) => {
          const statuses = getStatuses(study);
          return (
            <motion.div key={study.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-start gap-4"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  {statuses.map(st => (
                    <span key={st} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-['Pretendard',sans-serif] ${STATUS_STYLES[st]}`}>{st}</span>
                  ))}
                  <h3 className="font-['Pretendard',sans-serif] font-bold text-base text-gray-900">{study.title}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 font-['Pretendard',sans-serif] mb-2">
                  <span className="flex items-center gap-1"><Calendar size={11} />모집 {study.recruitStart} ~ {study.recruitEnd ?? '무기한'}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} />활동 {study.activityStart} ~ {study.activityEnd ?? '무기한'}</span>
                  <span className="flex items-center gap-1"><Users size={11} />{study.participants === null ? '제한없음' : `${study.participants}명`}</span>
                  {study.shareUrl && (
                    <a href={study.shareUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#4285F4] hover:underline">
                      <LinkIcon size={11} />링크
                    </a>
                  )}
                </div>
                <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mb-2 line-clamp-1">{study.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {study.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#4285F4]/8 text-[#4285F4] text-xs font-['Pretendard',sans-serif]">
                      <Tag size={10} />{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(study)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all font-['Pretendard',sans-serif] text-sm">
                  <Pencil size={14} /><span className="hidden sm:inline">수정</span>
                </button>
                <button onClick={() => setDeleteTarget(study)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-all font-['Pretendard',sans-serif] text-sm">
                  <Trash2 size={14} /><span className="hidden sm:inline">삭제</span>
                </button>
              </div>
            </motion.div>
          );
        })}
        {currentStudies.length === 0 && (
          <div className="text-center py-16 text-gray-400 font-['Pretendard',sans-serif]">이 학기에 등록된 스터디가 없습니다.</div>
        )}
      </div>

      {/* ════════════════════════════════════════════════
          Modal: Add / Edit Study
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {studyModal.open && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setStudyModal({ open: false, edit: null })}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-['Montserrat',sans-serif] font-black text-xl text-gray-900">{studyModal.edit ? '스터디 수정' : '스터디 추가'}</h2>
                  {selectedSemester && <p className="font-['Pretendard',sans-serif] text-xs text-gray-400 mt-0.5">{semesterLabel(selectedSemester)}</p>}
                </div>
                <button onClick={() => setStudyModal({ open: false, edit: null })} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>

              <div className="space-y-4">

                {/* 스터디명 */}
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">
                    스터디명 <span className="text-red-400">*</span>
                  </label>
                  <input value={studyForm.title}
                    onChange={e => setStudyForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="스터디 이름"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all" />
                </div>

                {/* 설명 */}
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">설명</label>
                  <textarea value={studyForm.description}
                    onChange={e => setStudyForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="스터디 소개" rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all resize-none" />
                </div>

                {/* 모집 기간 */}
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar size={14} />모집 기간 <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-['Pretendard',sans-serif] text-xs text-gray-400 mb-1">시작일</p>
                      <input type="date" value={studyForm.recruitStart}
                        onChange={e => setStudyForm(f => ({ ...f, recruitStart: e.target.value }))}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all" />
                    </div>
                    <div>
                      <p className="font-['Pretendard',sans-serif] text-xs text-gray-400 mb-1">종료일</p>
                      <div className="flex items-center gap-2">
                        <input type="date"
                          value={studyForm.recruitEnd ?? ''}
                          onChange={e => setStudyForm(f => ({ ...f, recruitEnd: e.target.value || null }))}
                          disabled={studyForm.recruitEnd === null}
                          className={`flex-1 min-w-0 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all ${studyForm.recruitEnd === null ? 'opacity-40 cursor-not-allowed' : ''}`} />
                        <button type="button"
                          onClick={() => setStudyForm(f => ({ ...f, recruitEnd: f.recruitEnd === null ? '' : null }))}
                          title="무기한"
                          className={`shrink-0 w-10 h-10 rounded-xl border-2 font-bold text-base transition-all ${
                            studyForm.recruitEnd === null
                              ? 'border-[#4285F4] bg-[#4285F4] text-white'
                              : 'border-gray-200 bg-gray-50 text-gray-400 hover:border-[#4285F4]/50'
                          }`}>
                          ∞
                        </button>
                      </div>
                      {studyForm.recruitEnd === null && (
                        <p className="font-['Pretendard',sans-serif] text-xs text-[#4285F4] mt-1">무기한으로 설정됨</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 활동 기간 */}
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar size={14} />활동 기간 <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-['Pretendard',sans-serif] text-xs text-gray-400 mb-1">시작일</p>
                      <input type="date" value={studyForm.activityStart}
                        onChange={e => setStudyForm(f => ({ ...f, activityStart: e.target.value }))}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all" />
                    </div>
                    <div>
                      <p className="font-['Pretendard',sans-serif] text-xs text-gray-400 mb-1">종료일</p>
                      <div className="flex items-center gap-2">
                        <input type="date"
                          value={studyForm.activityEnd ?? ''}
                          onChange={e => setStudyForm(f => ({ ...f, activityEnd: e.target.value || null }))}
                          disabled={studyForm.activityEnd === null}
                          className={`flex-1 min-w-0 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all ${studyForm.activityEnd === null ? 'opacity-40 cursor-not-allowed' : ''}`} />
                        <button type="button"
                          onClick={() => setStudyForm(f => ({ ...f, activityEnd: f.activityEnd === null ? '' : null }))}
                          title="무기한"
                          className={`shrink-0 w-10 h-10 rounded-xl border-2 font-bold text-base transition-all ${
                            studyForm.activityEnd === null
                              ? 'border-[#4285F4] bg-[#4285F4] text-white'
                              : 'border-gray-200 bg-gray-50 text-gray-400 hover:border-[#4285F4]/50'
                          }`}>
                          ∞
                        </button>
                      </div>
                      {studyForm.activityEnd === null && (
                        <p className="font-['Pretendard',sans-serif] text-xs text-[#4285F4] mt-1">무기한으로 설정됨</p>
                      )}
                    </div>
                  </div>
                </div>

                {isDateOrderInvalid && (
                  <p className="font-['Pretendard',sans-serif] text-xs text-red-400 -mt-1 flex items-center gap-1">
                    ⚠ 모집 종료일이 활동 종료일보다 뒤에 있을 수 없습니다.
                  </p>
                )}

                {/* 참여 인원 */}
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <Users size={14} />참여 인원
                  </label>
                  <div className="flex gap-3">
                    <input type="number" min={0}
                      value={studyForm.participants === null ? '' : studyForm.participants}
                      onChange={e => setStudyForm(f => ({ ...f, participants: e.target.value === '' ? null : Number(e.target.value) }))}
                      placeholder="인원 수"
                      disabled={studyForm.participants === null}
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all disabled:opacity-40 disabled:cursor-not-allowed" />
                    <button type="button"
                      onClick={() => setStudyForm(f => ({ ...f, participants: f.participants === null ? 0 : null }))}
                      className={`px-4 py-2.5 rounded-xl border-2 font-['Pretendard',sans-serif] text-sm font-semibold transition-all whitespace-nowrap ${
                        studyForm.participants === null
                          ? 'border-[#4285F4] bg-[#4285F4] text-white'
                          : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-[#4285F4]/50'
                      }`}>
                      제한없음
                    </button>
                  </div>
                </div>

                {/* 태그 */}
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <Tag size={14} />태그
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={e => { setIsComposing(false); setTagInput((e.target as HTMLInputElement).value); }}
                      onKeyDown={e => { if (e.key === 'Enter' && !isComposing) { e.preventDefault(); addTag(); } }}
                      placeholder="태그 입력 후 Enter"
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all" />
                    <button onClick={addTag} className="px-3 py-2.5 bg-[#4285F4] text-white rounded-xl hover:bg-[#1F86FB] transition-all">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {studyForm.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#4285F4]/10 text-[#4285F4] text-xs font-['Pretendard',sans-serif]">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors"><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 스터디 공유 링크 */}
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <LinkIcon size={14} />스터디 공유 링크(URL) <span className="font-normal text-gray-400">(선택)</span>
                  </label>
                  <input value={studyForm.shareUrl}
                    onChange={e => setStudyForm(f => ({ ...f, shareUrl: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all" />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStudyModal({ open: false, edit: null })}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <motion.button onClick={handleSave} disabled={isSaveDisabled}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#1F86FB] disabled:from-gray-300 disabled:to-gray-300 text-white font-['Pretendard',sans-serif] font-semibold shadow-md disabled:shadow-none transition-all"
                  whileHover={{ scale: isSaveDisabled ? 1 : 1.02 }} whileTap={{ scale: isSaveDisabled ? 1 : 0.98 }}>
                  {studyModal.edit ? '저장' : '추가'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════
          Modal: Add / Edit Semester
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {semesterModal.open && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setSemesterModal({ open: false, edit: null })}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-['Montserrat',sans-serif] font-black text-xl text-gray-900">{semesterModal.edit ? '학기 수정' : '학기 추가'}</h2>
                <button onClick={() => setSemesterModal({ open: false, edit: null })} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-2 block">학기 선택</label>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <SelectField value={semesterForm.year} onChange={v => setSemesterForm(f => ({ ...f, year: Number(v) }))}>
                  {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}년</option>)}
                </SelectField>
                <SelectField value={semesterForm.term} onChange={v => setSemesterForm(f => ({ ...f, term: Number(v) as 1 | 2 }))}>
                  <option value={1}>1학기</option>
                  <option value={2}>2학기</option>
                </SelectField>
              </div>
              {isDuplicateSemester && (
                <p className="font-['Pretendard',sans-serif] text-xs text-red-400 mb-3">이미 등록된 학기입니다.</p>
              )}
              <div className="flex gap-3 mt-5">
                <button onClick={() => setSemesterModal({ open: false, edit: null })}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <motion.button onClick={saveSemester} disabled={isDuplicateSemester}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#1F86FB] disabled:from-gray-300 disabled:to-gray-300 text-white font-['Pretendard',sans-serif] font-semibold shadow-md disabled:shadow-none transition-all"
                  whileHover={{ scale: isDuplicateSemester ? 1 : 1.02 }} whileTap={{ scale: isDuplicateSemester ? 1 : 0.98 }}>
                  {semesterModal.edit ? '저장' : '추가'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════ Confirm: Delete Study ════════ */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500" /></div>
              <h3 className="font-['Montserrat',sans-serif] font-black text-lg text-gray-900 mb-2">삭제 확인</h3>
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mb-6">
                <span className="font-semibold text-gray-700">"{deleteTarget.title}"</span>을 삭제하시겠습니까?
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <button onClick={handleDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-['Pretendard',sans-serif] font-semibold transition-all">삭제</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════ Confirm: Delete Semester ════════ */}
      <AnimatePresence>
        {deleteSemesterTarget && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500" /></div>
              <h3 className="font-['Montserrat',sans-serif] font-black text-lg text-gray-900 mb-2">학기 삭제</h3>
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">"{semesterLabel(deleteSemesterTarget)}"</span>을 삭제하시겠습니까?
              </p>
              <p className="font-['Pretendard',sans-serif] text-xs text-red-400 mb-6">해당 학기의 스터디 데이터가 모두 삭제됩니다.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteSemesterTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <button onClick={deleteSemester}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-['Pretendard',sans-serif] font-semibold transition-all">삭제</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
