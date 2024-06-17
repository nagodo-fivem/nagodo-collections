import { useRef, useState } from "react";
import flipsound from '../../sounds/flipsound.mp3';
import FrontCard from "../../components/card/Card";

interface OpenCardData {
    isFlipped: boolean;
    shake?: boolean;
    isSpecial?: boolean;
}

interface CardToOpenProps {
    name: string;
    health: number;
    info: string;
    attack: string;
    damage: number;
    cardNum: number;

    frameImage: string;
    elementImage: string;
    imageOverlayImage: string;
    cardImage: string;

    size: number;
}

const CardToOpen = (props: CardToOpenProps) => {
    const audioRef = useRef(null);

    const [openCardData, setOpenCardData] = useState<OpenCardData>({"isFlipped": false, "isSpecial": false});

    function getFlipBackSideTransform() {

        if (openCardData.shake) {
            return {"animation": "shake 1s"}
        }

        if (!openCardData.isFlipped) {
            return {"transform": "rotateY(0deg)", "animation": "none"}
        }

        return {"transform": "rotateY(180deg)", "animation": "none"}
    }

    function playFlipSound() {
        if (audioRef.current) {
            let audioElement = audioRef.current as HTMLAudioElement;
            audioElement.volume = 0.2;
            audioElement.play();
        }
    }

    function getFlipFrontTransform() {

        if (!openCardData.isFlipped) {
            return {"transform": "rotateY(180deg)", "transition": "all 1s ease"}
        }

        return {"transform": "rotateY(0deg)", "transition": "all 1s ease"}
    }

    function handleClick() {
        if (openCardData.isFlipped) return;

        if (openCardData.isSpecial) {
            let _openCardData = {...openCardData};
            _openCardData.shake = true;
            setOpenCardData(_openCardData);

            setTimeout(() => {
                let _openCardData = {...openCardData};
                _openCardData.shake = false;
                setOpenCardData(_openCardData);

                setTimeout(() => {
                    let _openCardData = {...openCardData};
                    _openCardData.isFlipped = true;
                    playFlipSound();
                    setOpenCardData(_openCardData);
                }, 100);

            }, 1000);

        } else {

            let _openCardData = {...openCardData};
            _openCardData.isFlipped = true;
            playFlipSound();
            setOpenCardData(_openCardData);
        }
        
    }
    
    return (
        <div className="cardToOpen" onClick={handleClick}>

            <audio ref={audioRef}>
                <source src={flipsound} type="audio/mpeg" />
            </audio>

            <div className="card-front" style={getFlipFrontTransform()}>
                <FrontCard name = {props.name} health={props.health} info={props.info} attack={props.attack} damage={props.damage} cardNum={props.cardNum} frameImage={props.frameImage} elementImage={props.elementImage} imageOverlayImage={props.imageOverlayImage} cardImage={props.cardImage} size={1} />
            </div>

            <div className='card-back' style={getFlipBackSideTransform()}>
                {/* <img src={"https://i.imgur.com/o2Ss6uk.png"} alt="frame" /> */}
            </div>

        </div>
    )
}

export default CardToOpen;