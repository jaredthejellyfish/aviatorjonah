import React, { useState, useRef, useEffect } from "react";

interface CountrySelectorProps {
	value: string;
	onChange: (country: string) => void;
	required?: boolean;
	"aria-label"?: string;
	"aria-invalid"?: boolean;
	"aria-describedby"?: string;
}

const countries = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"Andorra",
	"Angola",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bhutan",
	"Bolivia",
	"Bosnia and Herzegovina",
	"Botswana",
	"Brazil",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cape Verde",
	"Central African Republic",
	"Chad",
	"Chile",
	"China",
	"Colombia",
	"Comoros",
	"Congo",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Cyprus",
	"Czech Republic",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"East Timor",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Fiji",
	"Finland",
	"France",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Greece",
	"Grenada",
	"Guatemala",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Honduras",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea, North",
	"Korea, South",
	"Kosovo",
	"Kuwait",
	"Kyrgyzstan",
	"Laos",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Mauritania",
	"Mauritius",
	"Mexico",
	"Micronesia",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"North Macedonia",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Poland",
	"Portugal",
	"Qatar",
	"Romania",
	"Russia",
	"Rwanda",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Togo",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom",
	"United States",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Vatican City",
	"Venezuela",
	"Vietnam",
	"Yemen",
	"Zambia",
	"Zimbabwe",
];

const CountrySelector: React.FC<CountrySelectorProps> = ({
	value,
	onChange,
	required = false,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState(value);
	const [filteredCountries, setFilteredCountries] = useState(countries);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		setSearchTerm(value);
	}, [value]);

	useEffect(() => {
		const filtered = countries.filter((country) =>
			country.toLowerCase().includes(searchTerm.toLowerCase()),
		);
		setFilteredCountries(filtered);
	}, [searchTerm]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setIsOpen(true);
		if (!isOpen) setIsOpen(true);
	};

	const handleSelectCountry = (country: string) => {
		onChange(country);
		setSearchTerm(country);
		setIsOpen(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && filteredCountries.length > 0) {
			e.preventDefault();
			handleSelectCountry(filteredCountries[0]);
		} else if (e.key === "Escape") {
			setIsOpen(false);
		}
	};

	return (
		<div className="relative" ref={wrapperRef}>
			<input
				type="text"
				required={required}
				className="mt-2 block w-full px-4 py-3 rounded-lg bg-gray-700/50 border-gray-600/50 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400 transition-colors duration-200 placeholder-gray-400"
				value={searchTerm}
				onChange={handleInputChange}
				onFocus={() => setIsOpen(true)}
				onKeyDown={handleKeyDown}
				placeholder="Start typing a country name..."
				role="combobox"
				aria-expanded={isOpen}
				aria-autocomplete="list"
				aria-controls="country-listbox"
				{...props}
			/>

			{isOpen && filteredCountries.length > 0 && (
				<ul
					id="country-listbox"
					role="listbox"
					className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-lg bg-gray-800 border border-gray-700 shadow-lg"
				>
					{filteredCountries.map((country) => (
						<li
							key={country}
							role="option"
							aria-selected={country === value}
							className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-200"
							onClick={() => handleSelectCountry(country)}
						>
							{country}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CountrySelector;
