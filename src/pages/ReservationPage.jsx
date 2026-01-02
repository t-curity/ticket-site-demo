import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Card from "@components/Card";

import movieInfo from "@data/movieInfo";
import messages from "@data/messages";

export default function ReservationPage() {
  const { TCuritySDK } = window;

  const navigate = useNavigate();

  const [seats] = useState(() =>
    [...Array(9 * 8)].map(() => Math.random() > 0.75),
  );

  const [selectedSeats, setSelectedSeats] = useState([]);
  const pricePerSeat = parseInt(movieInfo.price.replace(/,/g, ''));
  const totalPaymentAmount = selectedSeats.length * pricePerSeat;

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const handleSeatClick = (index) => {
    if (seats[index]) return;
    setSelectedSeats(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getSeatLabel = (index) => {
    const row = rows[Math.floor(index / 9)];
    const col = (index % 9) + 1;
    return `${row}${col}`;
  };

  const handleChargeClick = () => {
    toast.error(messages.PAYMENT.NOT_IMPLEMENTED);
  };

  useEffect(() => {
    (async () => {
      try {
        const session_id = await TCuritySDK.captcha("mock-client-id");

        const verified = await ticketService.verify(session_id);
        if (!verified) {
          alert(messages.CAPTCHA.FAIL);
          navigate("/");
        }
      } catch (error) {
        if (
          error instanceof TCuritySDK.errors.InactivityTimeoutError ||
          error instanceof TCuritySDK.errors.UserCancelledError
        ) {
          navigate("/");
          return;
        }

        console.error(error);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-6 px-4">
      {/* 헤더 */}
      <header className="max-w-4xl mx-auto mb-4 px-2">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <span 
            onClick={() => navigate("/")} 
            className="cursor-pointer hover:text-[var(--color-text-secondary)] transition-colors"
          >
            공연정보
          </span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-[var(--color-primary)] font-semibold">좌석선택</span>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* 좌석 배치도 */}
        <Card className="flex-1 p-8">
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-6">좌석 선택</h2>
          
          {/* 무대 */}
          <div className="text-center mb-8">
            <div className="inline-block px-12 py-3 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary-light)]/10 rounded-full">
              <span className="text-sm font-semibold text-[var(--color-primary)] tracking-widest">
                STAGE
              </span>
            </div>
          </div>

          {/* 좌석 그리드 */}
          <div className="flex flex-col items-center gap-1.5 mb-8">
            {rows.map((row, rowIndex) => (
              <div key={row} className="flex items-center gap-1.5">
                <span className="w-5 text-xs text-[var(--color-text-muted)] text-center font-medium">
                  {row}
                </span>
                <div className="flex gap-1">
                  {[...Array(9)].map((_, colIndex) => {
                    const index = rowIndex * 9 + colIndex;
                    const isAisle = colIndex === 4;
                    const isOccupied = seats[index];
                    const isSelected = selectedSeats.includes(index);

                    if (isAisle) {
                      return <div key={colIndex} className="w-4" />;
                    }

                    return (
                      <button
                        key={colIndex}
                        onClick={() => handleSeatClick(index)}
                        disabled={isOccupied}
                        className={`
                          w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-150
                          ${isOccupied 
                            ? "bg-[var(--color-border-light)] text-[var(--color-text-muted)] cursor-not-allowed" 
                            : isSelected 
                              ? "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-[0_4px_12px_rgba(99,102,241,0.4)] scale-105" 
                              : "bg-white text-[var(--color-text-muted)] shadow-sm hover:shadow-md cursor-pointer"
                          }
                        `}
                      >
                        {colIndex + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* 범례 */}
          <div className="flex justify-center gap-6">
            <Legend color="bg-white shadow-sm" label="선택 가능" />
            <Legend color="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]" label="선택됨" />
            <Legend color="bg-[var(--color-border-light)]" label="예매 완료" />
          </div>
        </Card>

        {/* 예매 정보 */}
        <div className="lg:w-80">
          <Card className="p-6 sticky top-6">
            <h3 className="text-base font-bold text-[var(--color-text)] mb-5">예매 정보</h3>
            
            {/* 선택 좌석 */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-[var(--color-text-secondary)]">선택 좌석</span>
                <span className="text-sm font-semibold">{selectedSeats.length}석</span>
              </div>
              <div className="min-h-[48px]">
                {selectedSeats.length === 0 ? (
                  <p className="text-sm text-[var(--color-text-muted)] text-center py-4">
                    좌석을 선택해 주세요
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSeats.sort((a, b) => a - b).map((index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-[var(--color-primary)]/10 rounded-lg text-[var(--color-primary)] text-sm font-semibold"
                      >
                        {getSeatLabel(index)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="h-px bg-[var(--color-border)] my-5" />

            {/* 가격 정보 */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">티켓 금액</span>
                <span>₩{pricePerSeat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">수량</span>
                <span>{selectedSeats.length}매</span>
              </div>
            </div>

            {/* 총 금액 */}
            <div className="flex justify-between items-center p-4 bg-[var(--color-border-light)] rounded-2xl mb-5">
              <span className="text-sm font-semibold">총 결제금액</span>
              <span className="text-xl font-bold text-[var(--color-primary)]">
                ₩{totalPaymentAmount.toLocaleString()}
              </span>
            </div>

            {/* 결제 버튼 */}
            <button
              onClick={handleChargeClick}
              disabled={selectedSeats.length === 0}
              className={`
                w-full py-4 rounded-2xl font-bold text-base transition-all duration-200
                ${selectedSeats.length > 0 
                  ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-[0_8px_24px_rgba(99,102,241,0.4)]" 
                  : "bg-[var(--color-border-light)] text-[var(--color-text-muted)] cursor-not-allowed"
                }
              `}
            >
              결제하기
            </button>
          </Card>
        </div>
      </div>
    </main>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-5 h-5 rounded-md ${color}`} />
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
    </div>
  );
}
