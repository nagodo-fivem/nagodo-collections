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

interface IRotation {
    x: number;
    y: number;
}

const ShowCard = () => {
    const [currentRotation, setCurrentRotation] = useState<IRotation>({x: 0, y: 0});
    const [lastPostion, setLastPosition] = useState<number[]>([0, 0]);
    
    function handleDrag(event: any) {
        let newRotation: IRotation = currentRotation;
        if (lastPostion[1] - event.clientY >= 1) {
            newRotation.y += 1;
        } else if (lastPostion[1] - event.clientY <= 1) {
            newRotation.y -= 1;
        }

        if (lastPostion[0] - event.clientX >= 1) {
            newRotation.x += 1;
        } else if (lastPostion[0] - event.clientX <= 1) {
            newRotation.x -= 1;
        }
        setCurrentRotation(newRotation);
        setLastPosition([event.clientX, event.clientY])
    }

    return (
        <div className="showcard" onMouseMove={handleDrag}  >
            <SpinningCard card = {testCard} rotation = {currentRotation} />
        </div>
    )
}

export default ShowCard;


interface SpinningCardProps {
    card: ShowCard;
    rotation: IRotation;
}

const SpinningCard = ({card, rotation}: SpinningCardProps) => {

    function getFrontRotationStyle() {
        return {"transform": "rotateX(" + rotation.x + "deg) rotateY(" + rotation.y + "deg)"}
    }

    function getBackRotationStyle() {
        return {"transform": "rotateX(" + (rotation.x + 0) + "deg) rotateY(" + (rotation.y + 180) + "deg)"}
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