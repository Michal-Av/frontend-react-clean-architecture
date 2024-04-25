import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = ({ onLanguageChange }) => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    useEffect(() => {
        document.body.dir = i18n.dir();
    }, [i18n]);

    const changeLanguage = (lng) => {
        onLanguageChange(lng);
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng); // Save language preference to local storage
    };

    const textDirection = i18n.dir();

    return (
        <div dir={textDirection}>
            <select onChange={(e) => changeLanguage(e.target.value)}>
                <option value="en">{t("English")}</option>
                <option value="he">{t("Hebrew")}</option>
            </select>
        </div>
    );
};

export default LanguageSelector;
