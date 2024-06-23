// src/components/CountryList.tsx
import React, { useState, useEffect } from "react";
import { fetchCountries } from "../api/countries";
import { Country } from "../types/country";
import CountryCard from "./CountryCard";
import "../index.css";

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    getCountries();
  }, []);

  const handleSelectCountry = (country: Country) => {
    if (
      !selectedCountries.some(
        (selectedCountry) =>
          selectedCountry.name.common === country.name.common,
      )
    ) {
      setSelectedCountries([...selectedCountries, country]);
    } else {
      setSelectedCountries(
        selectedCountries.filter(
          (selectedCountry) =>
            selectedCountry.name.common !== country.name.common,
        ),
      );
    }
  };

  const filteredCountries = countries.filter(
    (country) =>
      !selectedCountries.some(
        (selectedCountry) =>
          selectedCountry.name.common === country.name.common,
      ),
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mt-12">
        Favorite Countries
      </h2>
      <div className="selected-country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {selectedCountries.map((country) => (
          <CountryCard
            key={country.name.common}
            country={country}
            onSelect={handleSelectCountry}
            isSelected={true}
          />
        ))}
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">Countries</h1>
      <div className="country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.name.common}
            country={country}
            onSelect={handleSelectCountry}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
