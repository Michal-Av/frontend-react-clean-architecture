import React, { useState, useEffect } from 'react';
import useDebounce from '../utils/useDebounce';
import '../styles/weather.css'
import '../App.css';
import sunnyday from '../assets/images/sunnyday.jpg';
import CurrentWeatherComp from '../components/Containers/Weather/CurrentWeather';
import SearchInput from '../components/UIElements/Input/SearchInput';
import SuggestionItem from '../components/UIElements/Input/SuggestionItem';
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/UIElements/select/LanguageSelector";
import { searchCities, getCurrentWeather, get5DayForecast } from '../services/api';
import NavigationButton from '../components/UIElements/buttons/Navigation.button';

/**
 * 
 * The main comp of the app
 * show the search input and the option to navigate to the favorite
 * @include the CityComp after choosing city.
 */
function WeatherComp() {
  const [cities, setCities] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isDay, setIsDay] = useState(true);
  const [isChosen, setIsChosen] = useState(false);
  const [fivenext, setfivenext] = useState([]);
  const [dataCity, setDataCity] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(sunnyday);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [langKey, setLangKey] = useState(0);

  const debouncedText = useDebounce(text, 300);
  const { t } = useTranslation();

  /**
   * useEffect depend on the debounce and minimum 3 char in search
   * @returns the cities by searchline from autocomplete API
   */
  useEffect(async () => {
    let matches = [];
    if (text.length > 3) {
      searchCities(text)
        .then(resp => {
          setCities(resp.data);
          matches = resp.data.filter(city => {
            return city.country === "Israel"
          });
          setSuggestions(matches);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }, [debouncedText, text, t]);

  /**
   * useEffect start when specific city chosen 
   * @returns the data on the city from current-city API
   * @return the data of forcast for 5 days from API
   */
  useEffect(async () => {
    if (isChosen) {
      getCurrentWeather(currentCity.name)
        .then(resp => {
          setDataCity(resp.data);

        })
        .catch(error => {
          console.log(error.response);
        });
      get5DayForecast(currentCity.name)
        .then(resp => {
          setfivenext(resp.data.forecast.forecastday);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }, [currentCity]);

  /**
   * 
   * @param {object} suggestion 
   * setting the Hooks after specific city
   */
  const onSuggestHandler = (suggestion) => {
    setText(suggestion.name); // Set text to the suggestion name
    setCurrentCity(suggestion); // Set currentCity to the chosen suggestion
    setIsChosen(true); // Set isChosen to true when suggestion is chosen
    setSuggestions([]); // Clear suggestions
  }

  /**
   * save the exist lung after refresh
   */
  const handleLanguageChange = () => {
    setLangKey(prevKey => prevKey + 1);
  };


  return (
    <div className="container">
      <div className="background-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="home">
          <div className="row justify-content-between">
            <NavigationButton buttonText={t("buttonfavor")} to={`/favorites`} />
            <LanguageSelector onLanguageChange={handleLanguageChange} />
          </div>
          <div className="container-fluid">
            <h1 className="welcome-heading"> </h1>
            <p className={`welcome-text ${currentLanguage === 'he' ? 'right-align' : ''}`}>{t("searchline")}</p>
            <SearchInput value={text} onChange={e => setText(e.target.value)} />
            {suggestions && suggestions.map((suggestion, i) =>
              <SuggestionItem key={suggestion.id} suggestion={suggestion} onSuggestHandler={() => onSuggestHandler(suggestion)} />
            )}
          </div>
          <div>
            {isChosen && <CurrentWeatherComp city={currentCity} datacity={dataCity} nextdays={fivenext} lang={currentLanguage} langKey={langKey} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherComp;
