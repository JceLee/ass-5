import axios from "axios";
import { Country } from "../types/country";

const API_URL = "https://restcountries.com/v3.1/all";

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
