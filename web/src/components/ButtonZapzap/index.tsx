import React from 'react';
import IconZap from 'assets/icon-whatsapp.svg';

const ButtonZapZap: React.FC = () => {
  const whatsappLink = "https://wa.me/5512991018663";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-10 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition duration-300"
    >
     <img src={IconZap} alt="Whatsapp" className=' w-[3rem] h-[3rem]' />
    </a>
  );
};

export default ButtonZapZap;
