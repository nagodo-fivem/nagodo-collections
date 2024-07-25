import { useRef, useState } from "react";
import "./card.scss"

import getImagePath from "@helpers/getImagePath";

interface CardProps {
    name: string;
    health: number;
    info: string;
    attack: number | string;
    damage: number;
    cardNum: number;

    frameImage: string;
    elementImage: string;
    imageOverlayImage: string;
    cardImage: string;

    size: number;
    fill?: boolean;
}



export const FrontCard = ({name, health, info, attack, damage, cardNum, size, frameImage, elementImage, cardImage, imageOverlayImage, fill }: CardProps) => {
    let scale = 0.025 * size;
    let width = 1024 * scale
    let height = 1420 * scale

    function getCardStyle() {

        if (fill) {
            return {"height": "100%", "width": "100%"}
        }
       
        return {"height": height + "vh", "width": width + "vh"}
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
            <div className="name" style={{"fontSize": GetNameFontSize(scale, name.length)}}>{name}</div>
            
            <div className='health' style={{"fontSize": GetHealthFontSize(scale)}}>{health}HP</div>

            <div className='info' style={{"fontSize": GetInfoFontSize(scale)}}>{info}</div>

            <p className='attack' style = {{"fontSize": GetAttackFontSize(scale)}}>{attack}</p>

            <div className='damage' style = {{"fontSize": GetDamageFontSize(scale)}}>{damage}</div>

            <div className='num' style = {{"fontSize": GetCardNumFontSize(scale)}}>{GetCardNum(cardNum)}</div>  
        </div>
    )
}

export const BackCard = ({size, image}: {size: number, image: string}) => {
    let scale = 0.025 * size;
    let width = 1024 * scale
    let height = 1420 * scale

    function getCardStyle() {
       
        return {"transition": "all 1s ease", "height": height + "vh", "width": width + "vh"}
    }

    return (
        <div className="card" style={getCardStyle() }>
            <img src={getImagePath(image)}></img>

        </div>
    )
}



function GetNameFontSize(scale: number, textLength: number) {
    if (textLength < 19) return 70 * scale + "vh";
    if (textLength < 20) return 60 * scale + "vh";
    if (textLength < 22) return 50 * scale + "vh";
    if (textLength < 29) return 40 * scale + "vh";

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