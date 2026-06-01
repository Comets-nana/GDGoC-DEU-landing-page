import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ChevronDown, ChevronUp, Send, Clock, CheckCircle, Paperclip } from 'lucide-react';

type InquiryStatus = '미답변' | '답변 완료';

interface Inquiry {
  id: number;
  title: string;
  content: string;
  email: string;
  fileName: string;
  status: InquiryStatus;
  createdAt: string;
  reply: string;
}

const initialData: Inquiry[] = [
  {
    id: 1,
    title: '스터디 참여 방법이 궁금합니다',
    content: '안녕하세요! GDGoC DEU 스터디에 참여하고 싶은데, 어떻게 신청하면 되나요? 학년 제한이 있는지도 궁금합니다.',
    email: 'student1@deu.ac.kr',
    fileName: '학생증.jpg',
    status: '미답변',
    createdAt: '2025-03-15',
    reply: '',
  },
  {
    id: 2,
    title: '세션 발표 신청 문의',
    content: '다음 학기에 Flutter 관련 세션 발표를 하고 싶습니다. 신청 방법과 일정을 알고 싶습니다.',
    email: 'developer@example.com',
    fileName: '발표자료_초안.pdf',
    status: '답변 완료',
    createdAt: '2025-03-10',
    reply: '안녕하세요! 세션 발표 신청에 관심 가져주셔서 감사합니다. 다음 학기 세션은 3월 말에 공지될 예정이며, 공식 채널을 통해 신청 받을 예정입니다. 많은 관심 부탁드립니다!',
  },
];

export default function InquiryManagePage() {
  const [items, setItems] = useState<Inquiry[]>(initialData);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});

  const handleSendReply = (id: number) => {
    const reply = replyDrafts[id]?.trim();
    if (!reply) return;
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, status: '답변 완료', reply } : i)
    );
    setReplyDrafts(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Montserrat',sans-serif] font-black text-2xl text-gray-900">1:1 문의 관리</h1>
          <p className="font-['Pretendard',sans-serif] text-sm text-gray-500 mt-0.5">접수된 문의를 확인하고 답변을 작성합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-['Pretendard',sans-serif] text-xs px-3 py-1.5 rounded-full bg-red-50 text-red-500 font-semibold">
            미답변 {items.filter(i => i.status === '미답변').length}건
          </span>
          <span className="font-['Pretendard',sans-serif] text-xs px-3 py-1.5 rounded-full bg-green-50 text-green-600 font-semibold">
            답변 완료 {items.filter(i => i.status === '답변 완료').length}건
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const isExpanded = expandedId === item.id;
          return (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <button
                className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  item.status === '미답변' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  {item.status === '미답변'
                    ? <Clock size={15} className="text-red-500" />
                    : <CheckCircle size={15} className="text-green-600" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-semibold font-['Pretendard',sans-serif] px-2 py-0.5 rounded-full ${
                      item.status === '미답변' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'
                    }`}>
                      {item.status}
                    </span>
                    <span className="font-['Pretendard',sans-serif] text-xs text-gray-400">{item.createdAt}</span>
                  </div>
                  <p className="font-['Pretendard',sans-serif] font-semibold text-sm text-gray-900 truncate">{item.title}</p>
                  <p className="font-['Pretendard',sans-serif] text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Mail size={11} />{item.email}
                  </p>
                </div>
                {isExpanded ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
                      <div>
                        <p className="font-['Pretendard',sans-serif] text-xs font-semibold text-gray-500 mb-1.5">문의 내용</p>
                        <p className="font-['Pretendard',sans-serif] text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3 whitespace-pre-wrap">{item.content}</p>
                      </div>

                      {item.fileName && (
                        <div className="flex items-center gap-2 text-xs font-['Pretendard',sans-serif] text-[#4285F4]">
                          <Paperclip size={13} />
                          <span>{item.fileName}</span>
                        </div>
                      )}

                      {item.status === '답변 완료' && item.reply && (
                        <div>
                          <p className="font-['Pretendard',sans-serif] text-xs font-semibold text-green-600 mb-1.5">보낸 답변</p>
                          <p className="font-['Pretendard',sans-serif] text-sm text-gray-700 bg-green-50 rounded-xl px-4 py-3 whitespace-pre-wrap border border-green-100">{item.reply}</p>
                        </div>
                      )}

                      {item.status === '미답변' && (
                        <div>
                          <p className="font-['Pretendard',sans-serif] text-xs font-semibold text-gray-500 mb-1.5">답변 작성</p>
                          <textarea
                            value={replyDrafts[item.id] ?? ''}
                            onChange={e => setReplyDrafts(prev => ({ ...prev, [item.id]: e.target.value }))}
                            placeholder={`${item.email}로 회신될 답변을 작성하세요`}
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Pretendard',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all resize-none mb-3"
                          />
                          <motion.button
                            onClick={() => handleSendReply(item.id)}
                            disabled={!replyDrafts[item.id]?.trim()}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#4285F4] hover:bg-[#1F86FB] disabled:bg-gray-200 disabled:text-gray-400 text-white font-['Pretendard',sans-serif] font-semibold text-sm rounded-xl transition-all shadow-md disabled:shadow-none"
                            whileHover={{ scale: replyDrafts[item.id]?.trim() ? 1.02 : 1 }}
                            whileTap={{ scale: replyDrafts[item.id]?.trim() ? 0.98 : 1 }}
                          >
                            <Send size={14} />
                            답변 보내기
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-16 text-gray-400 font-['Pretendard',sans-serif]">접수된 문의가 없습니다.</div>
        )}
      </div>
    </motion.div>
  );
}
