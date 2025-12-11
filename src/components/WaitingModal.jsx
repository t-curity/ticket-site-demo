import { useEffect, useState } from "react";

const INITIAL_WAITING_COUNT = 100;

export default function WaitingModal({ onComplete }) {
  const [waitingCount, setWaitingCount] = useState(INITIAL_WAITING_COUNT);

  useEffect(() => {
    const intervalTime = 16;
    const decreament = (INITIAL_WAITING_COUNT * intervalTime) / 1000;
    const interval = setInterval(() => {
      setWaitingCount((count) => {
        const nextCount = count > 0 ? count - decreament : 0;

        if (nextCount <= 0) {
          clearInterval(interval);

          if (onComplete) setTimeout(onComplete, 0);
        }

        return nextCount;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-bold mb-2">접속 대기 중...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
        <p className="text-sm text-gray-400 mt-2">
          대기 인원: {Math.ceil(waitingCount)}명
        </p>
      </div>
    </div>
  );
}
