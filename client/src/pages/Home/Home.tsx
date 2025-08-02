import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import './Home.css'

function Home() {
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
        <button><FaArrowLeft /></button>
        <button><FaArrowRight /></button>
      </section>
    </main>
  )
}

export default Home