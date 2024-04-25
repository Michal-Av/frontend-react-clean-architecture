import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { addCityToFavorites } from '../../../services/api';
import { useTranslation } from "react-i18next";

export default function FavoriteButton({ city, datacity, nextdays, lang }) {
  const { t } = useTranslation();

  
/**
 * add city with the current data to the favorite in local server
 */
const addCityFavor = async () => {
    try {
      if (!city || !datacity?.location || !nextdays) {
        throw new Error('Invalid data structure: Required properties are missing');
      }
  
      const cityData = {
        name: city.name,
        country: datacity.location.country,
        date: datacity.location.localtime,
        temp_c: datacity.current?.temp_c,
        icon: datacity.current?.condition?.icon,
        description: nextdays[0]?.day?.condition?.text,
        mintemp_c: nextdays[0]?.day?.mintemp_c,
        maxtemp_c: nextdays[0]?.day?.maxtemp_c,
        feel_like: datacity.current?.feelslike_c,
        humidity: datacity.current?.humidity,
        wind_kph: datacity.current?.wind_kph,
        wind_dir: datacity.current?.wind_dir,
        uv: datacity.current?.uv
      };
  
      console.log('cityData:', cityData);
  
      const response = await addCityToFavorites(cityData);
      alert('The city added to your favorites');
    } catch (error) {
      console.error('Error adding city to favorites:', error);
    }
  };

  return (
    <Button className='button' onClick={addCityFavor} endIcon={<FavoriteIcon sx={{ fontSize: 35 }} />}>
      {t("addfavor")}
    </Button>
  );
}