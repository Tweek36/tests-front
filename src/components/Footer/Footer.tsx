//Footer.tsx
import React from "react";
import './Footer.css'

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="footer-conteiner">
                <div className="footer-left-side">
                    <p>
                        Все права не защищены 2024 :(
                    </p>
                </div>
                <div className="footer-right-side">
                    <p>
                        Сделал этот <a href="https://vk.com/g228922" target="_blank" rel="noopener noreferrer">чОрт</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;