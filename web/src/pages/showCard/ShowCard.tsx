import { useState } from "react";
import FrontCard from "../../components/card/Card";
import "./showcard.scss";
import { getImagePath } from "../../helpers/ItemImagePath";

interface ShowCard {
    name: string;
    health: number;
    info: string;
    attack: string;
    damage: number;

    cardImage: string;
    frameImage: string;
    elementImage: string;
    overlayImage: string;
}

const ShowCard = () => {
    const [rotated, setRotated] = useState(false);

    function handleClick() {
        setRotated(!rotated);
    }

    return (
        <div className="showcard" onClick={handleClick}>
            <SpinningCard card = {testCard} rotated = {rotated} />
        </div>
    )
}

export default ShowCard;


interface SpinningCardProps {
    card: ShowCard;
    rotated: boolean;
}

const SpinningCard = ({card, rotated}: SpinningCardProps) => {

    function getFrontRotationStyle() {
        if (rotated) {
            return {"transform": "rotateY(" + (180) + "deg)", "transition": "all 1s ease"}
        }

        return {"transform": "rotateY(" + (0) + "deg)", "transition": "all 1s ease"}
    }

    function getBackRotationStyle() {
        if (rotated) {
            return {"transform": "rotateY(" + (0) + "deg)", "transition": "all 1s ease"}
        }

        return {"transform": "rotateY(" + (180) + "deg)", "transition": "all 1s ease"}
    }

    return (
        <div className="spinningCard">
            <div className="front" style={getFrontRotationStyle()}>
                <FrontCard name = {card.name} health={card.health} info={card.info} attack={card.attack} damage={card.damage} cardNum={1} cardImage={card.cardImage} frameImage={card.frameImage} elementImage={card.elementImage} imageOverlayImage={card.overlayImage} size={1.5} fill = {true} />
            </div>
            <div className="back" style={getBackRotationStyle()}>
                <img src={getImagePath("Backs/backOfCard01.png")}></img>
            </div>
        </div>
    )
}

let testCard: ShowCard = {
    name: "Din mor",
    health: 100,
    info: "sut",
    attack: "cola her",
    damage: 99,

    cardImage: "Cards/FirstEdition Collection/CardPictures/black_blackgris_01.png",
    frameImage: "Frames/normal.png",
    elementImage: "Elements/FireElement.png",
    overlayImage: ""
}