import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationButton from '../components/UIElements/buttons/Navigation.button';
import Favorite from '../components/Containers/Favorite/Favorite';
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/UIElements/select/LanguageSelector";
import sunnyday from '../assets/images/sunnyday.jpg';
import { deleteFavorites, getAllFavorites, getlocalfavorites } from '../services/api';

/**
 * 
 * @returns the favorites 
 * show data from localhost server
 * show cards of the favorite city the user save
 * @include the favoriteComp.
 */
function FavoritesComp() {
  const [favorites, setfavorites] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(sunnyday);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const { t } = useTranslation();

  /**
   * useEffect start when the page load 
   * send getAllFavorite API to the local server
   */
  useEffect(() => {
    getAllFavorites()
      .then(resp => { setfavorites(resp.data); })

  }, [])

  /**
   * 
   * @param {Object} id
   * delete the card and refresh the window  
   */
  const deletefavor = async (id) => {
    await deleteFavorites(id);
    window.location.reload();
  }

  /**
   * repeater on the list from the sever and translate it to Favorite Card
   * load component Favorite
   */
  let favo_items = favorites.map((item, index) => {
    return (
      <div className='favo-wrapper card favo' key={index}>
        <Favorite favorite={item} callbackDelete={data => deletefavor(data)} />
      </div>
    );
  });


  return (
    <div className={`home background-wrapper ${currentLanguage === 'he' ? 'right-align' : ''}`} style={{
      backgroundImage: `url(${backgroundImage})`,
    }}>
      <div className="row justify-content-between">
        <NavigationButton to={`/`} buttonText={t("buttonhome")} />
        <div className="col-auto">
          <LanguageSelector onLanguageChange={setCurrentLanguage} />
        </div>
      </div>
      <h1 className="welcome-heading"> {t("titlefavor")} </h1>
      <div className="city container">
        <div className="favo-container">
          {favo_items}
        </div>
      </div>
    </div>
  );
}
export default FavoritesComp;

