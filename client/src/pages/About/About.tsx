import "./About.css";

function QuiSommesNous() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-info">
            <h2 className="about-logo">
              Qui sommes
              <br />
              <span> Nous ?</span>
            </h2>
            <div className="about-card">
              <p>
                Bienvenue sur Drive Insight, votre plateforme pour faciliter la
                transition vers une mobilité plus durable. Nous vous aidons à
                comparer les coûts entre voiture thermique et électrique, en
                prenant en compte des facteurs comme l’émission de CO2, les
                coûts de carburant ou d’électricité, et la consommation.
              </p>
              <br />
              <p className="no-text">
                Avec notre calculateur, vous obtiendrez des données claires pour
                faire un choix éclairé, adapté à vos besoins. Que vous soyez
                convaincu par l’électrique ou simplement curieux, Drive Insight
                est là pour vous guider vers un avenir plus vert.
              </p>
            </div>
          </div>
          <div className="btn-container">
            <a
              href="https://www.yooliz.com/qui-sommes-nous/"
              className="about-btn"
            >
              plus d'info
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuiSommesNous;
