interface Project {
  number: string;
  name: string;
  description: string;
  tags: string[];
  link: string;
}

const PROJECTS: Project[] = [
  {
    number: '001',
    name: 'RailPredict-AI',
    description:
      'A serverless data pipeline that ingests Belgian rail data in real time, runs delay predictions, and surfaces analytics dashboards — built to scale without servers.',
    tags: ['Python', 'SQL', 'Analytics', 'Serverless'],
    link: 'https://github.com/DuruGncy/RailPredict-AI',
  },
  {
    number: '002',
    name: 'DryCleaning Management System',
    description:
      'An MVP built to digitalize a local dry-cleaning business — order tracking, customer management, and cloud-backed storage replacing handwritten ledgers.',
    tags: ['Cloud', 'Database', 'Backend'],
    link: 'https://github.com/DuruGncy/dryclean-management-system',
  },
  {
    number: '003',
    name: 'Bill Payment System',
    description:
      'Microservices architecture with YARP reverse proxy handling routing across payment, user, and notification services. Built for resilience and horizontal scale.',
    tags: ['.NET 9', 'YARP', 'PostgreSQL', 'REST API'],
    link: 'https://github.com/DuruGncy/bill-pay-api',
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="max-w-[1100px] mx-auto px-8 py-20 max-md:px-6 max-md:py-16"
      style={{ scrollSnapAlign: 'start' }}
    >
      <span className="reveal block text-[0.65rem] tracking-[0.18em] uppercase text-[#FF1F7A] mb-[0.6rem]">
        // 002 — Projects
      </span>
      <h2
        className="reveal font-[family-name:var(--font-display)] font-bold text-[#1A0A10] mb-12 leading-[1.15]"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
      >
        Selected
        <br />
        <em className="italic text-[#FF1F7A]">work</em>
      </h2>

      <div className="reveal-group grid grid-cols-3 gap-6 max-md:grid-cols-1">
        {PROJECTS.map((project) => (
          <div
            key={project.number}
            className="project-card bg-white border border-[#FFB3D4] rounded-[6px] p-[2rem] pt-[2.4rem] relative overflow-hidden transition-[transform,box-shadow] duration-[280ms] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(255,31,122,0.1)]"
          >
            {/* Big background number */}
            <div
              aria-hidden="true"
              className="absolute top-[-0.5rem] right-4 font-[family-name:var(--font-display)] text-[7rem] font-bold leading-none text-[#FFB3D4] opacity-[0.18] pointer-events-none select-none transition-opacity duration-[280ms] group-hover:opacity-[0.28]"
            >
              {project.number}
            </div>

            <h3 className="font-[family-name:var(--font-display)] text-[1.1rem] font-bold text-[#1A0A10] mb-3 leading-[1.3]">
              {project.name}
            </h3>

            <p className="text-[0.75rem] leading-[1.75] text-[#1A0A10] opacity-70 mb-[1.4rem]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-[0.4rem] mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.6rem] tracking-[0.08em] px-[0.65rem] py-[0.25rem] bg-[rgba(255,179,212,0.2)] rounded-[2px] text-[#E0006F]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[0.35rem] font-[family-name:var(--font-mono)] text-[0.62rem] tracking-[0.1em] uppercase text-[#FF1F7A] no-underline opacity-75 transition-[opacity,gap] duration-200 hover:opacity-100 hover:gap-[0.55rem]"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
