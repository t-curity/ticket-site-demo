import { useState, useEffect } from "react";
import { toast } from "sonner";
import clsx from "clsx";

import Card from "@components/Card";
import CardSectionLayout from "@components/CardSectionLayout";

import movieInfo from "@data/movieInfo";
import messages from "@data/messages";

export default function ReservationPage() {
  const { TCuritySDK } = window;

  const [seats] = useState(() =>
    [...Array(9 * 8)].map(() => Math.random() > 0.7),
  );

  const [totalPaymentAmount] = useState(0);

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
    <main className="min-h-screen bg-gray-100 flex items-start md:items-center px-4 md:px-6 lg:px-8 py-6">
      <Card>
        <CardSectionLayout
          title={<TitleSection movieInfo={movieInfo} />}
          col1={<SeatMapSection seats={seats} />}
          col2={
            <ChargeSection
              className="md:flex-1 flex flex-col"
              movieInfo={movieInfo}
              totalPaymentAmount={totalPaymentAmount}
              handleChargeClick={handleChargeClick}
            />
          }
        />
      </Card>
    </main>
  );
}

function TitleSection({ movieInfo, className = "" }) {
  return (
    <header className={className}>
      <h1 className="text-3xl font-bold">{movieInfo.title}</h1>
      <p className="text-xl text-gray-600">
        <span>{movieInfo.dates.join(" ~ ")}</span>
        <span className="hidden md:inline mx-2">|</span>
        <span className="block md:inline">{movieInfo.venue}</span>
      </p>
      <hr className="my-2" />
    </header>
  );
}

function SeatMapSection({ seats, className = "" }) {
  return (
    // Seat Map 크기 고정 (가로 360px, 세로 450px)
    <section
      className={clsx(
        "min-h-[450px] min-w-[360px] flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <div className="h-[450px] w-[360px] flex flex-col items-center justify-center gap-4 bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300">
        <div className="mb-0 w-64 h-12 bg-gray-300 rounded flex items-center justify-center text-gray-500">
          무대
        </div>

        <div className="mb-4 w-full flex justify-center">
          <div className="w-full h-1 bg-gray-400 rounded"></div>
        </div>

        <div className="grid grid-cols-9 gap-2">
          {seats.map((occupied, i) => {
            if (i % 9 === 4) return <div key={i} className="w-8" />;

            return (
              <div
                key={i}
                className={`w-8 h-8 rounded ${
                  occupied
                    ? "bg-gray-300"
                    : "bg-purple-500 cursor-pointer hover:bg-purple-600"
                }`}
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChargeSection({ movieInfo, totalPaymentAmount, handleChargeClick }) {
  return (
    <section className="flex flex-col flex-1">
      <div className="space-y-4 p-4">
        <div className="font-bold text-md">선택 정보</div>
        <ul className="space-y-2 mb-8 min-h-[100px]"></ul>
      </div>

      <div className="mt-auto">
        <div className="space-y-2 text-lg mt-auto">
          <p className="flex justify-between items-center bg-gray-100 p-4 rounded">
            <span className="font-bold">총 결제 금액</span>
            <span className="text-red-600 text-2xl font-bold">
              {totalPaymentAmount}원
            </span>
          </p>

          <button
            className="w-full bg-red-600 text-white text-xl font-bold py-4 rounded-lg hover:bg-red-700 transition"
            onClick={handleChargeClick}
          >
            결제하기
          </button>
        </div>
      </div>
    </section>
  );
}
