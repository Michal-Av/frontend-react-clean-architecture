import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/UIElements/Select/LanguageSelector";

const Test = () => {
    const { t } = useTranslation();

    return (
        <div>
            <LanguageSelector />
            <h1>{t("welcome")}</h1>
            <p>{t("intro")}</p>
        </div>
    );
};

export default Test;

