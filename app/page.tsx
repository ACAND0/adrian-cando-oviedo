const skills = [
  "OpenText Documentum",
  "Java / DFCs",
  "JavaFX",
  "D2 / D2-Config",
  "Migraciones ECM",
  "SAP HANA / ABAP",
  "PowerShell",
  "REST APIs",
  "SQL",
  "JMeter / JProfiler",
  "Copilot 365",
];

const experience = [
  {
    company: "Minsait · Grupo Indra",
    role: "Documentum Senior Consultant",
    date: "Jun 2026 — Actualidad",
    place: "Alcobendas",
    description:
      "Estudio, automatización y mejora de procesos empresariales con Java, Documentum DFCs, SAP HANA/ABAP y PowerShell. Soporte de incidencias y evolutivos sobre perfiles, objetos documentales y workflows en entornos de defensa y producción.",
    tags: ["Documentum 23.4", "Java", "DFCs", "SAP HANA", "PowerShell"],
    current: true,
  },
  {
    company: "Repsol · NTT DATA",
    role: "Documentum Technical Senior Expert Specialist",
    date: "Ene 2026 — Jun 2026",
    place: "Salamanca",
    description:
      "Análisis estratégico para modernizar el ecosistema documental y definir la hoja de ruta de migración de activos digitales, evaluando el destino óptimo de la información y la integridad de su ciclo de vida.",
    tags: ["Estrategia ECM", "Migración", "Arquitectura", "Análisis"],
  },
  {
    company: "ADIF · NTT DATA",
    role: "Documentum Technical Senior Expert Specialist",
    date: "Abr 2025 — Mar 2026",
    place: "Salamanca",
    description:
      "Responsable técnico de la migración de Documentum 7.2 a 22.2: reestructuración del repositorio, transformación de tipos documentales y contenidos, ingeniería inversa de procesos y diseño de nuevas lógicas de negocio.",
    tags: ["Documentum 7.2 → 22.2", "Java", "DFCs", "Liderazgo técnico"],
  },
  {
    company: "ADIF · NTT DATA",
    role: "Documentum Analyst",
    date: "Nov 2022 — Jun 2025",
    place: "Madrid",
    description:
      "Análisis, diseño y desarrollo de aplicaciones web conectadas a Documentum mediante servicios REST. Optimización de rendimiento, migraciones desde Lotus Notes, estimaciones, licitaciones y coordinación de tareas de equipo.",
    tags: ["Java 11", "REST", "JavaScript", "JMeter", "JProfiler"],
  },
  {
    company: "Ferrovial · SERBATIC",
    role: "Documentum Developer",
    date: "Mar 2021 — Nov 2022",
    place: "Madrid",
    description:
      "Desarrollo de un sistema de exportación de contenido y metadatos desde Documentum hacia Microsoft 365, incluyendo volumetrías, estructuración de información y automatización mediante PowerShell y batch.",
    tags: ["Documentum", "DFCs", "Microsoft 365", "PowerShell"],
  },
  {
    company: "ACCIONA · SERBATIC",
    role: "Documentum Application Developer",
    date: "Jun 2020 — Nov 2022",
    place: "Zamora",
    description:
      "Creación y configuración de aplicaciones D2: modelos documentales, seguridad, TBOs, diccionarios, taxonomías y matrices. Resolución de incidencias, análisis de datos y transformaciones documentales.",
    tags: ["D2", "D2-Config", "TBOs", "ACLs", "Migraciones"],
  },
];

const earlierExperience = [
  {
    year: "2019 — 2020",
    role: "Business Application Developer",
    company: "MAPFRE · SERBATIC",
    text: "Aplicaciones Java de generación documental, geolocalización con servicios de Google, SQL y cargas masivas.",
  },
  {
    year: "2019",
    role: "Web Developer",
    company: "InternacionalWeb",
    text: "Desarrollo de webs para distintos sectores, mantenimiento WordPress, SEO y gestión de cambios.",
  },
  {
    year: "2017",
    role: "Técnico Informático",
    company: "Gráficas Cubichi",
    text: "Soporte de TPV y facturación, diseño web y producción gráfica.",
  },
];

const education = [
  {
    type: "Especialización",
    title: "Técnico Superior en Desarrollo de Aplicaciones Web",
    institution: "I.E.S. Los Sauces",
    date: "2017 — 2019",
  },
  {
    type: "Formación técnica",
    title: "Técnico en Sistemas Microinformáticos y Redes",
    institution: "I.E.S. Los Sauces",
    date: "2015 — 2017",
  },
];

