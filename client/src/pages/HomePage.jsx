import React from 'react';
import ProductsPage from './ProductsPage';
import { useState } from 'react';
import './style-pages/HomePage.css';
import { Link } from 'react-router-dom';

import dragonBall from "../assets/dragonBall.jpg";
import quintiDiosas from "../assets/quintidiosas.jpg";
import one from "../assets/one.jpg";


const slides = [
    {
        img: dragonBall,
        title: "Tu tienda preferida",
        desc: "Siempre cerca",
        button: { text: "Encontranos", link: "#" },
    },
    {
        img: quintiDiosas,
        title: "Desde 2010",
        desc: "Brindando los mejores mangas",
        button: { text: "Conocenos", link: "" },
    },
    {
        img: one,
        title: "Encontrá nuestras novedades",
        desc: "A los mejores precios del mercado",
        button: { text: "Descubrilos", link: "/products" },
    },
];
export default function HomePage() {

    const [current, setCurrent] = useState(0);
    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    return (
        <>
        <section className="slider-home">
            <div className="slider-img-container">
                <img src={slides[current].img} alt="slide" className="slider-img" />
                <div className="slider-overlay" />
                <div className="slider-content">
                     <h1>{slides[current].title}</h1>
                    <p>{slides[current].desc}</p>
                    <Link to={slides[current].button.link} className="slider-btn">
                         {slides[current].button.text}
                    </Link>
                </div>
                <button className="slider-nav left" onClick={prevSlide}>&lt;</button>
                <button className="slider-nav right" onClick={nextSlide}>&gt;</button>
            </div>
        </section>
        <ProductsPage />
        </>
    );
}

//



