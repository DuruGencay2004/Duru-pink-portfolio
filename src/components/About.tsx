const SKILLS = [
  "SQL",
  "Python",
  "C#",
  ".NET",
  "PostgreSQL",
  "Git / GitHub",
  "REST APIs",
  "Microservices",
  "Database Optimization",
  "Data Pipelines",
  "Software Architecture",
  "YARP",
  "Serverless",
  "Cloud",
];

export default function About() {
  return (
    <section
      id="about"
      className="max-w-[1100px] mx-auto px-8 py-20 max-md:px-6 max-md:py-16"
      style={{ scrollSnapAlign: "start" }}
    >
      <span className="reveal block text-[0.65rem] tracking-[0.18em] uppercase text-[#FF1F7A] mb-[0.6rem]">
        // 001 — About
      </span>
      <h2
        className="reveal font-[family-name:var(--font-display)] font-bold mb-12 leading-[1.15]"
        style={{ color: "var(--c-text)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        Code that
        <br />
        blooms with <em className="italic text-[#FF1F7A]">purpose</em>
      </h2>

      <div className="reveal grid grid-cols-2 gap-16 items-start max-md:grid-cols-1 max-md:gap-10">
        {/* Bio */}
        <div
          className="text-[0.88rem] leading-[1.9] opacity-[0.82] [&_p+p]:mt-[1.1rem]"
          style={{ color: "var(--c-text)" }}
        >
          <p>
            I'm a{" "}
            <strong className="text-[#FF1F7A] font-medium">
              final-year Software Engineering student
            </strong>{" "}
            at Yaşar University, İzmir — graduating in 2026 with a focus on
            backend systems, data pipelines, and clean architecture.
          </p>
          <p>
            In early 2025, I completed an{" "}
            <strong className="text-[#FF1F7A] font-medium">
              Erasmus+ exchange semester
            </strong>{" "}
            at Howest University of Applied Sciences in Belgium (Feb–Jun), where
            I deepened my work in cloud-native development and cross-cultural
            collaboration.
          </p>
          <p>
            Most recently I interned at{" "}
            <strong className="text-[#FF1F7A] font-medium">
              Bimar IT Services
            </strong>{" "}
            (Jul–Sep 2025), where I worked on SQL query optimization and data
            analysis workflows — shaving seconds off queries that once took
            minutes.
          </p>
          <p>
            I believe software should feel considered — like something that was
            built with care, not just shipped. That's the thread connecting my
            code and the things I find beautiful.
          </p>
        </div>

        {/* Skills */}
        <div>
          <p className="text-[0.68rem] tracking-[0.12em] uppercase text-[#FF1F7A] mb-5">
            Skills &amp; Technologies
          </p>
          <div className="flex flex-wrap gap-[0.55rem]">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.06em] px-[0.85rem] py-[0.35rem] rounded-full bg-transparent transition-[border-color,color,background] duration-200 hover:border-[#FF1F7A] hover:text-[#FF1F7A] hover:bg-[rgba(255,31,122,0.04)] border"
                style={{
                  borderColor: "var(--c-border)",
                  color: "var(--c-text)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
