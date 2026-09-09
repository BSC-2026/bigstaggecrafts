function KineticMark() {
  return (
    <div
      aria-hidden="true"
      className="kinetic grid grid-cols-2 font-display text-2xl font-semibold tracking-[0.08em] text-gold-hi md:text-4xl mb-6"
    >
      <span className="cell">B</span>
      <span className="cell">S</span>
      <span className="cell">C</span>
      <span className="cell text-gold">·</span>
      <style jsx>{`
        .kinetic { animation: spinGrid 8s cubic-bezier(0.65,0,0.35,1) infinite; }
        .kinetic .cell {
          display: flex; height: 1.12em; width: 1.12em;
          align-items: center; justify-content: center;
          animation: unspin 8s cubic-bezier(0.65,0,0.35,1) infinite;
        }
        @keyframes spinGrid {
          0%,18% { transform: rotate(0deg); } 25%,43% { transform: rotate(90deg); }
          50%,68% { transform: rotate(180deg); } 75%,93% { transform: rotate(270deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes unspin {
          0%,18% { transform: rotate(0deg); } 25%,43% { transform: rotate(-90deg); }
          50%,68% { transform: rotate(-180deg); } 75%,93% { transform: rotate(-270deg); }
          100% { transform: rotate(-360deg); }
        }
        @media (prefers-reduced-motion: reduce) { .kinetic, .kinetic .cell { animation: none; } }
      `}</style>
    </div>
  );
}