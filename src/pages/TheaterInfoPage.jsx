import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import WaitingModal from "@components/WaitingModal";
import Card from "@components/Card";
import CardSectionLayout from "@components/CardSectionLayout";

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

  return (
    <main className="min-h-screen bg-gray-100 flex items-start md:items-center px-4 md:px-6 lg:px-8 py-6">
      <Card>
        <CardSectionLayout
          title={<TitleSection movieInfo={movieInfo} />}
          col1={
            <PosterSection
              className="md:min-w-[200px] md:max-w-[300px] md:h-auto md:flex-1 bg-gray-200 rounded-lg"
              poster_landscape={poster_landscape}
              poster_portrait={poster_portrait}
            />
          }
          col2={
            <DescriptionSection
              className="md:flex-1 flex flex-col md:order-2"
              movieInfo={movieInfo}
              handleReserveClick={handleReserveClick}
            />
          }
        />
      </Card>

      {isWaiting && <WaitingModal onComplete={handleWaitingComplete} />}
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

function PosterSection({ poster_landscape, poster_portrait, className = "" }) {
  return (
    <figure className={className}>
      <picture className="w-full h-full">
        <source media="(max-width: 768px)" srcSet={poster_landscape} />
        <img
          src={poster_portrait}
          alt="포스터"
          className="object-contain w-full h-full"
        />
      </picture>
    </figure>
  );
}

function DescriptionSection({ movieInfo, handleReserveClick, className = "" }) {
  return (
    <section className={`${className}`}>
      <div className="space-y-2 text-base md:text-md">
        <InfoRow label="장르" value={movieInfo.genre} />
        <InfoRow label="등급" value={movieInfo.rating} />
        <InfoRow label="상영시간" value={movieInfo.duration} />
        <InfoRow label="가격" value={`${movieInfo.price}원`} />
      </div>

      <hr className="mb-2" />

      <div className="space-y-2 text-base md:text-md">
        <InfoRow
          label="줄거리"
          value={
            <span className="mt-1 block">
              운명의 기차가 떠나기 전, 모든 것을 되돌릴 마지막 기회
            </span>
          }
        />
        <InfoRow
          label="배송 정보"
          value={
            <span className="mt-1 block">
              본 상품은 일괄배송 상품으로 {movieInfo.delivery_date}부터 순차
              배송됩니다.
            </span>
          }
        />
      </div>

      <div className="mt-auto">
        <hr className="mb-2" />

        <div className="text-base md:text-lg">
          <p className="h-18 font-bold bg-gray-200 p-2 rounded-md text-center content-center">
            {/* 강조 태그 사용*/}본 상품은{" "}
            <span className="text-orange-400">자동 예매 방지(CAPTCHA)</span>가
            적용된 상품입니다.
          </p>
        </div>

        <button
          onClick={handleReserveClick}
          className="mt-2 w-full bg-red-600 text-white text-xl font-bold py-4 rounded-lg hover:bg-red-700 transition"
        >
          예매하기
        </button>
      </div>
    </section>
  );
}

function InfoRow({ label, value, className = "" }) {
  return (
    <div className={clsx("mb-2", className)}>
      <span className="font-bold md:w-24 md:inline-block block mb-1 md:mb-0">
        {label}
      </span>
      <span>{value}</span>
    </div>
  );
}
