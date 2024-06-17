import { useState } from "react";
import FrontCard from "../../components/card/Card";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import CardToOpen from "./CardToOpen";

const Opener = () => {
    const [cardsToOpen, setCardsToOpen] = useState<any[]>(testCards);

    useNuiEvent<any>('setCardsToOpen', (data) => {

    })


    return (
        <div className="opener">
            <div className="cards">
                {cardsToOpen.map((card, index) => {
                    return <CardToOpen key={index} {...card} size={5} />
                })}
            </div>
        </div>
    )
}

export default Opener;

let testCards = [
    {
        name: "Card 1",
        health : 100,
        info: "This is a card",
        attack : 50,
        damage : 10
    }
]