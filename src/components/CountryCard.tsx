// src/components/CountryCard.tsx
import React from "react";
import { Country } from "../types/country";

interface CountryCardProps {
  country: Country;
  onSelect: (country: Country) => void;
  isSelected?: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={`country-card p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform ${
        isSelected ? "bg-green-100 border border-green-500" : ""
      }`}
      onClick={() => onSelect(country)}
    >
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        className="w-20 h-auto mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{country.name.common}</h3>
      <p className="text-gray-600">
        {country.capital ? country.capital[0] : "N/A"}
      </p>
    </div>
  );
};

export default CountryCard;
