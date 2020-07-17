import React, { useEffect, useState } from "react";
import "../styles/Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);

    //the useeffect is used so the navbar only comes up when we scroll down from the banner 
    // Scroll listener
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);

            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        };

    }, []);



    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
            />

            <img
                className="nav__avatar"
                src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
                alt="Netflix Logo"
            // https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png
            />
        </div>
    );
}

export default Nav;