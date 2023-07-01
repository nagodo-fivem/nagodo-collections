import React, {useState} from 'react';
import '../css/card.css';
import img from '../imgs/Frames/normal.png'
import img1 from '../imgs/Elements/FireElement.png'
import img2 from '../imgs/Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg'

interface CardProps {
    name: string;
    health: number;
    info: string;
    attack: string;
    damage: number;
    cardNum: number;
    size: number;
}


export function Card(props: CardProps) {
    let scale = 0.025 * props.size;
    let width = 1024 * scale
    let height = 1420 * scale

    return (
        <div className='card' style={{"height": height + "vh", "width": width + "vh"} }>

            <div className='frame'>
                <img src={img} alt="frame" />
            </div>

            <div className='element'>
                <img src={img1}/>
            </div>

            <div className='card-image'>
                <img src={img2} />
            </div>

            <p className='name' style={{"fontSize": GetNameFontSize(scale)}}>{props.name}</p>

            <p className='health' style={{"fontSize": GetHealthFontSize(scale)}}>{props.health}HP</p>

            <p className='info' style={{"fontSize": GetInfoFontSize(scale)}}>{props.info}</p>

            <p className='attack' style = {{"fontSize": GetAttackFontSize(scale)}}>{props.attack}</p>

            <p className='damage' style = {{"fontSize": GetDamageFontSize(scale)}}>{props.damage}</p>

            <p className='num' style = {{"fontSize": GetCardNumFontSize(scale)}}>{props.cardNum} / 143</p>

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