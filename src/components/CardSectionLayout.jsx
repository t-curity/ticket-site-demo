import clsx from "clsx";

export default function CardSectionLayout({ title, col1, col2, className = "" }) {
  return (
    <div className={clsx("flex flex-col", className)}>
      
      {/* Title */}
      <div className="order-2 md:order-1 mt-2 md:mt-0">
        {title}
      </div>

      {/* Row (Poster + PC Description) */}
      <div className="order-1 md:order-2 flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="overflow-x-auto">
          {col1}
        </div>
        <div className="hidden md:flex flex-col flex-1">
          {col2}
        </div>
      </div>

      {/* Mobile Description */}
      <div className="order-3 md:hidden mt-4">
        {col2}
      </div>

    </div>
  );
}
