import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer w-full bg-black shadow">
      <div className="container mx-auto px-6 md:px-12 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand and Copyright */}
          <div className="text-white text-center md:text-left text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-yellow-400">Linkify</span>. All
            rights reserved.
          </div>

          {/* Creator and Social Links */}
          <div className="text-center md:text-right">
            <span className="text-white text-sm">
              Crafted with ❤️ by{" "}
              <span className="font-bold text-yellow-400">
                Suraj Gharpankar
              </span>
            </span>
            <div className="flex justify-center md:justify-end mt-2 gap-4">
              <a
                href="https://github.com/surajgharpankar28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=surajgharpankar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://x.com/surajgharpankar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="mailto:surajgharpankar28@gmail.com"
                className="text-white hover:text-yellow-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
