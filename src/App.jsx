import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Iconos SVG como componentes
const Icons = {
  Moon: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  ),
  Sun: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  ),
  Github: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  ),
  Linkedin: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Mail: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  ExternalLink: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  ),
  Code: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Terminal: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
    </svg>
  ),
  ChevronDown: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  ArrowRight: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  Send: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  ),
  MapPin: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Download: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
    </svg>
  ),
  Globe: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
    </svg>
  ),
  Award: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/><path d="M22 22h-2.24a12.16 12.16 0 0 0-4.567-1.955"/>
    </svg>
  ),
  Book: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 11h8"/><path d="M8 7h6"/>
    </svg>
  ),
  Users: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Briefcase: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
}

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'dark'
  })
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  // Datos del portafolio - EDITA ESTOS VALORES
  const portfolioData = {
    name: "Tu Nombre",
    title: "Desarrollador Full Stack",
    subtitle: "Creo experiencias digitales increíbles",
    description: "Soy un desarrollador apasionado por crear aplicaciones web modernas y escalables. Me especializo en React, Node.js y tecnologías cloud.",
    location: "Tu Ciudad, País",
    email: "tu.email@ejemplo.com",
    github: "https://github.com/tu-usuario",
    linkedin: "https://linkedin.com/in/tu-usuario",
    avatar: "https://via.placeholder.com/400x400/6366f1/ffffff?text=Tu+Foto",
    cvUrl: "/cv.pdf", // Tu CV en PDF en la carpeta public

    about: {
      text: `¡Hola! Soy un desarrollador con experiencia en la creación de aplicaciones web modernas. Me encanta resolver problemas complejos y convertir ideas en realidad.

Cuando no estoy programando, me encuentro explorando nuevas tecnologías, contribuyendo a proyectos open source, o compartiendo conocimiento con la comunidad.

Mi enfoque se centra en escribir código limpio, escalable y mantenible, siempre buscando las mejores prácticas y patrones de diseño.`
    },

    skills: {
      technical: [
        { name: "React", icon: "Code", level: 95, category: "Frontend" },
        { name: "JavaScript", icon: "Terminal", level: 90, category: "Frontend" },
        { name: "TypeScript", icon: "Code", level: 85, category: "Frontend" },
        { name: "Node.js", icon: "Terminal", level: 88, category: "Backend" },
        { name: "Python", icon: "Code", level: 82, category: "Backend" },
        { name: "PostgreSQL", icon: "Terminal", level: 80, category: "Database" },
        { name: "MongoDB", icon: "Code", level: 85, category: "Database" },
        { name: "Docker", icon: "Terminal", level: 75, category: "DevOps" },
        { name: "AWS", icon: "Code", level: 70, category: "DevOps" },
        { name: "Git", icon: "Terminal", level: 90, category: "Tools" },
      ],
      soft: [
        { name: "Comunicación efectiva", level: 90 },
        { name: "Trabajo en equipo", level: 95 },
        { name: "Resolución de problemas", level: 92 },
        { name: "Liderazgo técnico", level: 85 },
        { name: "Gestión del tiempo", level: 88 },
        { name: "Adaptabilidad", level: 90 },
      ]
    },

    projects: [
      {
        title: "Proyecto 1",
        description: "Descripción del proyecto. Explica las funcionalidades principales y el impacto que tuvo.",
        image: "https://via.placeholder.com/600x400/6366f1/ffffff?text=Proyecto+1",
        tags: ["React", "Node.js", "MongoDB"],
        github: "#",
        demo: "#"
      },
      {
        title: "Proyecto 2",
        description: "Descripción del proyecto. Explica las funcionalidades principales y el impacto que tuvo.",
        image: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Proyecto+2",
        tags: ["TypeScript", "Next.js", "PostgreSQL"],
        github: "#",
        demo: "#"
      },
      {
        title: "Proyecto 3",
        description: "Descripción del proyecto. Explica las funcionalidades principales y el impacto que tuvo.",
        image: "https://via.placeholder.com/600x400/d946ef/ffffff?text=Proyecto+3",
        tags: ["React Native", "Firebase", "Redux"],
        github: "#",
        demo: "#"
      }
    ],

    experience: [
      {
        company: "Empresa 1",
        role: "Desarrollador Senior",
        roleShort: "Dev Senior",
        period: "2023 - Presente",
        description: "Liderazgo técnico en proyectos de gran escala. Mentoría de desarrolladores junior. Implementación de mejores prácticas y code reviews."
      },
      {
        company: "Empresa 2",
        role: "Desarrollador Full Stack",
        roleShort: "Dev Full Stack",
        period: "2021 - 2023",
        description: "Desarrollo de aplicaciones web con React y Node.js. Colaboración con equipos de diseño y producto."
      },
      {
        company: "Empresa 3",
        role: "Desarrollador Junior",
        roleShort: "Dev Junior",
        period: "2019 - 2021",
        description: "Desarrollo de componentes UI y mantenimiento de aplicaciones existentes."
      }
    ],

    education: [
      {
        institution: "Universidad Tecnológica",
        degree: "Ingeniería en Sistemas Computacionales",
        period: "2015 - 2019",
        description: "Graduado con honores. Especialización en desarrollo de software."
      },
      {
        institution: "Platzi / Coursera / Udemy",
        degree: "Bootcamp Full Stack Developer",
        period: "2020",
        description: "Formación intensiva en desarrollo web moderno con React y Node.js"
      }
    ],

    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "B2 - Intermedio Avanzado" },
      { name: "Francés", level: "A2 - Básico" }
    ],

    certifications: [
      { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2023" },
      { name: "Meta Front-End Developer", issuer: "Coursera", year: "2022" },
      { name: "Node.js Certified Developer", issuer: "OpenJS Foundation", year: "2021" }
    ],

    roles: [
      "Desarrollador Full Stack",
      "Tech Lead",
      "Arquitecto de Software",
      "Mentor Técnico"
    ]
  }

  const renderIcon = (iconName, size = 24) => {
    const IconComponent = Icons[iconName] || Icons.Code
    return <IconComponent size={size} />
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
        <motion.div
          className="nav-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="logo-text">&lt;{portfolioData.name.split(' ')[0]} /&gt;</span>
        </motion.div>

        <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                className={activeSection === item ? 'active' : ''}
                onClick={() => scrollToSection(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <button className="theme-toggle" onClick={toggleTheme}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </motion.li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="hero-avatar"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img src={portfolioData.avatar} alt={portfolioData.name} />
            <div className="avatar-glow"></div>
          </motion.div>

          <motion.p
            className="hero-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            👋 Hola, soy
          </motion.p>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {portfolioData.name}
          </motion.h1>

          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {portfolioData.title}
          </motion.h2>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {portfolioData.subtitle}
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <a href={portfolioData.cvUrl} download className="btn btn-primary">
              Descargar CV
              <Icons.Download size={18} />
            </a>
            <button className="btn btn-secondary" onClick={() => scrollToSection('projects')}>
              Ver Proyectos
              <Icons.ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
              Contactar
              <Icons.Send size={18} />
            </button>
          </motion.div>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">
              <Icons.Github size={24} />
            </a>
            <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer">
              <Icons.Linkedin size={24} />
            </a>
            <a href={`mailto:${portfolioData.email}`}>
              <Icons.Mail size={24} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          onClick={() => scrollToSection('about')}
        >
          <Icons.ChevronDown size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Sobre Mí
          </motion.h2>

          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {portfolioData.about.text.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              <div className="about-info">
                <div className="info-item">
                  <Icons.MapPin size={20} />
                  <span>{portfolioData.location}</span>
                </div>
                <div className="info-item">
                  <Icons.Mail size={20} />
                  <span>{portfolioData.email}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="about-stats"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                { number: "5+", label: "Años de Experiencia" },
                { number: "50+", label: "Proyectos Completados" },
                { number: "30+", label: "Clientes Satisfechos" },
                { number: "10+", label: "Tecnologías" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Resumen de experiencia */}
          <motion.div
            className="experience-summary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>Trayectoria Profesional</h3>
            <div className="experience-summary-list">
              {portfolioData.experience.map((exp, index) => (
                <div key={index} className="experience-summary-item">
                  <span className="experience-summary-role">{exp.roleShort || exp.role}</span>
                  <span className="experience-summary-company">@{exp.company}</span>
                  <span className="experience-summary-period">{exp.period}</span>
                </div>
              ))}
            </div>
            <p className="experience-note">
              Ver detalles completos en la sección <button onClick={() => scrollToSection('experience')}>Formación y Certificaciones</button>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Habilidades
          </motion.h2>

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Tecnologías y herramientas que domino
          </motion.p>

          <div className="skills-grid">
            {Object.entries(
              portfolioData.skills.technical.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = []
                acc[skill.category].push(skill)
                return acc
              }, {})
            ).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                className="skills-category"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
              >
                <h3>{category}</h3>
                <div className="skills-list">
                  {skills.map((skill, index) => {
                    const IconComponent = Icons[skill.icon] || Icons.Code
                    return (
                      <motion.div
                        key={skill.name}
                        className="skill-item"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className="skill-icon"><IconComponent size={24} /></div>
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <div className="skill-bar">
                            <motion.div
                              className="skill-progress"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.3 }}
                            />
                          </div>
                          <span className="skill-level">{skill.level}%</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Soft Skills */}
          <motion.div
            className="soft-skills-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="soft-skills-title">Habilidades Blandas</h3>
            <div className="soft-skills-grid">
              {portfolioData.skills.soft.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="soft-skill-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                >
                  <div className="soft-skill-icon">
                    <Icons.Users size={24} />
                  </div>
                  <span className="soft-skill-name">{skill.name}</span>
                  <div className="soft-skill-bar">
                    <motion.div
                      className="soft-skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section - Education, Languages, Certifications */}
      <section id="experience" className="experience-section-main">
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Formación y Certificaciones
          </motion.h2>

          <div className="experience-grid">
            {/* Education */}
            <motion.div
              className="experience-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="experience-card-header">
                <Icons.Book size={28} />
                <h3>Formación Académica</h3>
              </div>
              <div className="experience-card-content">
                {portfolioData.education.map((edu, index) => (
                  <div key={index} className="experience-item-detail">
                    <span className="experience-item-period">{edu.period}</span>
                    <h4>{edu.degree}</h4>
                    <span className="experience-item-institution">{edu.institution}</span>
                    <p>{edu.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              className="experience-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="experience-card-header">
                <Icons.Globe size={28} />
                <h3>Idiomas</h3>
              </div>
              <div className="experience-card-content">
                {portfolioData.languages.map((lang, index) => (
                  <div key={index} className="language-item">
                    <div className="language-info">
                      <Icons.Globe size={20} />
                      <span className="language-name">{lang.name}</span>
                    </div>
                    <span className="language-level">{lang.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              className="experience-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="experience-card-header">
                <Icons.Award size={28} />
                <h3>Certificaciones</h3>
              </div>
              <div className="experience-card-content">
                {portfolioData.certifications.map((cert, index) => (
                  <div key={index} className="certification-item">
                    <div className="certification-header">
                      <Icons.Award size={20} />
                      <span className="certification-name">{cert.name}</span>
                    </div>
                    <div className="certification-details">
                      <span>{cert.issuer}</span>
                      <span className="certification-year">{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Roles */}
          <motion.div
            className="roles-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>Roles Desempeñados</h3>
            <div className="roles-list">
              {portfolioData.roles.map((role, index) => (
                <motion.span
                  key={role}
                  className="role-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                >
                  <Icons.Briefcase size={16} />
                  {role}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Proyectos
          </motion.h2>

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Algunos de mis trabajos recientes
          </motion.p>

          <div className="projects-grid">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Icons.Github size={24} />
                        <span>Code</span>
                      </a>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <Icons.ExternalLink size={24} />
                        <span>Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Contacto
          </motion.h2>

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ¿Tienes un proyecto? ¡Hablemos!
          </motion.p>

          <div className="contact-content">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="contact-card">
                <div className="contact-icon">
                  <Icons.Mail size={32} />
                </div>
                <h3>Email</h3>
                <p>{portfolioData.email}</p>
                <a href={`mailto:${portfolioData.email}`}>Enviar mensaje</a>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  <Icons.Github size={32} />
                </div>
                <h3>GitHub</h3>
                <p>Ver mi código</p>
                <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">Visitar perfil</a>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  <Icons.Linkedin size={32} />
                </div>
                <h3>LinkedIn</h3>
                <p>Conectemos</p>
                <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer">Visitar perfil</a>
              </div>
            </motion.div>

            <motion.form
              className="contact-form"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onSubmit={(e) => {
                e.preventDefault()
                alert('¡Gracias por tu mensaje! Te contactaré pronto.')
              }}
            >
              <div className="form-group">
                <input type="text" placeholder="Tu Nombre" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Tu Email" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Asunto" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Tu Mensaje" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Enviar Mensaje
                <Icons.Send size={18} />
              </button>
            </motion.form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} {portfolioData.name}. Todos los derechos reservados.</p>
          <div className="footer-social">
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">
              <Icons.Github size={20} />
            </a>
            <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer">
              <Icons.Linkedin size={20} />
            </a>
            <a href={`mailto:${portfolioData.email}`}>
              <Icons.Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
