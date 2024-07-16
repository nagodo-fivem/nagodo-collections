import { useState } from "react";
import FrontCard from "../../components/card/Card";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import CardToOpen from "./CardToOpen";
import { ICardToOpen } from "./ICardToOpen";
import "./Opener.scss"
import { fetchNui } from "../../utils/fetchNui";

const Opener = () => {
    const [cardsToOpen, setCardsToOpen] = useState<ICardToOpen[]>(testCards);
    const [amountOfCardsOpened, setAmountOfCardsOpened] = useState<number>(0);

    useNuiEvent<any>('setCardsToOpen', (data) => {

    })

    function handleCardFlipped() {
        if (amountOfCardsOpened + 1 === cardsToOpen.length) {
            fetchNui('doneOpeningPackage', {
                
            })
        }

        setAmountOfCardsOpened(amountOfCardsOpened + 1);
    }


    return (
        <div className="opener">
            <div className="cards">
                {cardsToOpen.map((card, index) => {
                    return <CardToOpen key={index} 
                        name={card.name}
                        health={card.health}
                        info={card.info}
                        attack={card.attack}
                        damage={card.damage}
                        cardNum={card.cardNum}
                        frameImage={card.frameImage}
                        elementImage={card.elementImage}
                        imageOverlayImage={card.imageOverlayImage}
                        cardImage={card.cardImage}
                        onCardFlipped={handleCardFlipped}
                    />
                })}
            </div>
        </div>
    )
}

export default Opener;

let testCards: ICardToOpen[] = [
    {
        name: "Card 1",
        health : 100,
        info: "This is a card",
        attack : "Din mor",
        damage : 10,
        cardNum : 1,
        frameImage : "Frames/normal.png",
        elementImage : "Elements/FireElement.png",
        imageOverlayImage : "",
        cardImage : "Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg",
    },
    {
        name: "Card 2",
        health : 100,
        info: "This is a card",
        attack : "Din mor2",
        damage : 10,
        cardNum : 1,
        frameImage : "Frames/normal.png",
        elementImage : "Elements/FireElement.png",
        imageOverlayImage : "",
        cardImage : "Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg",
    },
    {
        name: "Card 1",
        health : 100,
        info: "This is a card",
        attack : "Din mor",
        damage : 10,
        cardNum : 1,
        frameImage : "Frames/normal.png",
        elementImage : "Elements/FireElement.png",
        imageOverlayImage : "",
        cardImage : "Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg",
    },
    {
        name: "Card 2",
        health : 100,
        info: "This is a card",
        attack : "Din mor2",
        damage : 10,
        cardNum : 1,
        frameImage : "Frames/normal.png",
        elementImage : "Elements/FireElement.png",
        imageOverlayImage : "",
        cardImage : "Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg",
    },
    {
        name: "Card 1",
        health : 100,
        info: "This is a card",
        attack : "Din mor",
        damage : 10,
        cardNum : 1,
        frameImage : "Frames/normal.png",
        elementImage : "Elements/FireElement.png",
        imageOverlayImage : "",
        cardImage : "Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg",
    },
    {
        name: "Card 2",
        health : 100,
        info: "This is a card",
        attack : "Din mor2",
        damage : 10,
        cardNum : 1,
        frameImage : "Frames/normal.png",
        elementImage : "Elements/FireElement.png",
        imageOverlayImage : "",
        cardImage : "Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg",
    },
    {
        name: "Card 1",
        health : 100,
        info: "This is a card",
        attack : "Din mor",
        damage : 10,
        cardNum : 1,
        frameImage : "Frames/normal.png",
        elementImage : "Elements/FireElement.png",
        imageOverlayImage : "",
        cardImage : "Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg",
    },
    {
        name: "Card 2",
        health : 100,
        info: "This is a card",
        attack : "Din mor2",
        damage : 10,
        cardNum : 1,
        frameImage : "Frames/normal.png",
        elementImage : "Elements/FireElement.png",
        imageOverlayImage : "",
        cardImage : "Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg",
    },
    {
        name: "Card 1",
        health : 100,
        info: "This is a card",
        attack : "Din mor",
        damage : 10,
        cardNum : 1,
        frameImage : "Frames/normal.png",
        elementImage : "Elements/FireElement.png",
        imageOverlayImage : "",
        cardImage : "Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg",
    },
    {
        name: "Card 2",
        health : 100,
        info: "This is a card",
        attack : "Din mor2",
        damage : 10,
        cardNum : 1,
        frameImage : "Frames/normal.png",
        elementImage : "Elements/FireElement.png",
        imageOverlayImage : "",
        cardImage : "Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg",
    },
]