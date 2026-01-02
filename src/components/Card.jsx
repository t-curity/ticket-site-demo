import clsx from "clsx";

export default function Card({ children, className = "" }) {
  return (
    <section
      className={clsx(
        "max-w-4xl w-full mx-auto",
        "bg-white rounded-3xl",
        "shadow-[0_4px_24px_rgba(0,0,0,0.06)]",
        "overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
}