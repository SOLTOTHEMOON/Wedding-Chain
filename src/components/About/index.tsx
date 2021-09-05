import React from 'react'
import transparency from "../../assets/transparency.svg"
import traceability from "../../assets/traceability.svg"
import smart_contracts_security from "../../assets/smart_contracts_security.svg"
import { Slide } from "react-awesome-reveal"

import "./style.css"

const cardData = [
    {
        title: "Enhanced security",
        description: "Your data is sensitive and crucial, and blockchain can significantly change how your critical information is viewed. By creating a record that can’t be altered and is encrypted end-to-end, blockchain helps prevent fraud and unauthorized activity.",
        image: smart_contracts_security
    },
    {
        title: "Instant traceability",
        description: "Blockchain uses a distributed ledger, transactions and data are recorded identically in multiple locations. All network participants with permissioned access see the same information at the same time, providing full transparency. All transactions are immutability recorded, and are time- and date-stamped.",
        image: traceability
    },
    {
        title: "Transparency",
        description: "Blockchain creates an audit trail that documents the provenance of an asset at every step on its journey. In industries where consumers are concerned about environmental or human rights issues surrounding a product — or an industry troubled by counterfeiting and fraud — this helps provide the proof. ",
        image: transparency
    }
]

export default function About() {
    return (

        <>
            {/* <section className="about-container">

                <h1 className="section-heading">
                    What we do?
                </h1>

                <p className="section-description">
                    Marriage is one of the greatest blessings in life,
                    and choosing your spouse is one of the most important decisions you will ever make.

                    <br />
                    <br />

                    we at chain-marraige believe marraige is
                    a sacred bond and should be for eternity.

                    Register your marraige with us &<br /> we'll keep your
                    marraige documnented with us forever.
                </p>

            </section> */}

            <section className="benefits-container">
                <div className="circle-2"></div>

                <h1 className="section-heading">
                    What makes us different?
                    <sub style={{ fontSize: '15px', fontWeight: 100, }}>secret is blockchain</sub>
                </h1>
                <div className="benefit-card-container">
                    {cardData.map((card, index) => (
                        <Slide className="about-card" key={index} triggerOnce>
                            <div >

                                <div className="about-img">
                                    <img src={card.image} alt={card.title} />
                                </div>

                                <h2>{card.title}</h2>
                                <p>
                                    {card.description}</p>
                            </div>
                        </Slide>
                    ))}


                </div>
            </section>
        </>
    )
}
