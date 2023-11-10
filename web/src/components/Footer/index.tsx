import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  PhoneCall as PhoneCallIcon,
  Mail as MailIcon,
  MapPin as MapPinIcon,
} from "lucide-react";
import logoBarbershop from "assets/logo-barbershop.svg";
import { Link } from "react-router-dom";
import whatsappIcon from "assets/whatsapp.svg";
import barbershopIcon from "assets/barbershop-icon.svg";

const Footer = () => {
  return (
    <footer className="w-min-full bg-[#000000] border-t-2 border-orange-400 text-white py-2">
      <div className="sm:px-6 lg:px-8 flex flex-col sm:flex-row">
        <div className="flex col-auto mx-14">
          <img className=" m-2" src={barbershopIcon} alt="Logo"></img>
        </div>

        <div className="flex flex-col p-4 mx-14">
          <h5 className="w-full text-white text-base font-semibold font-face-montserrat text-center mb-7 p-3">
            Contatos
          </h5>
          <div className="flex items-center mb-2">
            <FacebookIcon />
            <div className="ml-2 text-white text-sm font-normal font-face-montserrat">
              Facebook
            </div>
          </div>
          <div className="flex items-center mb-2">
            <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6" />
            <div className="ml-2 text-white text-sm font-normal font-face-montserrat">
              WhatsApp
            </div>
          </div>
          <div className="flex items-center mb-2">
            <InstagramIcon />
            <div className="ml-2 text-white text-sm font-normal font-face-montserrat">
              Instagram
            </div>
          </div>
        </div>

        <div className="flex flex-col p-4 mx-14">
          <h5 className="w-full text-white text-base font-semibold font-face-montserrat text-left mb-7 p-3">
            Redes Sociais
          </h5>
          <div className="flex items-center mb-2">
            <PhoneCallIcon />
            <div className="ml-2 text-white text-sm font-normal font-face-montserrat">
              (12) 3216-2538
            </div>
          </div>
          <div className="flex items-center mb-2">
            <MailIcon />
            <div className="ml-2 text-white text-sm font-normal font-face-montserrat">
              barbershop.legal@gmail.com
            </div>
          </div>
          <div className="flex items-center mb-2">
            <MailIcon />
            <div className="ml-2 text-white text-sm font-normal font-face-montserrat">
              Rua: Manoel Peixoto Nº:120 Parque da Penha
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-orange-400">
        <div className="flex justify-between my-4 mx-14">
          <div>
            <p className="font-face-montserrat font-normal text-sm">
              © 2023 BarberShop. All rights reserved
            </p>
          </div>

          <div className="flex gap-9">
            <Link to="#" className="font-face-montserrat font-normal text-sm">
              Termos
            </Link>
            <Link to="#" className="font-face-montserrat font-normal text-sm">
              Privacidade
            </Link>
            <Link to="#" className="font-face-montserrat font-normal text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
