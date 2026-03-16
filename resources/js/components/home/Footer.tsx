import { Link } from "@inertiajs/react";
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import Reveal from "@/components/home/Reveal"; // Import du composant global

// --- Sous-composant Brand ---
const Brand = () => (
  <Link href="/" className="flex items-center" aria-label="Accueil JuriJob">
    <div className="bg-black text-white px-3 py-1 font-bold">JURI</div>
    <div className="border border-black px-3 py-1 font-bold text-black">
      JOB
    </div>
  </Link>
);

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Brand />
              <p className="text-gray-600 my-4 max-w-md">
                La plateforme de référence au Maroc qui met en relation les
                diplômés en droit et les recruteurs. Construire des ponts pour
                la profession juridique.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="bg-black text-white px-2 py-1 rounded text-xs">
                  Spécialisé dans les carrières juridiques
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a
                    href="#about"
                    className="hover:text-black transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-black transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="hover:text-black transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="hover:text-black transition-colors">
                    Conditions d'utilisation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-4">Contact</h4>
              <div className="space-y-2 text-gray-600">
                <p>contact@jurijob.ma</p>
                <div className="flex items-center gap-3 mt-4">
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="text-black hover:text-gray-700 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="X (Twitter)"
                    className="text-black hover:text-gray-700 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="text-black hover:text-gray-700 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="text-black hover:text-gray-700 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Jurijob. Tous droits réservés.</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
