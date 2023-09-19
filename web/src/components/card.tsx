import React, {useState} from 'react';
import '../css/components/card.css';

interface CardProps {
    name: string;
    health: number;
    info: string;
    attack: string;
    damage: number;
    cardNum: number;
    size: number;
    isFlipped?: boolean;
}


export function Card(props: CardProps) {
    let scale = 0.025 * props.size;
    let width = 1024 * scale
    let height = 1420 * scale

    let [isFlipped, setIsFlipped] = useState(false);

    function handleClick() {
        setIsFlipped(!isFlipped);
    }

    function getFlipFrontTransform() {
        if (!isFlipped) {
            return {"transform": "rotateY(180deg)"}
        }

        return {"transform": "rotateY(0deg)"}
    }

    function getFlipBackSideTransform() {
        if (!isFlipped) {
            return {"transform": "rotateY(0deg)"}
        }

        return {"transform": "rotateY(180deg)"}
    }


    return (
        <div className='card' style={{"height": height + "vh", "width": width + "vh"}  } onClick={handleClick}>

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

                <p className='name' style={{"fontSize": GetNameFontSize(scale)}}>{props.name}</p>

                <p className='health' style={{"fontSize": GetHealthFontSize(scale)}}>{props.health}HP</p>

                <p className='info' style={{"fontSize": GetInfoFontSize(scale)}}>{props.info}</p>

                <p className='attack' style = {{"fontSize": GetAttackFontSize(scale)}}>{props.attack}</p>

                <p className='damage' style = {{"fontSize": GetDamageFontSize(scale)}}>{props.damage}</p>

                <p className='num' style = {{"fontSize": GetCardNumFontSize(scale)}}>{props.cardNum} / 143</p>
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