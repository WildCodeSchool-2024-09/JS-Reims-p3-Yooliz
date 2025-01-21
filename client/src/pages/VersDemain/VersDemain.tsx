import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import "./VersDemain.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const SensibilisationPage = () => {
  const [showThermique, setShowThermique] = useState(true);
  const [showElectrique, setShowElectrique] = useState(true);

  const data = {
    labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Moteurs Thermiques (Diesel, Essence)",
        data: [130, 125, 120, 115, 110, 105, 100],
        borderColor: "#FF0000",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        hidden: !showThermique,
      },
      {
        label: "Moteurs Électriques",
        data: [40, 35, 30, 28, 25, 23, 20],
        borderColor: "#00bd84",
        backgroundColor: "rgba(0, 189, 132, 0.5)",
        hidden: !showElectrique,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div className="sensibilisation-page">
      <header className="header">
        <h1 className="header-title">La Transition Écologique et Vous</h1>
        <p className="header-text">
          Découvrez pourquoi passer à un véhicule électrique est bénéfique pour
          la planète et votre quotidien.
        </p>
      </header>

      <section className="transition-ecologique">
        <h2>Pourquoi la transition écologique ?</h2>
        <p>
          La transition vers des énergies renouvelables, comme l'électrique, est
          essentielle pour réduire notre impact sur l'environnement. Les moteurs
          thermiques sont responsables de{" "}
          <strong>25% des émissions de CO₂</strong> en Europe.
        </p>
        <p>
          Passer à un véhicule électrique, c’est contribuer à diminuer ces
          émissions et soutenir un avenir plus durable.
        </p>
      </section>

      <section className="avantages-electrique">
        <h2>Les avantages des véhicules électriques</h2>
        <ul>
          <li>Réduction drastique des émissions de gaz à effet de serre.</li>
          <li>Coûts d’entretien plus bas grâce à une mécanique simplifiée.</li>
          <li>
            Accès aux zones à faibles émissions souvent interdites aux véhicules
            thermiques.
          </li>
          <li>Silence de fonctionnement pour un confort de conduite accru.</li>
        </ul>
      </section>

      <section className="comparaison-co2">
        <h2>
          Comparaison des Émissions de CO2 en g/km sur différents modèles
          (2017-2023)
        </h2>
        <div className="comparaison-co2-chart">
          <Line data={data} options={options} />
        </div>
        <div className="buttons">
          <button
            type="button"
            className="button-thermique"
            onClick={() => setShowThermique(!showThermique)}
          >
            {showThermique ? "Masquer" : "Afficher"} Moteurs Thermiques
          </button>
          <button
            type="button"
            className="button-electrique"
            onClick={() => setShowElectrique(!showElectrique)}
          >
            {showElectrique ? "Masquer" : "Afficher"} Moteurs Électriques
          </button>
        </div>
      </section>

      <section className="faq">
        <h2>FAQ : Questions fréquentes</h2>
        <ul>
          <li>
            <strong>Combien coûte un véhicule électrique ?</strong>
            <p>
              Le prix varie selon les modèles, mais les coûts d’utilisation sont
              souvent inférieurs à ceux des véhicules thermiques.
            </p>
          </li>
          <li>
            <strong>Quelle est l’autonomie moyenne ?</strong>
            <p>
              Les modèles récents offrent une autonomie de 200 à 500 km selon
              l’utilisation et les conditions.
            </p>
          </li>
          <li>
            <strong>Y a-t-il assez de bornes de recharge ?</strong>
            <p>
              Le réseau s’étend rapidement, avec des milliers de nouvelles
              bornes installées chaque année.
            </p>
          </li>
        </ul>
      </section>

      <section className="sources">
        <h2>Sources et Références</h2>
        <ul>
          <li>
            <a
              href="https://www.iea.org/reports/global-ev-outlook-2023"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rapport mondial sur les véhicules électriques (IEA)
            </a>
          </li>
          <li>
            <a
              href="https://www.ipcc.ch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Groupe d’experts intergouvernemental sur l’évolution du climat
              (GIEC)
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default SensibilisationPage;
