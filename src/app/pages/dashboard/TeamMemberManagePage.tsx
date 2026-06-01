import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Github, Instagram, Link as LinkIcon, Settings } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Semester {
  id: number;
  year: number;
  term: 1 | 2;
}

interface Team {
  id: number;
  semesterId: number;
  name: string;
  color: string;
}

interface TeamMember {
  id: number;
  semesterId: number;
  name: string;
  department: string;
  photoUrl: string;
  github: string;
  instagram: string;
  teamIds: number[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TEAM_COLORS = ['#4285F4', '#EA4335', '#34A853', '#FBBC05', '#9B59B6', '#3498DB', '#E91E63', '#FF5722'];
const YEAR_OPTIONS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 2 + i);

const semesterLabel = (s: Semester) => `${s.year}년 ${s.term}학기`;

// ─── Initial Data ─────────────────────────────────────────────────────────────

const initialSemesters: Semester[] = [
  { id: 1, year: 2024, term: 2 },
  { id: 2, year: 2025, term: 1 },
];

const initialTeams: Team[] = [
  { id: 1, semesterId: 1, name: 'Lead', color: '#4285F4' },
  { id: 2, semesterId: 1, name: 'Android', color: '#34A853' },
  { id: 3, semesterId: 1, name: 'Web', color: '#EA4335' },
  { id: 4, semesterId: 2, name: 'Lead', color: '#4285F4' },
  { id: 5, semesterId: 2, name: 'Android', color: '#34A853' },
  { id: 6, semesterId: 2, name: 'Web', color: '#EA4335' },
  { id: 7, semesterId: 2, name: 'AI/ML', color: '#FBBC05' },
];

const initialMembers: TeamMember[] = [
  { id: 1, semesterId: 2, name: '김나현', department: '컴퓨터소프트웨어공학과', photoUrl: '', github: 'Comets-nana', instagram: '', teamIds: [4] },
  { id: 2, semesterId: 2, name: '이준서', department: '컴퓨터소프트웨어공학과', photoUrl: '', github: 'junseo-dev', instagram: '', teamIds: [5] },
  { id: 3, semesterId: 2, name: '박소현', department: '정보통신공학과', photoUrl: '', github: 'sohyun-dev', instagram: '', teamIds: [6] },
  { id: 4, semesterId: 2, name: '최민재', department: '인공지능학과', photoUrl: '', github: 'minjae-ai', instagram: '', teamIds: [7] },
  { id: 5, semesterId: 1, name: '정유진', department: '컴퓨터소프트웨어공학과', photoUrl: '', github: 'yujin-dev', instagram: '', teamIds: [1, 3] },
  { id: 6, semesterId: 1, name: '한승우', department: '전자공학과', photoUrl: '', github: 'seungwoo-han', instagram: '', teamIds: [2] },
];

// ─── Empty Forms ──────────────────────────────────────────────────────────────

const emptyMember: Omit<TeamMember, 'id' | 'semesterId'> = {
  name: '', department: '', photoUrl: '', github: '', instagram: '', teamIds: [],
};
const emptyTeam: Omit<Team, 'id' | 'semesterId'> = { name: '', color: TEAM_COLORS[0] };

// ─── Sub-component ────────────────────────────────────────────────────────────

function TeamBadge({ team }: { team: Team }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-white text-xs font-['Montserrat',sans-serif] font-bold shadow-sm" style={{ backgroundColor: team.color }}>
      {team.name}
    </span>
  );
}

