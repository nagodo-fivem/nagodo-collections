import { useRef, useState } from "react";
import "./card.scss"
import flipsound from '../sounds/flipsound.mp3';

interface CardProps {
    name: string;
    health: number;
    info: string;
    attack: number;
    damage: number;
    cardNum: number;

    size: number;
    isOpeningCard?: boolean;
}

interface OpenCardData {
    isFlipped: boolean;
    shake?: boolean;
    isSpecial?: boolean;
}

const Card = ({name, health, info, attack, damage, cardNum, size, isOpeningCard}: CardProps) => {
    let scale = 0.025 * size;
    let width = 1024 * scale
    let height = 1420 * scale

    const audioRef = useRef(null);
    let [openCardData, setOpenCardData] = useState<OpenCardData>({"isFlipped": false, "isSpecial": false});

    function handleClick() {
        if (!isOpeningCard) return;

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

    function playFlipSound() {
        if (audioRef.current) {
            let audioElement = audioRef.current as HTMLAudioElement;
            audioElement.volume = 0.2;
            audioElement.play();
        }
    }

    function getFlipFrontTransform() {
        if (!isOpeningCard) {
            return {"transform": "rotateY(0deg)", "animation": "none", "transition": "none"}
        };

        if (!openCardData.isFlipped) {
            return {"transform": "rotateY(180deg)", "transition": "all 1s ease"}
        }

        return {"transform": "rotateY(0deg)", "transition": "all 1s ease"}
    }

    function getFlipBackSideTransform() {
        if (!isOpeningCard) {
            return {"transform": "rotateY(180deg)", "animation": "none", "transition": "none"}
        };

        if (openCardData.shake) {
            return {"animation": "shake 1s"}
        }

        if (!openCardData.isFlipped) {
            return {"transform": "rotateY(0deg)", "animation": "none"}
        }

        return {"transform": "rotateY(180deg)", "animation": "none"}
    }

    function getCardStyle() {
        if (!isOpeningCard) {
            return {"transform": "rotateY(0deg)", "animation": "none", "transition": "none", "height": height + "vh", "width": width + "vh"}
        }
        return {"transition": "all 1s ease", "height": height + "vh", "width": width + "vh"}
    }

    function GetCardNum(cardNum: number | string) {
        if (typeof cardNum === "string") return cardNum + " / XXX";

        return cardNum + " / 100";
    }

    return (
        <div className="card" style={getCardStyle() } onClick={handleClick}>

            <audio ref={audioRef}>
                <source src={flipsound} type="audio/mpeg" />
            </audio>

            <div className = "card-front" style={getFlipFrontTransform()}>
                <div className='frame'>
                    <img src={"https://i.imgur.com/4ONxA9H.png"} alt="frame" />
                </div>

                <div className='element'>
                    <img src={"https://i.imgur.com/kHEpSnJ.png"}/>
                </div>

                <div className='card-image'>
                    <img src={"https://i.imgur.com/4paHYB2.jpg"} />
                </div>

                <p className='name' style={{"fontSize": GetNameFontSize(scale)}}>{name}</p>

                <p className='health' style={{"fontSize": GetHealthFontSize(scale)}}>{health}HP</p>

                <p className='info' style={{"fontSize": GetInfoFontSize(scale)}}>{info}</p>

                <p className='attack' style = {{"fontSize": GetAttackFontSize(scale)}}>{attack}</p>

                <p className='damage' style = {{"fontSize": GetDamageFontSize(scale)}}>{damage}</p>

                <p className='num' style = {{"fontSize": GetCardNumFontSize(scale)}}>{GetCardNum(cardNum)}</p>
            </div>

            <div className='card-back' style={getFlipBackSideTransform()}>
                <img src={"https://i.imgur.com/o2Ss6uk.png"} alt="frame" />
            </div>
        </div>
    )
}

function GetNameFontSize(scale: number) {
    return 70 * scale + "vh";
}

function GetHealthFontSize(scale: number) {
    return 70 * scale + "vh";
}

function GetInfoFontSize(scale: number) {
    return 25 * scale + "vh";
}

function GetAttackFontSize(scale: number) {
    return 70 * scale + "vh";
}

function GetDamageFontSize(scale: number) {
    return 70 * scale + "vh";
}

function GetCardNumFontSize(scale: number) {
    return 40 * scale + "vh";
}

export default Card;