const certifications = [
  "Documentum Certified Business Administrator · 5-8055",
  "Microsoft Copilot 365 · IA Generativa en Microsoft 365",
  "Técnico en programación de Java",
];

function ArrowUpRight() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          AC<span className="brand-dot">.</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#sobre">Sobre mí</a>
          <a href="#soluciones">Soluciones</a>
          <a href="#experiencia">Experiencia</a>
          <a href="#formacion">Formación</a>
        </nav>
        <a
          className="header-cta"
          href="https://www.linkedin.com/in/adrian-cando-oviedo"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn <ArrowUpRight />
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            DOCUMENTUM · JAVA · CONSULTORÍA ECM
          </p>
          <h1>
            Adrián
            <br />
            Cando <span>Oviedo.</span>
          </h1>
          <p className="hero-role">Documentum Senior Consultant</p>
          <p className="hero-intro">
            Diseño, modernizo y optimizo ecosistemas documentales críticos.
            Convierto migraciones complejas y procesos de negocio en soluciones
            fiables, medibles y preparadas para evolucionar.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#experiencia">
              Ver experiencia <ArrowUpRight />
            </a>
            <a className="button button-secondary" href="#soluciones">
              Ver especialización
            </a>
          </div>
        </div>

        <aside className="hero-profile" aria-label="Resumen profesional">
          <div className="profile-frame">
            <div className="profile-code">AC</div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <span className="code-fragment fragment-one">{"{ ECM }"}</span>
            <span className="code-fragment fragment-two">DFCs</span>
            <span className="code-fragment fragment-three">23.4</span>
          </div>
          <div className="profile-stats">
            <div>
              <strong>6+</strong>
              <span>Años en desarrollo y ECM</span>
            </div>
            <div>
              <strong>7.2→23.4</strong>
              <span>Experiencia multiversión</span>
            </div>
          </div>
        </aside>

        <div className="scroll-cue" aria-hidden="true">
          <span>SCROLL</span>
          <i />
        </div>
      </section>

      <section className="section about" id="sobre">
        <div className="section-marker">
          <span>01</span>
          <p>SOBRE MÍ</p>
        </div>
        <div className="about-content">
          <div>
            <p className="section-kicker">// PERFIL PROFESIONAL</p>
            <h2>
              Tecnología documental
              <br />
              con visión de <em>negocio.</em>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              Soy analista y desarrollador especializado en{" "}
              <strong>OpenText Documentum</strong>, con experiencia en proyectos
              de gran alcance para sectores de energía, infraestructuras,
              construcción, seguros y servicios públicos.
            </p>
            <p>
              Mi trabajo conecta arquitectura, desarrollo y operación: desde la
              definición de modelos documentales y seguridad hasta migraciones
              completas, integraciones Java, análisis de rendimiento y
              automatización de procesos.
            </p>
            <p>
              También he diseñado <strong>aplicaciones personalizadas con JavaFX
              y DFCs</strong> para interactuar con Documentum y facilitar el
              trabajo interno sobre repositorios, procesos y objetos
              documentales.
            </p>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/adrian-cando-oviedo"
              target="_blank"
              rel="noreferrer"
            >
              Perfil en LinkedIn <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className="metric-grid">
          <article>
            <span className="metric-number">6+</span>
            <p>Años construyendo soluciones empresariales</p>
          </article>
          <article>
            <span className="metric-number">5</span>
            <p>Sectores con sistemas y datos críticos</p>
          </article>
          <article>
            <span className="metric-number">360°</span>
            <p>De la estrategia a producción y soporte</p>
          </article>
          <article>
            <span className="metric-number">∞</span>
            <p>Mejora continua y aprendizaje aplicado</p>
          </article>
        </div>

        <div className="skills-wrap">
          <p className="skills-label">STACK &amp; ESPECIALIDADES</p>
          <div className="skills" aria-label="Tecnologías y especialidades">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <article className="focus-feature" id="soluciones">
          <div className="focus-copy">
            <p className="section-kicker">// DESARROLLO ESPECIALIZADO</p>
            <h3>Aplicaciones internas a medida</h3>
            <p>
              Desarrollo herramientas de escritorio personalizadas con
              <strong> JavaFX</strong> y <strong>Documentum DFCs</strong>,
              diseñadas para interactuar directamente con el repositorio y
              adaptar el trabajo interno a las necesidades reales de cada
              proceso.
            </p>
            <div className="focus-points">
              <span>Interfaces de escritorio especializadas</span>
              <span>Integración directa con Documentum</span>
              <span>Operativa interna adaptada al proceso</span>
            </div>
          </div>
          <div className="code-panel" aria-label="Representación de una aplicación JavaFX conectada a Documentum">
            <div className="code-panel-bar">
              <i />
              <i />
              <i />
              <span>documentum-tool.java</span>
            </div>
            <div className="code-panel-body" aria-hidden="true">
              <p><b>01</b><span>public class</span> DocumentumWorkspace {"{"}</p>
              <p><b>02</b>&nbsp;&nbsp;<span>private</span> IDfSession session;</p>
              <p><b>03</b>&nbsp;</p>
              <p><b>04</b>&nbsp;&nbsp;<em>// JavaFX + DFCs</em></p>
              <p><b>05</b>&nbsp;&nbsp;repository.connect();</p>
              <p><b>06</b>&nbsp;&nbsp;workflow.execute();</p>
              <p><b>07</b>{"}"}</p>
            </div>
            <div className="code-panel-status">
              <span>● DOCUMENTUM CONNECTED</span>
              <span>JAVA FX</span>
            </div>
          </div>
        </article>
      </section>

      <section className="section experience-section" id="experiencia">
        <div className="section-marker">
          <span>02</span>
          <p>TRAYECTORIA</p>
        </div>
        <div className="section-heading">
          <p className="section-kicker">// EXPERIENCIA PROFESIONAL</p>
          <h2>
            Sistemas que evolucionan.
            <br />
            Datos que <em>permanecen.</em>
          </h2>
        </div>

        <div className="timeline">
          {experience.map((item, index) => (
            <article className="timeline-item" key={`${item.company}-${item.date}`}>
              <div className="timeline-index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="timeline-meta">
                <p>{item.company}</p>
                <span>{item.date}</span>
                <span>{item.place}</span>
                {item.current && <b>● POSICIÓN ACTUAL</b>}
              </div>
              <div className="timeline-content">
                <h3>{item.role}</h3>
                <p>{item.description}</p>
                <div className="tag-list">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="earlier">
          <p className="section-kicker">// ETAPAS ANTERIORES</p>
          <div className="earlier-grid">
            {earlierExperience.map((item) => (
              <article key={item.company}>
                <span>{item.year}</span>
                <h3>{item.role}</h3>
                <h4>{item.company}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section education-section" id="formacion">
        <div className="section-marker">
          <span>03</span>
          <p>FORMACIÓN</p>
        </div>
        <div className="education-layout">
          <div className="section-heading">
            <p className="section-kicker">// BASE TÉCNICA</p>
            <h2>
              Aprender. Aplicar.
              <br />
              <em>Compartir.</em>
            </h2>
            <p className="education-intro">
              Una base sólida en desarrollo web y sistemas, reforzada con
              certificaciones específicas y aprendizaje continuo en
              Documentum, automatización e inteligencia artificial.
            </p>
          </div>

          <div className="education-list">
            {education.map((item) => (
              <article key={item.title}>
                <span className="education-icon" aria-hidden="true">
                  +
                </span>
                <div>
                  <p>{item.type}</p>
                  <h3>{item.title}</h3>
                  <span>
                    {item.institution} · {item.date}
                  </span>
                </div>
              </article>
            ))}
            <div className="certifications">
              <p>CERTIFICACIONES</p>
              <ul>
                {certifications.map((certification) => (
                  <li key={certification}>{certification}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="perfil">
        <div className="contact-orbit" aria-hidden="true" />
        <p className="section-kicker">// PERFIL PROFESIONAL</p>
        <h2>
          Tecnología, criterio
          <br />
          y <em>evolución.</em>
        </h2>
        <p className="contact-copy">
          Esta web recoge una muestra de mi recorrido, mi especialización y la
          forma en la que trabajo con plataformas documentales, desarrollo Java
          y automatización de procesos empresariales.
        </p>
        <a className="contact-email" href="mailto:adriancando1617@gmail.com">
          adriancando1617@gmail.com <ArrowUpRight />
        </a>
        <div className="contact-links">
          <a
            href="https://www.linkedin.com/in/adrian-cando-oviedo"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRight />
          </a>
          <span>Benavente · Castilla y León · España</span>
        </div>
      </section>

      <footer>
        <a className="brand" href="#inicio" aria-label="Volver al inicio">
          AC<span className="brand-dot">.</span>
        </a>
        <p>© 2026 Adrián Cando Oviedo</p>
        <a href="#inicio">VOLVER ARRIBA ↑</a>
      </footer>
    </main>
  );
}