function SelectField({ value, onChange, children, className = '' }: {
  value: string | number;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#34A853]/30 focus:border-[#34A853] transition-all pr-9 cursor-pointer"
      >
        {children}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6" /></svg>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TeamMemberManagePage() {
  const [semesters, setSemesters] = useState<Semester[]>(initialSemesters);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  const [selectedSemesterId, setSelectedSemesterId] = useState<number>(initialSemesters[initialSemesters.length - 1].id);

  // Member modal
  const [memberModal, setMemberModal] = useState<{ open: boolean; edit: TeamMember | null }>({ open: false, edit: null });
  const [memberForm, setMemberForm] = useState<Omit<TeamMember, 'id' | 'semesterId'>>(emptyMember);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);

  // Semester modal
  const [semesterModal, setSemesterModal] = useState<{ open: boolean; edit: Semester | null }>({ open: false, edit: null });
  const [semesterForm, setSemesterForm] = useState<{ year: number; term: 1 | 2 }>({ year: new Date().getFullYear(), term: 1 });
  const [deleteSemesterTarget, setDeleteSemesterTarget] = useState<Semester | null>(null);

  // Team management modal
  const [teamMgmtOpen, setTeamMgmtOpen] = useState(false);
  const [teamForm, setTeamForm] = useState<Omit<Team, 'id' | 'semesterId'>>(emptyTeam);
  const [editTeam, setEditTeam] = useState<Team | null>(null);
  const [deleteTeamTarget, setDeleteTeamTarget] = useState<Team | null>(null);

  // ── Derived ──
  const currentMembers = members.filter(m => m.semesterId === selectedSemesterId);
  const currentTeams = teams.filter(t => t.semesterId === selectedSemesterId);
  const selectedSemester = semesters.find(s => s.id === selectedSemesterId);

  // ── Member CRUD ──
  const openAddMember = () => { setMemberForm(emptyMember); setMemberModal({ open: true, edit: null }); };
  const openEditMember = (m: TeamMember) => {
    setMemberForm({ name: m.name, department: m.department, photoUrl: m.photoUrl, github: m.github, instagram: m.instagram, teamIds: [...m.teamIds] });
    setMemberModal({ open: true, edit: m });
  };
  const saveMember = () => {
    if (!memberForm.name.trim()) return;
    if (memberModal.edit) {
      setMembers(prev => prev.map(m => m.id === memberModal.edit!.id ? { ...memberModal.edit!, ...memberForm } : m));
    } else {
      setMembers(prev => [...prev, { ...memberForm, id: Date.now(), semesterId: selectedSemesterId }]);
    }
    setMemberModal({ open: false, edit: null });
  };
  const deleteMember = () => {
    if (!deleteTarget) return;
    setMembers(prev => prev.filter(m => m.id !== deleteTarget.id));
    setDeleteTarget(null);
  };
  const toggleTeamId = (teamId: number) =>
    setMemberForm(f => ({
      ...f,
      teamIds: f.teamIds.includes(teamId) ? f.teamIds.filter(id => id !== teamId) : [...f.teamIds, teamId],
    }));

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
    setMembers(prev => prev.filter(m => m.semesterId !== deleteSemesterTarget.id));
    setTeams(prev => prev.filter(t => t.semesterId !== deleteSemesterTarget.id));
    if (selectedSemesterId === deleteSemesterTarget.id)
      setSelectedSemesterId(remaining[remaining.length - 1]?.id ?? -1);
    setDeleteSemesterTarget(null);
  };

  // ── Team CRUD (per semester) ──
  const openAddTeamFn = () => { setTeamForm(emptyTeam); setEditTeam(null); };
  const openEditTeamFn = (t: Team) => { setTeamForm({ name: t.name, color: t.color }); setEditTeam(t); };
  const saveTeam = () => {
    if (!teamForm.name.trim()) return;
    if (editTeam) {
      setTeams(prev => prev.map(t => t.id === editTeam.id ? { ...editTeam, ...teamForm } : t));
    } else {
      setTeams(prev => [...prev, { ...teamForm, id: Date.now(), semesterId: selectedSemesterId }]);
    }
    setEditTeam(null);
    setTeamForm(emptyTeam);
  };
  const deleteTeam = () => {
    if (!deleteTeamTarget) return;
    setTeams(prev => prev.filter(t => t.id !== deleteTeamTarget.id));
    setMembers(prev => prev.map(m => ({ ...m, teamIds: m.teamIds.filter(id => id !== deleteTeamTarget.id) })));
    setDeleteTeamTarget(null);
  };

  const getInitial = (name: string) => name.slice(0, 1);

  // ── Duplicate check for semester form ──
  const isDuplicateSemester = semesters.some(
    s => s.year === semesterForm.year && s.term === semesterForm.term && s.id !== semesterModal.edit?.id
  );

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Montserrat',sans-serif] font-black text-2xl text-gray-900">Team Member 관리</h1>
          <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mt-0.5">학기별 Team Member 정보를 관리합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => { openAddTeamFn(); setTeamMgmtOpen(true); }}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-['Pretendard',sans-serif] font-semibold px-4 py-2.5 rounded-xl transition-all"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            <Settings size={15} />
            <span className="hidden sm:inline">팀 관리</span>
          </motion.button>
          <motion.button
            onClick={openAddMember}
            className="flex items-center gap-2 bg-[#34A853] hover:bg-[#2D9448] text-white font-['Pretendard',sans-serif] font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            <Plus size={16} />
            <span className="hidden sm:inline">팀원 추가</span>
          </motion.button>
        </div>
      </div>

      {/* ── Semester Tabs ── */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {semesters.map(s => (
          <div key={s.id} className="relative group flex items-center">
            <button
              onClick={() => setSelectedSemesterId(s.id)}
              className={`px-4 py-2 rounded-xl font-['Pretendard',sans-serif] text-sm font-semibold transition-all ${
                selectedSemesterId === s.id
                  ? 'bg-[#34A853] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#34A853]/50'
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
        <button
          onClick={openAddSemester}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 hover:border-[#34A853] hover:text-[#34A853] font-['Pretendard',sans-serif] text-sm font-semibold transition-all"
        >
          <Plus size={14} />학기 추가
        </button>
      </div>

      {/* ── Current Semester's Team Chips ── */}
      {currentTeams.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-5 px-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <span className="font-['Pretendard',sans-serif] text-xs text-gray-400 font-semibold mr-1">이번 학기 팀</span>
          {currentTeams.map(t => <TeamBadge key={t.id} team={t} />)}
        </div>
      )}

      {/* ── Member Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentMembers.map((member, i) => {
          const memberTeams = currentTeams.filter(t => member.teamIds.includes(t.id));
          const firstColor = memberTeams[0]?.color ?? '#717182';
          return (
            <motion.div
              key={member.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center relative group"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            >
              <div className="relative mb-3">
                {member.photoUrl ? (
                  <img src={member.photoUrl} alt={member.name} className="w-16 h-16 rounded-2xl object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-['Montserrat',sans-serif] font-black shadow-md" style={{ background: `linear-gradient(135deg, ${firstColor}, ${firstColor}CC)` }}>
                    {getInitial(member.name)}
                  </div>
                )}
              </div>
              <h3 className="font-['Pretendard',sans-serif] font-bold text-base text-gray-900 mb-0.5">{member.name}</h3>
              <p className="font-['Pretendard',sans-serif] text-xs text-gray-500 mb-2 line-clamp-2">{member.department}</p>
              <div className="flex flex-wrap justify-center gap-1 mb-3 min-h-[22px]">
                {memberTeams.length > 0
                  ? memberTeams.map(t => <TeamBadge key={t.id} team={t} />)
                  : <span className="text-xs text-gray-300 font-['Pretendard',sans-serif]">팀 없음</span>}
              </div>
              <div className="flex items-center gap-2 mb-4">
                {member.github && (
                  <a href={`https://github.com/${member.github}`} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all">
                    <Github size={13} />
                  </a>
                )}
                {member.instagram && (
                  <a href={`https://instagram.com/${member.instagram}`} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-500 hover:text-white transition-all">
                    <Instagram size={13} />
                  </a>
                )}
                {!member.github && !member.instagram && <span className="text-xs text-gray-300 font-['Pretendard',sans-serif]">SNS 없음</span>}
              </div>
              <div className="flex gap-2 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEditMember(member)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all font-['Pretendard',sans-serif] text-xs"><Pencil size={12} />수정</button>
                <button onClick={() => setDeleteTarget(member)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-all font-['Pretendard',sans-serif] text-xs"><Trash2 size={12} />삭제</button>
              </div>
            </motion.div>
          );
        })}
        {currentMembers.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400 font-['Pretendard',sans-serif]">이 학기에 등록된 팀원이 없습니다.</div>
        )}
      </div>

      {/* ════════════════════════════════════════════════
          Modal: Add / Edit Member
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {memberModal.open && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.target === e.currentTarget && setMemberModal({ open: false, edit: null })}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-['Montserrat',sans-serif] font-black text-xl text-gray-900">{memberModal.edit ? '팀원 수정' : '팀원 추가'}</h2>
                  {selectedSemester && <p className="font-['Pretendard',sans-serif] text-xs text-gray-400 mt-0.5">{semesterLabel(selectedSemester)}</p>}
                </div>
                <button onClick={() => setMemberModal({ open: false, edit: null })} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">이름</label>
                    <input value={memberForm.name} onChange={e => setMemberForm(f => ({ ...f, name: e.target.value }))} placeholder="홍길동" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#34A853]/30 focus:border-[#34A853] transition-all" />
                  </div>
                  <div>
                    <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 block">학과</label>
                    <input value={memberForm.department} onChange={e => setMemberForm(f => ({ ...f, department: e.target.value }))} placeholder="컴퓨터소프트웨어공학과" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#34A853]/30 focus:border-[#34A853] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-2 block">소속 팀 <span className="font-normal text-gray-400">(복수 선택 가능)</span></label>
                  {currentTeams.length === 0 ? (
                    <p className="text-xs text-gray-400 font-['Pretendard',sans-serif]">이 학기에 등록된 팀이 없습니다. 팀 관리에서 먼저 추가해주세요.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {currentTeams.map(t => {
                        const selected = memberForm.teamIds.includes(t.id);
                        return (
                          <button key={t.id} type="button" onClick={() => toggleTeamId(t.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-['Montserrat',sans-serif] font-bold border-2 transition-all ${selected ? 'text-white border-transparent shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                            style={selected ? { backgroundColor: t.color, borderColor: t.color } : {}}
                          >
                            {t.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div>
                  <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><LinkIcon size={14} />프로필 사진 URL <span className="font-normal text-gray-400">(선택)</span></label>
                  <input value={memberForm.photoUrl} onChange={e => setMemberForm(f => ({ ...f, photoUrl: e.target.value }))} placeholder="https://..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#34A853]/30 focus:border-[#34A853] transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><Github size={13} />GitHub ID</label>
                    <input value={memberForm.github} onChange={e => setMemberForm(f => ({ ...f, github: e.target.value }))} placeholder="username" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#34A853]/30 focus:border-[#34A853] transition-all" />
                  </div>
                  <div>
                    <label className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><Instagram size={13} />Instagram ID</label>
                    <input value={memberForm.instagram} onChange={e => setMemberForm(f => ({ ...f, instagram: e.target.value }))} placeholder="username" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#34A853]/30 focus:border-[#34A853] transition-all" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setMemberModal({ open: false, edit: null })} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <motion.button onClick={saveMember} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#34A853] to-[#2D9448] text-white font-['Pretendard',sans-serif] font-semibold shadow-md" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {memberModal.edit ? '저장' : '추가'}
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
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.target === e.currentTarget && setSemesterModal({ open: false, edit: null })}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
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
                <button onClick={() => setSemesterModal({ open: false, edit: null })} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <motion.button onClick={saveSemester} disabled={isDuplicateSemester} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#34A853] to-[#2D9448] disabled:from-gray-300 disabled:to-gray-300 text-white font-['Pretendard',sans-serif] font-semibold shadow-md disabled:shadow-none transition-all" whileHover={{ scale: isDuplicateSemester ? 1 : 1.02 }} whileTap={{ scale: isDuplicateSemester ? 1 : 0.98 }}>
                  {semesterModal.edit ? '저장' : '추가'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════
          Modal: Team Management (per semester)
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {teamMgmtOpen && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.target === e.currentTarget && setTeamMgmtOpen(false)}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 max-h-[85vh] overflow-y-auto" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-['Montserrat',sans-serif] font-black text-xl text-gray-900">팀 관리</h2>
                <button onClick={() => setTeamMgmtOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              {selectedSemester && (
                <p className="font-['Pretendard',sans-serif] text-xs text-gray-400 mb-5">{semesterLabel(selectedSemester)} 적용</p>
              )}

              {/* Team list */}
              <div className="space-y-2 mb-5">
                {currentTeams.map(t => (
                  <div key={t.id} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                    <span className="font-['Pretendard',sans-serif] text-sm font-semibold text-gray-800 flex-1">{t.name}</span>
                    <button onClick={() => openEditTeamFn(t)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all"><Pencil size={13} /></button>
                    <button onClick={() => setDeleteTeamTarget(t)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-100 hover:text-red-500 transition-all"><Trash2 size={13} /></button>
                  </div>
                ))}
                {currentTeams.length === 0 && <p className="text-center text-sm text-gray-400 font-['Pretendard',sans-serif] py-4">이 학기에 등록된 팀이 없습니다.</p>}
              </div>

              {/* Add / Edit form */}
              <div className="border-t border-gray-100 pt-4">
                <p className="font-['Pretendard',sans-serif] text-xs font-semibold text-gray-500 mb-3">{editTeam ? '팀 수정' : '새 팀 추가'}</p>
                <input
                  value={teamForm.name}
                  onChange={e => setTeamForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="팀 이름"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#34A853]/30 focus:border-[#34A853] transition-all mb-3"
                />
                <div className="mb-4">
                  <p className="font-['Pretendard',sans-serif] text-xs text-gray-500 mb-2">팀 색상</p>
                  <div className="flex gap-2 flex-wrap">
                    {TEAM_COLORS.map(c => (
                      <button key={c} type="button" onClick={() => setTeamForm(f => ({ ...f, color: c }))}
                        className={`w-7 h-7 rounded-full transition-all ${teamForm.color === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  {editTeam && (
                    <button onClick={() => { setEditTeam(null); setTeamForm(emptyTeam); }} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold text-sm hover:bg-gray-50 transition-all">취소</button>
                  )}
                  <motion.button onClick={saveTeam} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#34A853] to-[#2D9448] text-white font-['Pretendard',sans-serif] font-semibold text-sm shadow-md" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {editTeam ? '수정 저장' : '팀 추가'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════ Confirm: Delete Member ════════ */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500" /></div>
              <h3 className="font-['Montserrat',sans-serif] font-black text-lg text-gray-900 mb-2">삭제 확인</h3>
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mb-6"><span className="font-semibold text-gray-700">"{deleteTarget.name}"</span>을 팀원에서 삭제하시겠습니까?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <button onClick={deleteMember} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-['Pretendard',sans-serif] font-semibold transition-all">삭제</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════ Confirm: Delete Semester ════════ */}
      <AnimatePresence>
        {deleteSemesterTarget && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500" /></div>
              <h3 className="font-['Montserrat',sans-serif] font-black text-lg text-gray-900 mb-2">학기 삭제</h3>
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mb-1"><span className="font-semibold text-gray-700">"{semesterLabel(deleteSemesterTarget)}"</span>을 삭제하시겠습니까?</p>
              <p className="font-['Pretendard',sans-serif] text-xs text-red-400 mb-6">해당 학기의 팀·팀원 데이터가 모두 삭제됩니다.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteSemesterTarget(null)} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <button onClick={deleteSemester} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-['Pretendard',sans-serif] font-semibold transition-all">삭제</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════ Confirm: Delete Team ════════ */}
      <AnimatePresence>
        {deleteTeamTarget && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500" /></div>
              <h3 className="font-['Montserrat',sans-serif] font-black text-lg text-gray-900 mb-2">팀 삭제</h3>
              <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mb-1"><span className="font-semibold text-gray-700">"{deleteTeamTarget.name}"</span> 팀을 삭제하시겠습니까?</p>
              <p className="font-['Pretendard',sans-serif] text-xs text-red-400 mb-6">이 팀에 배정된 팀원의 소속에서도 제거됩니다.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTeamTarget(null)} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-['Pretendard',sans-serif] font-semibold hover:bg-gray-50 transition-all">취소</button>
                <button onClick={deleteTeam} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-['Pretendard',sans-serif] font-semibold transition-all">삭제</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
