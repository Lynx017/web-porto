import { Routes, Route, Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa"

// ------------------- Parallax Background -------------------
function ParallaxBackground() {
  const bgRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY * 0.3
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${offset}px)`
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 -z-10 transition-transform duration-300"
    ></div>
  )
}

// ------------------- Scroll Animation Wrapper -------------------
function FadeInSection({ children }) {
  const ref = useRef(null)
  const controls = useAnimation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) controls.start("visible")
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// ------------------- Navbar -------------------
function Navbar() {
  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ]

  return (
    <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-teal-400 tracking-wider hover:scale-105 transition-transform">
        MyPortfolio
      </h1>
      <div className="flex gap-8">
        {links.map((link) => (
          <motion.div key={link.path} whileHover={{ scale: 1.1 }}>
            <Link
              to={link.path}
              className="text-lg text-gray-400 hover:text-teal-400 transition-colors duration-300"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </div>
    </nav>
  )
}

// ------------------- Page Transition -------------------
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

// ------------------- Home -------------------
function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.img
        src="/profile.jpg"
        alt="Profile"
        className="w-40 h-40 rounded-full mx-auto border-4 border-teal-400 mb-6 shadow-lg"
        whileHover={{ scale: 1.1, rotate: 2 }}
      />
      <h2 className="text-3xl font-semibold tracking-wide">Halo, Saya [Nama Kamu]</h2>
      <p className="text-gray-400 mt-3 leading-relaxed max-w-2xl mx-auto">
        Seorang profesional muda yang bersemangat dalam bidang teknologi, data, dan analisis keuangan.  
        Saya suka membangun solusi digital yang berdampak dan efisien.
      </p>
    </motion.div>
  )
}

// ------------------- About -------------------
function About() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <FadeInSection>
        <h2 className="text-3xl font-semibold mb-4 text-teal-400">Tentang Saya</h2>
        <p className="text-gray-300 leading-relaxed">
          Saya memiliki pengalaman kerja selama 2 tahun di bidang administrasi produksi dan sedang menempuh pendidikan di jurusan Akuntansi.
          Saya tertarik pada data, analisis keuangan, dan pengembangan teknologi untuk efisiensi bisnis.
        </p>
      </FadeInSection>

      <FadeInSection>
        <h3 className="mt-6 text-2xl text-teal-300">Skill</h3>
        <ul className="grid grid-cols-2 gap-2 mt-2 text-gray-400">
          <li>React & JavaScript</li>
          <li>HTML & CSS</li>
          <li>Data Analysis (Excel, SQL)</li>
          <li>Financial Reporting</li>
        </ul>
      </FadeInSection>
    </motion.div>
  )
}

// ------------------- Projects -------------------
function Projects() {
  const projectList = [
    {
      title: "Analisis Keuangan BNI",
      desc: "Proyek analisis laporan keuangan BNI menggunakan rasio dan visualisasi data untuk insight bisnis.",
    },
    {
      title: "Dashboard Data Produksi",
      desc: "Membangun dashboard interaktif dengan Tableau untuk memantau performa produksi kelapa sawit.",
    },
  ]

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-semibold mb-4 text-teal-400">Proyek</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projectList.map((p, i) => (
          <FadeInSection key={i}>
            <motion.div
              className="bg-gray-800 p-5 rounded-xl shadow-lg cursor-pointer border border-gray-700"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#1f2937",
                boxShadow: "0 0 25px rgba(20,184,166,0.2)",
              }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <h3 className="text-xl font-semibold text-teal-300">{p.title}</h3>
              <p className="text-gray-400 mt-2">{p.desc}</p>
            </motion.div>
          </FadeInSection>
        ))}
      </div>
    </motion.div>
  )
}

// ------------------- Contact -------------------
function Contact() {
  const icons = [
    { icon: <FaEnvelope />, href: "mailto:emailkamu@gmail.com" },
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/username" },
    { icon: <FaInstagram />, href: "https://instagram.com/username" },
  ]

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <FadeInSection>
        <h2 className="text-3xl font-semibold mb-4 text-teal-400">Kontak</h2>
        <p className="text-gray-400 mb-6">
          Jangan ragu untuk terhubung dengan saya melalui platform berikut:
        </p>
        <div className="flex justify-center gap-8 text-3xl">
          {icons.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, color: "#14b8a6" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </div>
      </FadeInSection>
    </motion.div>
  )
}

// ------------------- Main App -------------------
export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-transparent text-white font-sans overflow-hidden">
      <ParallaxBackground />
      <Navbar />
      <main className="p-10 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}
