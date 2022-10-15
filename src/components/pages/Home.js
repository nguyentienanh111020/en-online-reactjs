import { useEffect } from "react";
import "../../App.css";

import HeroSection from "../HeroSection";

function Home() {
  useEffect(() => {
    window.onload = function () {
      if (window.location.hash !== "#loaded") {
        window.location.hash = "#loaded";
        window.location.reload();
      }
    };
    window.onload();
  }, []);
  return (
    <>
      <HeroSection />
    </>
  );
}

export default Home;
