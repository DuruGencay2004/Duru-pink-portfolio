interface ContactLink {
  href: string;
  label: string;
  icon: string;
  external?: boolean;
}

const LINKS: ContactLink[] = [
  { href: "mailto:durugencayy@gmail.com", label: "Email", icon: "✉" },
  {
    href: "https://github.com/DuruGncy",
    label: "GitHub",
    icon: "⌥",
    external: true,
  },
  {
    href: "https://linkedin.com/in/durugencay",
    label: "LinkedIn",
    icon: "⬡",
    external: true,
  },
  {
    href: "https://medium.com/@durugencayy",
    label: "Medium",
    icon: "◈",
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="max-w-[1100px] mx-auto px-8 py-20 text-center max-md:px-6 max-md:py-16"
      style={{ scrollSnapAlign: "start" }}
    >
      <span className="reveal block text-[0.65rem] tracking-[0.18em] uppercase text-[#FF1F7A] mb-[0.6rem]">
        // 004 — Contact
      </span>
      <h2
        className="reveal font-[family-name:var(--font-display)] font-bold mb-12 leading-[1.15]"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--c-text)" }}
      >
        Let's build
        <br />
        something <em className="italic text-[#FF1F7A]">together</em>
      </h2>

      <p className="reveal text-[0.8rem] opacity-65 max-w-[420px] mx-auto leading-[1.8] mb-10">
        I'm open to internships, graduate roles, and collaborations starting
        2026. Reach out — I read every message.
      </p>

      <div className="reveal-group flex gap-4 justify-center flex-wrap">
        {LINKS.map(({ href, label, icon, external }) => (
          <a
            key={label}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.1em] uppercase px-[1.6rem] py-[0.8rem] border rounded-[3px] no-underline transition-[border-color,color,background,transform] duration-200 hover:border-[#FF1F7A] hover:text-[#FF1F7A] hover:bg-[rgba(255,31,122,0.04)] hover:-translate-y-0.5"
            style={{ color: "var(--c-text)", borderColor: "var(--c-border)" }}
          >
            {icon} {label}
          </a>
        ))}
      </div>
    </section>
  );
}
