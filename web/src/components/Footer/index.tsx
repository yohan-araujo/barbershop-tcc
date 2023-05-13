import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
} from 'lucide-react';
import logoBarbershop from 'assets/logo-barbershop.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#414141] text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm font-medium mb-2 sm:mb-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="ml-20">
              <img src={logoBarbershop} alt="logo" />
            </div>
            <div className="mt-2">
              <span className="font-face-playlist text-4xl ">Barbershop</span>
              <div className="flex flex-row">
                <div className="w-8 h-8 rounded-full bg-zinc-600 flex justify-center">
                  <Link to="" className="mt-1">
                    <InstagramIcon />
                  </Link>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-600 flex justify-center">
                  <Link to="" className="mt-1">
                    <FacebookIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-white">
          <div className="flex flex-row gap-9 justify-end">
            <Link to="" className="font-face-montserrat font-normal text-xl">
              Termos
            </Link>
            <Link to="" className="font-face-montserrat font-normal text-xl">
              Privacidade
            </Link>
            <Link to="" className="font-face-montserrat font-normal text-xl">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
