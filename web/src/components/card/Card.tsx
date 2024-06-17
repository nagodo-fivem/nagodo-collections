import { useRef, useState } from "react";
import "./card.scss"

import { getImagePath } from "../../helpers/ItemImagePath";

interface CardProps {
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



const FrontCard = ({name, health, info, attack, damage, cardNum, size, frameImage, elementImage, cardImage, imageOverlayImage }: CardProps) => {
    let scale = 0.025 * size;
    let width = 1024 * scale
    let height = 1420 * scale

    function getCardStyle() {
       
        return {"transition": "all 1s ease", "height": height + "vh", "width": width + "vh"}
    }

    function GetCardNum(cardNum: number | string) {
        if (typeof cardNum === "string") return cardNum + " / XXX";

        return cardNum + " / 100";
    }

    return (
        <div className="card" style={getCardStyle() }>
            <div className='frame'>
                <img src={getImagePath(frameImage)} alt=""/>

            </div>

            <div className='element'>
                <img src={getImagePath(elementImage)} alt=""/>
            </div>

            <div className='card-image'>
                <img src={getImagePath(cardImage)} alt=""/>
            </div>

            {imageOverlayImage !== "" && (
                <div className='card-image'>
                    <img src={getImagePath(imageOverlayImage)} alt=""/>
                </div>
            )}
            <div className="name" style={{"fontSize": GetNameFontSize(scale)}}>{name}</div>
            
            <div className='health' style={{"fontSize": GetHealthFontSize(scale)}}>{health}HP</div>

            <div className='info' style={{"fontSize": GetInfoFontSize(scale)}}>{info}</div>

            <div className='attack' style = {{"fontSize": GetAttackFontSize(scale)}}>{attack}</div>

            <div className='damage' style = {{"fontSize": GetDamageFontSize(scale)}}>{damage}</div>

            <div className='num' style = {{"fontSize": GetCardNumFontSize(scale)}}>{GetCardNum(cardNum)}</div>  
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

export default FrontCard;