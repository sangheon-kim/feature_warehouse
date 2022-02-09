import React from "react";
import { useTranslation } from "next-i18next";
import { Wrapper } from "src/containers/MainContainer.css";

type Props = {};

const MainContainer: React.FC<Props> = () => {
  const { t } = useTranslation("common");
  return <div className={Wrapper}>{t("greeting")}</div>;
};

export default React.memo(MainContainer);
