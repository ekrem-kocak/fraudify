import { useTranslation } from "react-i18next";

export function LanguageSelector(props) {
  const { i18n } = useTranslation();

  const onSelectLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };

  // eslint-disable-next-line react/prop-types
  const { className } = props;
  return (
    <div className={className}>
      <div className="d-flex">
        <img
          src="https://flagcdn.com/24x18/tr.png"
          width="24"
          height="18"
          alt="Turkce"
          role="button"
          className="me-2"
          onClick={() => onSelectLanguage("tr")}
        ></img>
        <img
          src="https://flagcdn.com/24x18/us.png"
          width="24"
          height="18"
          alt="English"
          role="button"
          onClick={() => onSelectLanguage("en")}
        ></img>
      </div>
    </div>
  );
}
