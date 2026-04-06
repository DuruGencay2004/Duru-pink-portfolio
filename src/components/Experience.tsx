import React from "react";

interface TimelineEntry {
  type: string;
  date: string;
  role: string;
  org: string;
  description: string;
}

const TIMELINE: TimelineEntry[] = [
  {
    type: "Experience",
    date: "Jul – Sep 2025",
    role: "Software Engineering Intern",
    org: "Bimar IT Services — İzmir, Turkey",
    description:
      "Worked on SQL query optimization and data analysis pipelines. Reduced average query execution time significantly by rewriting inefficient joins and adding strategic indexing across production databases.",
  },
  {
    type: "Education",
    date: "Feb – Jun 2025",
    role: "Erasmus+ Exchange Student",
    org: "Howest University of Applied Sciences — Belgium",
    description:
      "Selected for the Erasmus+ mobility programme. Completed coursework in cloud-native development and collaborated with international student teams on applied software projects.",
  },
  {
    type: "Education",
    date: "2022 – 2026",
    role: "B.Sc. Software Engineering",
    org: "Yaşar University — İzmir, Turkey",
    description:
      "Final-year undergraduate studying software engineering with focus areas in backend systems, database architecture, microservices, and data engineering. Expected graduation: 2026.",
  },
];

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <section
      id="experience"
      className="max-w-[1100px] mx-auto px-8 py-20 max-md:px-6 max-md:py-16"
      style={{ scrollSnapAlign: "start" }}
    >
      <span className="reveal block text-[0.65rem] tracking-[0.18em] uppercase text-[#FF1F7A] mb-[0.6rem]">
        // 003 — Experience & Education
      </span>
      <h2
        className="reveal font-[family-name:var(--font-display)] font-bold mb-12 leading-[1.15]"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--c-text)" }}
      >
        The path
        <br />
        so <em className="italic text-[#FF1F7A]">far</em>
      </h2>

      <div className="reveal-group timeline relative pt-1">
        {TIMELINE.map((item, index) => (
          <div
            key={index}
            className={`relative pl-12 max-md:pl-10 group ${index < TIMELINE.length - 1 ? "pb-12" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Dot */}
            <div
              className="absolute left-0 top-[0.2rem] w-[13px] h-[13px] rounded-full border-2 border-[#FF1F7A] z-[1] transition-[background,box-shadow] duration-[250ms] group-hover:shadow-[0_0_0_5px_rgba(255,31,122,0.12)]"
              style={{
                background: hoveredIndex === index ? "#FF1F7A" : "var(--c-bg)",
              }}
            />

            <div className="text-[0.58rem] tracking-[0.16em] uppercase text-[#FF1F7A] opacity-70 mb-[0.3rem]">
              {item.type}
            </div>
            <div
              className="text-[0.68rem] tracking-[0.06em] opacity-45 mb-[0.45rem]"
              style={{ color: "var(--c-text)" }}
            >
              {item.date}
            </div>
            <h3
              className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold mb-[0.3rem]"
              style={{ color: "var(--c-text)" }}
            >
              {item.role}
            </h3>
            <div
              className="text-[0.72rem] opacity-60 mb-[0.7rem] tracking-[0.04em]"
              style={{ color: "var(--c-text)" }}
            >
              {item.org}
            </div>
            <p
              className="text-[0.75rem] leading-[1.8] opacity-[0.72]"
              style={{ color: "var(--c-text)" }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
