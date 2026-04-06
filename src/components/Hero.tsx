export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: "var(--c-hero-gradient)",
        scrollSnapAlign: "start",
        transition: "background 0.3s ease",
      }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,179,212,0.22) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Blobs */}
      <div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none z-[2]"
        style={{
          width: 520,
          height: 520,
          background: "rgba(255,31,122,0.07)",
          top: -120,
          right: -80,
          filter: "blur(90px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none z-[2]"
        style={{
          width: 380,
          height: 380,
          background: "rgba(255,179,212,0.13)",
          bottom: -60,
          left: -60,
          filter: "blur(90px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full pointer-events-none">
        {/* Availability badge */}
        <div
          className="inline-flex items-center gap-[0.55rem] border rounded-full px-4 py-[0.35rem] text-[0.68rem] tracking-[0.1em] uppercase mb-[1.6rem] backdrop-blur-[8px]"
          style={{
            background: "var(--c-badge-bg)",
            borderColor: "var(--c-border)",
            color: "var(--c-text)",
          }}
        >
          <div className="pulse-dot w-2 h-2 rounded-full bg-[#FF1F7A]" />
          Available for 2026
        </div>

        {/* Eyebrow */}
        <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[#FF1F7A] mb-[1.4rem] font-[family-name:var(--font-mono)]">
          Software Engineering &nbsp;·&nbsp; Data Systems &nbsp;·&nbsp; Backend
        </p>

        {/* Name */}
        <h1
          className="font-[family-name:var(--font-display)] font-bold leading-none mb-4"
          style={{
            color: "var(--c-text)",
            fontSize: "clamp(3.8rem, 9vw, 7.8rem)",
          }}
        >
          Duru
          <br />
          <em className="italic text-[#FF1F7A]">Gencay</em>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[0.78rem] tracking-[0.08em] opacity-70 mb-[2.2rem] px-5 py-[0.4rem] rounded-[4px] backdrop-blur-[6px]"
          style={{ color: "var(--c-text)", background: "var(--c-subtitle-bg)" }}
        >
          Final-year @ Yaşar University &nbsp;·&nbsp; Erasmus+ &nbsp;·&nbsp;
          İzmir, Turkey
        </p>

        {/* CTA */}
        <a
          href="#about"
          className="pointer-events-auto inline-flex items-center gap-2 bg-transparent text-[#FF1F7A] border-[1.5px] border-[#FF1F7A] font-[family-name:var(--font-mono)] text-[0.75rem] tracking-[0.1em] uppercase px-8 py-[0.85rem] rounded-[3px] no-underline transition-[background,color,transform] duration-[250ms] hover:bg-[#FF1F7A] hover:text-white hover:-translate-y-0.5"
        >
          View Portfolio →
        </a>
      </div>

      {/* Bottom fade to blend into About section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[10]"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--c-bg))",
          transition: "background 0.3s ease",
        }}
      />
    </section>
  );
}
