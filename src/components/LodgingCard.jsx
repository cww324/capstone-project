// src/components/LodgingCard.jsx

export const LodgingCard = ({ lodging }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border hover:scale-105 transition-transform duration-200 w-full aspect-square flex flex-col">
      <img
        src={lodging.imageUrl}
        alt={lodging.name}
        className="w-full h-1/2 object-cover"
      />
      <div className="p-3 text-sm flex-grow flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-base truncate">{lodging.name}</h2>
          <p className="text-gray-600 text-sm">{lodging.city}</p>
        </div>
        <p className="text-gray-800 font-bold mt-1">
          ${lodging.pricePerNight}/night
        </p>
      </div>
    </div>
  );
};
