import React from 'react'
import "./style-pages/AboutPage.css"

function AboutPage() {
    return (
        <>
        <section className='aboutPage'>
            <div className='aboutInfo'>
            <h1>¡Bienvenidos a Manga 100%!</h1>
            <p>Somos mucho más que una tienda de mangas; somos un espacio creado por y para apasionados del manga como vos. Desde el primer tomo que nos apasionó hasta la última novedad que nos mantiene en vilo, entendemos la emoción de sumergirse en mundos fantásticos y conectar con historias inolvidables.
               En Manga 100%, nos dedicamos a ofrecerte una cuidadosa selección de los mejores títulos, desde los clásicos atemporales que forjaron la cultura manga hasta las últimas series que están revolucionando la escena. Queremos que cada visita sea una aventura, donde descubras tu próxima obsesión o encuentres ese volumen que tanto buscabas.
               Nuestro compromiso es brindarte una experiencia de compra excepcional. Nos esforzamos por tener un catálogo siempre actualizado, precios competitivos y, lo más importante, un equipo que comparte tu pasión y está listo para asesorarte. Creemos en la importancia de la comunidad, y es por eso que buscamos ser un punto de encuentro para todos los que amamos el arte y la narrativa del manga.
               ¡Gracias por elegirnos! Esperamos verte pronto y compartir contigo la magia de cada página.</p>
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