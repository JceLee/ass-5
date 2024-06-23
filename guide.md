Step-by-Step 가이드라인
Step 1: 프로젝트 설정
Vite 프로젝트 생성

Vite를 사용하여 새로운 React 프로젝트를 생성합니다.
bash
Copy code
npm create vite@latest my-country-app -- --template react-ts
cd my-country-app
npm install
Tailwind CSS 설치

Tailwind CSS를 설치하고 설정합니다.
bash
Copy code
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Tailwind CSS 설정 파일 수정



Step 2: API 호출 설정
API 폴더 생성 및 API 호출 함수 작성

src/api 폴더를 생성하고, countries.ts 파일을 만들어 API 호출 함수를 작성합니다.
ts
Copy code
// src/api/countries.ts
import axios from 'axios';
import { Country } from '../types/country';

const API_URL = 'https://restcountries.com/v3.1/all';

export const fetchCountries = async (): Promise<Country[]> => {
const response = await axios.get(API_URL);
return response.data;
};
타입 정의

src/types 폴더를 생성하고, country.ts 파일을 만들어 타입을 정의합니다.
ts
Copy code
// src/types/country.ts
export interface Country {
name: {
common: string;
official: string;
nativeName: { [key: string]: { official: string; common: string } };
};
tld: string[];
cca2: string;
ccn3: string;
cca3: string;
cioc?: string;
independent: boolean;
status: string;
unMember: boolean;
currencies: { [key: string]: { name: string; symbol: string } };
idd: { root: string; suffixes: string[] };
capital: string[];
altSpellings: string[];
region: string;
subregion: string;
languages: { [key: string]: string };
translations: { [key: string]: { official: string; common: string } };
latlng: number[];
landlocked: boolean;
borders?: string[];
area: number;
demonyms: { eng: { f: string; m: string } };
flag: string;
maps: { googleMaps: string; openStreetMaps: string };
population: number;
gini?: { [key: string]: number };
fifa?: string;
car: { signs: string[]; side: string };
timezones: string[];
continents: string[];
flags: { png: string; svg: string };
coatOfArms: { png?: string; svg?: string };
startOfWeek: string;
capitalInfo: { latlng: number[] };
postalCode?: { format: string; regex: string };
}
Step 3: 컴포넌트 작성
CountryCard 컴포넌트

src/components/CountryCard.tsx 파일을 생성하고, CountryCard 컴포넌트를 작성합니다.
tsx
Copy code
// src/components/CountryCard.tsx
import React from 'react';
import { Country } from '../types/country';

interface CountryCardProps {
country: Country;
onSelect: (country: Country) => void;
isSelected?: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onSelect, isSelected }) => {
return (
<div
className={`country-card p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform ${
isSelected ? 'bg-green-100 border border-green-500' : ''
}`}
onClick={() => onSelect(country)}
>
<img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="w-20 h-auto mx-auto mb-4" />
<h3 className="text-xl font-semibold mb-2">{country.name.common}</h3>
<p className="text-gray-600">{country.capital ? country.capital[0] : 'N/A'}</p>
</div>
);
};

export default CountryCard;
CountryList 컴포넌트

src/components/CountryList.tsx 파일을 생성하고, CountryList 컴포넌트를 작성합니다.
tsx
Copy code
// src/components/CountryList.tsx
import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../api/countries';
import { Country } from '../types/country';
import CountryCard from './CountryCard';
import '../index.css';

const CountryList: React.FC = () => {
const [countries, setCountries] = useState<Country[]>([]);
const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

useEffect(() => {
const getCountries = async () => {
try {
const countriesData = await fetchCountries();
setCountries(countriesData);
} catch (error) {
console.error('Error fetching countries:', error);
}
};

    getCountries();
}, []);

const handleSelectCountry = (country: Country) => {
if (!selectedCountries.some(selectedCountry => selectedCountry.name.common === country.name.common)) {
setSelectedCountries([...selectedCountries, country]);
} else {
setSelectedCountries(selectedCountries.filter(selectedCountry => selectedCountry.name.common !== country.name.common));
}
};

const filteredCountries = countries.filter(country =>
!selectedCountries.some(selectedCountry => selectedCountry.name.common === country.name.common)
);

return (
<div className="container mx-auto p-6">
<h1 className="text-3xl font-bold text-center mb-8">Countries</h1>
<div className="country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
{filteredCountries.map(country => (
<CountryCard
key={country.name.common}
country={country}
onSelect={handleSelectCountry}
/>
))}
</div>
<h2 className="text-2xl font-semibold text-center mt-12">Favorite Countries</h2>
<div className="selected-country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
{selectedCountries.map(country => (
<CountryCard
key={country.name.common}
country={country}
onSelect={handleSelectCountry}
isSelected={true}
/>
))}
</div>
</div>
);
};

export default CountryList;
App 컴포넌트

src/App.tsx 파일을 생성하고, App 컴포넌트를 작성합니다.
tsx
Copy code
// src/App.tsx
import React from 'react';
import CountryList from './components/CountryList';
import './index.css';

const App: React.FC = () => {
return (
<div>
<CountryList />
</div>
);
};

export default App;
Step 4: 프로젝트 실행 및 확인
프로젝트 실행

프로젝트를 실행하여 결과를 확인합니다.
bash
Copy code
npm run dev
테스트 및 디버깅

애플리케이션이 의도한 대로 동작하는지 확인하고, 필요한 경우 디버깅합니다.
제출하기 전 확인할 사항
모든 요구사항이 구현되었는지 확인합니다.
코드를 정리하고 불필요한 주석이나 콘솔 로그를 제거합니다.
프로젝트를 최종 테스트하여 오류가 없는지 확인합니다.