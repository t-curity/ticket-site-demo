import { useEffect, useRef, useState } from "react";

const INITIAL_WAITING_COUNT = 127;

export default function WaitingModal({ onComplete }) {
  const [waitingCount, setWaitingCount] = useState(INITIAL_WAITING_COUNT);
  const completedRef = useRef(false);

  const progress = ((INITIAL_WAITING_COUNT - waitingCount) / INITIAL_WAITING_COUNT) * 100;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const intervalTime = 30;
    const decrement = (INITIAL_WAITING_COUNT * intervalTime) / 2000;
    const interval = setInterval(() => {
      setWaitingCount((count) => Math.max(count - decrement, 0));
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (waitingCount <= 0 && !completedRef.current) {
      completedRef.current = true;
      setTimeout(() => onComplete?.(), 300);
    }
  }, [waitingCount, onComplete]);

  // SVG 원형 프로그레스 계산
  const circumference = 2 * Math.PI * 32;
  const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      {/* 배경 블러 */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" />

      {/* 모달 */}
      <div className="relative bg-white p-10 rounded-[28px] text-center max-w-[340px] w-full shadow-[0_24px_64px_rgba(0,0,0,0.2)]">
        {/* 원형 프로그레스 */}
        <div className="relative w-[72px] h-[72px] mx-auto mb-6">
          <svg 
            width="72" 
            height="72" 
            viewBox="0 0 72 72" 
            className="-rotate-90"
          >
            {/* 배경 원 */}
            <circle
              cx="36"
              cy="36"
              r="32"
              fill="none"
              stroke="var(--color-border-light)"
              strokeWidth="4"
            />
            {/* 프로그레스 원 */}
            <circle
              cx="36"
              cy="36"
              r="32"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              className="transition-all duration-100"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-primary-light)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* 퍼센트 표시 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-bold text-[var(--color-primary)]">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
          접속 대기 중
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          잠시만 기다려 주세요
        </p>

        {/* 대기 인원 표시 */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-border-light)] rounded-full">
          <span className="w-2 h-2 bg-[var(--color-success)] rounded-full animate-pulse" />
          <span className="text-sm text-[var(--color-text-secondary)]">
            대기{" "}
            <span className="font-bold text-[var(--color-text)]">
              {Math.ceil(waitingCount)}
            </span>
            명
          </span>
        </div>
      </div>
    </div>
  );
}
