import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import './Home.css'
import { useState } from "react";

function Home() {

  //Toda la logica del carrusel de imagenes
  const [currentImgIndex, setcurrentImgIndex] = useState(0);

  const images = ["/imgHome1.jpg", "/imgHome2.jpg", "/imgHome3.jpg"];

  const indicators = images.map((_, index) => (
    <div 
      key={index}
      className="indicator" 
      style={{ background: currentImgIndex === index ? "white" : "transparent" }}
    ></div>
  ))
  
  const nextImage = () => {
    setcurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setcurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main>

      {/* Seccion de introduccion textual */}
      <section className="textSection">

        <p>Optimize your finances</p>

        <h1>Calculate your future home costs based on your income and plan ahead easily</h1>

        <p>With our innovative platform, you can plan, save, and track through statistics how soon you can purchase your own home.</p>

        <div>
          <Link to="/viewPlans" className="plansLink btn">View plans</Link>
          <Link to="/auth" className="authLink btn">Get started</Link>
        </div>
      </section>

      {/* Seccion de fotos */}
      <section className="photoSection">

        {/* Indicadores */}
        <div className="indicatorContainer">
          {indicators}
        </div>

        {/* Botones */}
        <button className="left" onClick={prevImage}><FaArrowLeft /></button>
        <button className="right" onClick={nextImage}><FaArrowRight /></button>

        {/* Imagenes */}
        <div className="slider">
          <div 
            className="slides"
            style={{ transform: `translateX(-${currentImgIndex * 100}%)` }}
          >
            {images.map((src, i) => (
              <img key={i} src={src} alt={`Slide ${i}`} />
            ))}            
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home