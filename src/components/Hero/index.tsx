import React from "react";
import Peacock from '../../assets/peacock'
import { Bounce } from "react-awesome-reveal";

import './style.css'

export default function Hero() {

    return (
        <div className="hero-container">

            <div className="circle-1"></div>

            <div className="hero-wrapper">

                <Bounce direction="left" triggerOnce>
                    <div className="peacock-wrapper">
                        <Peacock />
                    </div>

                </Bounce>
                <Bounce direction="right" triggerOnce>

                    <div className="hero">
                        <h1 className="hero-text">
                            Get Married <br />
                            on Chain.
                        </h1>


                        {/* <p>already have a account ?</p> */}
                    </div>
                </Bounce>



            </div>
        </div>
    )
}
