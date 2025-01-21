import { useState } from "react";
import FilAriane from "../../components/FilAriane";
import Matricule from "../../components/Matricule";

function Home() {
  const [progress, setProgress] = useState({
    Matricule: true,
    Habits: false,
    Options: false,
    Results: false,
  });

  const handleValidation = (step: keyof typeof progress) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [step]: true,
    }));
  };

  return (
    <>
      <FilAriane currentStep="Matricule" progress={progress} />
      <Matricule onValidate={() => handleValidation("Habits")} />
    </>
  );
}

export default Home;
