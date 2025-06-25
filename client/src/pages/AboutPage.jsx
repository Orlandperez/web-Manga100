import React from 'react'
import "./style-pages/AboutPage.css"

function AboutPage() {
    return (
        <>
        <section className='aboutPage'>
            <div className='aboutInfo'>
            <h1>Somos tu mejor opción</h1>
            <p>En Librería TAO, fusionamos la eficiencia de tu espacio de trabajo con un profundo respeto por el medio ambiente. Nos especializamos en bolsas ecológicas y artículos de oficina, todos pensados para ser no solo funcionales, sino también un reflejo de tus valores. Creemos firmemente que la productividad y la sostenibilidad pueden ir de la mano, permitiéndote operar de forma consciente sin sacrificar la calidad.

Ofrecemos la posibilidad de personalizar nuestros productos con tu logo, transformando cada artículo en una extensión de tu marca y un compromiso con prácticas responsables. Con Librería TAO, equipás tu oficina y promocionás tu empresa, contribuyendo activamente a un futuro más verde.</p>
            </div>
            <div className='aboutMap'>
              <h1>Encontranos en:</h1>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.7879450901827!2d-122.0842496846909!3d37.42199997982557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb24b01010101%3A0x5c551872e3bf88f9!2sGoogleplex!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </section>
        </>
    )
}

export default AboutPage