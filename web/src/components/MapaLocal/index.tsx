import React from "react";

const MapaLocal = () => {
  const googleMapsApiKey = "AIzaSyA6SFJ8Mp_z0q_KtvgLCPpIy9Sus6KtwG8";

  const enderecoLocal = "FATEC Guaratinguetá - Prof. João Mod";

  const mapaEndereco = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    enderecoLocal
  )}&zoom=16&size=800x420&markers=color:red|label:B|${encodeURIComponent(
    enderecoLocal
  )}&key=${googleMapsApiKey}`;

  const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    enderecoLocal
  )}`;

  return (
    <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
      <img
        src={mapaEndereco}
        alt="Mapa da localização"
        className="w-[40rem] h-[25rem]"
      />
    </a>
  );
};

export default MapaLocal;
