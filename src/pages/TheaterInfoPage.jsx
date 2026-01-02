import { useState } from "react";
import { useNavigate } from "react-router-dom";

import WaitingModal from "@components/WaitingModal";
import Card from "@components/Card";

import poster_portrait from "@assets/poster_portrait.jpeg";
import poster_landscape from "@assets/poster_landscape.jpeg";
import movieInfo from "@data/movieInfo";

export default function TheaterInfoPage() {
  const navigate = useNavigate();
  const [isWaiting, setIsWaiting] = useState(false);

  const handleReserveClick = () => {
    setIsWaiting(true);
  };

  const handleWaitingComplete = async () => {
    setIsWaiting(false);
    navigate("/reservation");
  };

  const priceNumber = parseInt(movieInfo.price.replace(/,/g, ''));

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-6 px-4">
      {/* 헤더 */}
      <header className="max-w-4xl mx-auto mb-4 px-2">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <span className="text-[var(--color-primary)] font-semibold">공연정보</span>
        </nav>
      </header>

      <Card>
        {/* 포스터 히어로 영역 */}
        <div className="relative h-72 md:h-80 overflow-hidden">
          <picture>
            <source media="(max-width: 768px)" srcSet={poster_landscape} />
            <img
              src={poster_portrait}
              alt="포스터"
              className="w-full h-full object-cover"
            />
          </picture>
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* 타이틀 */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-flex px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs text-white mb-3">
              {movieInfo.genre}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
              {movieInfo.title}
            </h1>
            <p className="text-sm text-white/70">{movieInfo.en}</p>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="p-8">
          {/* 메타 정보 그리드 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <InfoCard label="기간" value={movieInfo.dates.join(" - ")} />
            <InfoCard label="장소" value={movieInfo.venue} />
            <InfoCard label="러닝타임" value={movieInfo.duration} />
          </div>

          {/* 줄거리 */}
          <section className="mb-8">
            <h3 className="text-base font-bold text-[var(--color-text)] mb-3">줄거리</h3>
            <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
              {movieInfo.logline}
            </p>
          </section>

          {/* 출연/연출 */}
          <section className="mb-8">
            <h3 className="text-base font-bold text-[var(--color-text)] mb-3">출연 · 연출</h3>
            <div className="flex flex-wrap gap-2">
              {movieInfo.actress?.map((name, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-[var(--color-border-light)] rounded-full text-sm text-[var(--color-text)]"
                >
                  {name}
                </span>
              ))}
              <span className="px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm text-[var(--color-primary)] font-medium">
                연출 {movieInfo.director}
              </span>
            </div>
          </section>

          {/* 안내 박스 */}
          <div className="p-5 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/15 rounded-2xl mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center text-xl">
                🛡️
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">보안 예매 시스템</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  자동 예매 방지(CAPTCHA)가 적용된 상품입니다
                </p>
              </div>
            </div>
          </div>

          {/* 가격 & 버튼 */}
          <div className="flex items-center justify-between p-6 bg-[var(--color-border-light)] rounded-2xl">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">가격</p>
              <p className="text-2xl font-bold text-[var(--color-text)]">
                ₩{priceNumber.toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleReserveClick}
              className="px-10 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white font-bold rounded-2xl shadow-[0_8px_24px_rgba(99,102,241,0.4)] hover:shadow-[0_12px_32px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all duration-200"
            >
              예매하기
            </button>
          </div>
        </div>
      </Card>

      {isWaiting && <WaitingModal onComplete={handleWaitingComplete} />}
    </main>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="p-4 bg-[var(--color-border-light)] rounded-2xl">
      <p className="text-xs text-[var(--color-text-muted)] mb-1">{label}</p>
      <p className="text-sm font-semibold text-[var(--color-text)] truncate">{value}</p>
    </div>
  );
}
