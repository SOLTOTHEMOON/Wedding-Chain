import React from 'react'
import "./style.css"

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"
import { Roll } from "react-awesome-reveal"

const cardData = [
    {
        title: "Sameer Kashyap",
        image: "https://avatars.githubusercontent.com/u/40424087",
        github: "https://github.com/Sameerkash",
        linkedin: "",

    },
    {
        title: "Subhendu Maji",
        image: "https://avatars.githubusercontent.com/u/47056895",
        github: "https://github.com/subhendu17620",
        linkedin: "https://www.linkedin.com/in/subhendu17620/",
    },
    {
        title: "Tanishq R Porwar",
        image: "https://avatars.githubusercontent.com/u/45430401",
        github: "https://github.com/TanishqPorwar",
        linkedin: "",
    }
]

export default function Team() {
    return (
        <section className="team-container">

            <h1 className="section-heading">
                Who are we?
            </h1>

            <div className="team-card-container">
                {cardData.map((card, index) => (
                    <Roll key={index} triggerOnce>
                        <div className="team-card">

                            <div className="team-img">
                                <img src={card.image} alt={card.title} width="100%" height="100%" />
                            </div>

                            <h2>{card.title}</h2>

                            <div className="team-links">
                                <a href={card.github} target="_blank" rel="noopener noreferrer">
                                    <AiFillGithub />
                                </a>

                                <a href={card.linkedin} target="_blank" rel="noopener noreferrer">
                                    <AiFillLinkedin />
                                </a>
                            </div>

                        </div>
                    </Roll>))}


            </div>
        </section >
    )
}
