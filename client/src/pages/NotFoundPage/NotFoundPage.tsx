import { useEffect } from "react";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404 - Page non trouvée | Drive Insight";
  }, []);
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">Page non trouvée</h1>
        <p className="not-found-text">
          Oups, la page que vous cherchez n'existe pas.
        </p>
        <p className="back-to-home-link">
          <a href="/">Retournez à l'accueil</a> ou explorez d'autres pages.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
