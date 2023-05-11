import { Link } from 'react-router-dom';
import { InstagramIcon, FacebookIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#414141] text-white py-10">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold flex items-center">BarberShop</h2>
            <div className="flex space-x-2 mt-2">
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
            <div className="font-normal mt-2">
              <p> ©2023 BarberShop. All rights reserved</p>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex justify-end items-end">
            <div className="flex space-x-4">
              <p className="text-white mb-4">Termos</p>
              <p className="text-white mb-4">Privacidade</p>
              <p className="text-white mb-4">Cookies</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
