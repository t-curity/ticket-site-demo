import clsx from "clsx";

export default function Card({ children, className = "" }) {
  return (
    <section className={clsx(
        "max-w-4xl min-w-[360px] w-full mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col",
        className
    )}>
      {children}
    </section>
  );
}