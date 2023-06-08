import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
} from 'lucide-react';
import logoBarbershop from 'assets/logo-barbershop.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#414141] text-white py-6">
      <div className="sm:px-6 lg:px-8 flex flex-col sm:flex-row">
        <div className="text-sm font-medium mb-2 sm:mb-0 ">
          <div className="flex flex-row ">
            <div className="col-span-1 ">
              <img src={logoBarbershop} alt="logo" />
            </div>

            <div className="mt-2">
              <span className="font-face-playlist text-4xl ">Barbershop</span>

              <div className="flex flex-row">
                <div className="w-8 h-8 rounded-full bg-zinc-600 flex justify-center">
                  <Link to="#" className="mt-1">
                    <InstagramIcon />
                  </Link>
                </div>

                <div className="w-8 h-8 rounded-full bg-zinc-600 flex justify-center">
                  <Link to="#" className="mt-1">
                    <FacebookIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-grow justify-between px-5 mt-10">
        <div className="ml-4 flex-initial">
          <p className="font-normal text-xl w-96">
            <sup className="font-face-montserrat">
              © 2023 BarberShop. All rights reserved
            </sup>
          </p>
        </div>

        <div className="flex flex-row items-end gap-9 ">
          <Link to="#" className="font-face-montserrat font-normal text-xl">
            Termos
          </Link>
          <Link to="#" className="font-face-montserrat font-normal text-xl">
            Privacidade
          </Link>
          <Link to="#" className="font-face-montserrat font-normal text-xl">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
