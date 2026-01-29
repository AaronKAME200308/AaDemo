import { Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="py-6 text-center bg-gradient-to-r from-[#4CAF50] to-[#499DDB]">
        
        {/* Réseaux sociaux */}
        <div className="flex justify-center gap-6 mb-3">
          <a
            href="https://www.linkedin.com/in/aaron-kame-mouele-b82619289/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-all duration-300 hover:scale-125 hover:opacity-90"
          >
            <Linkedin size={28} strokeWidth={1.8} color="white"/>
          </a>

          <a
            href="https://github.com/AaronKAME200308"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-all duration-300 hover:scale-125 hover:opacity-90"
          >
            <Github size={28} strokeWidth={1.8} color="white" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xm opacity-95 text-white">
          © {new Date().getFullYear()} Aaron KAME MOUELE — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
