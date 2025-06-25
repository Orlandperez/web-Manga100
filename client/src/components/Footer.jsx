import React from 'react'
import './style-Component/Footer.css'

function Footer() {
    return (
        <>
            <footer class="footer">
                <div class="footer-content">
                    <div class="footer-section about">
                        <h3>Sobre Nosotros</h3>
                        <p>Somos una empresa dedicada a personalizar la marca de tu empresa.</p>
                    </div>
                    <div class="footer-section social">
                        <h3>Seguinos</h3>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                    <div class="footer-section contact-info">
                        <h3>Contacto</h3>
                        <p>Email: info@tudominio.com</p>
                        <p>Teléfono: +54 11 1234 5678</p>
                        <p>Dirección: Ramones 1234, Buenos Aires, Argentina</p>
                    </div>
                </div>
            </footer>
            <div class="footer-bottom">
                <p>&copy; 2025 Librería TAO. Todos los derechos reservados.</p>
            </div>
        </>

    )
}

export default Footer