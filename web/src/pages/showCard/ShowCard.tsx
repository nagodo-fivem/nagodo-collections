
import { FrontCard } from "@components/card/Card";
import "./showcard.scss";

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
    isCustomCard: boolean;
}

const ShowCard = ({card}: any) => {

    if (card == null) return null;

    

    return (
        <div className="showcard" >
            <SpinningCard card = {card} />
        </div>
    )
}

export default ShowCard;


interface SpinningCardProps {
    card: ShowCard;
}

const SpinningCard = ({card}: SpinningCardProps) => {

    function getFrontRotationStyle() {
        
        return {"transform": "rotateY(" + (0) + "deg)", "transition": "all 1s ease"}
    }
    console.log("Card: ");
    
    console.log(card);
    console.log(JSON.stringify(card));

    return (
        <div className="spinningCard">
            <div className="front" style={getFrontRotationStyle()}>
                <FrontCard name = {card.name} health={card.health} info={card.info} attack={card.attack} damage={card.damage} cardNum={1} cardImage={card.cardImage} frameImage={card.frameImage} elementImage={card.elementImage} imageOverlayImage={card.overlayImage} size={1.5} fill = {true} isCustomCard = {card.isCustomCard} />
            </div>
        </div>
    )
}

