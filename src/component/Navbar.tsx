import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";


const links = [
  { label: "Accueil", to: "/" },
  { label: "À propos", to: "/about" },
  { label: "Projets", to: "/projects" },  
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Accueil");

 useEffect(() => {
  const onScroll = () => {
    const sections = document.querySelectorAll("section");
    let current = "Home";

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 120) {
        current = section.id;
      }
    });

    setActive(current);
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);



  const scrollToSection = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const linkClass = (id: string) =>
    `px-3 py-2 rounded-md transition-all ${active === id
      ? "bg-gradient-to-r from-[#4CAF50] to-[#499DDB] shadow-sm "
      : " bg-gradient-to-r from-[#4CAF50] to-[#499DDB] bg-clip-text backdrop-blur-lg text-transparent bg-gray-500/30 border-white/50 hover:bg-black-500/50 hover:scale-105"
    }`;

  return (
    <header className="bg-white pt-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 ">

        {/* LOGO */}
        <motion.p
          initial={{ scale: 0.98, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-300"
        >
          <img src="/logo_sbg.png" alt="Logo" className="w-[60px] h-[60px] inline-block" />
          <span className="text-2xl ml-2 font-medium text-transparent bg-gradient-to-r from-[#4CAF50] to-[#499DDB] bg-clip-text">
            Demo
          </span>
        </motion.p>

        {/* DESKTOP NAV */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 items-center text-sm">
            {links.map((l) => (
              <li key={l.label}>
                <button
                  className={linkClass(l.label)}
                  onClick={() => scrollToSection(l.label)}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2 rounded-md"
        >
          <span className="text-2xl text-transparent bg-gradient-to-r from-[#4CAF50] to-[#499DDB] bg-clip-text">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden backdrop-blur-md"
          >
            <ul className="flex flex-col gap-2 px-6 py-4">
              {links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollToSection(l.label)}
                    className={`w-full text-left ${linkClass(l.label)}`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
