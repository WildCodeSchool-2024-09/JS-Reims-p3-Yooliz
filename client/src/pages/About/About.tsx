import "./About.css";

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-info">
            <h2 className="about-logo">
              About
              <br />
              <span> Us</span>
            </h2>
            <div className="about-card">
              <p>
                Car Insight est une site s'adresse aux professionnels (artisans,
                commerçants, profession libérales, TPE, PME) ayant entre 1 et
                plusieurs dizaines de véhicules. Parce qu'il est difficile
                d'avoir l'expertise et la force de négociation pour faire les
                bons choix, Yooliz vous propose un service et un accompagnement
                unique en France pour répondre à l'ensemble de vos besoins
                automobiles.
              </p>
            </div>
          </div>
          <div className="btn-container">
            <a
              href="https://www.yooliz.com/qui-sommes-nous/"
              className="about-btn"
            >
              More Info
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
