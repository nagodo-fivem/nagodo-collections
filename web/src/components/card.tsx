import React, {useState} from 'react';
import '../css/card.css';
import img from '../imgs/Frames/normal.png'
import img1 from '../imgs/Elements/FireElement.png'
import img2 from '../imgs/Cards/FirstEdition Collection/CardPictures/g_holo_john_olsen_01.jpg'

export function Card(props: {size: number}) {
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

            <p className='name' style={{"fontSize": GetNameFontSize(scale)}}>John Olsen</p>

            <p className='health' style={{"fontSize": GetHealthFontSize(scale)}}>1000HP</p>

            <p className='info' style={{"fontSize": GetInfoFontSize(scale)}}>Fede førtidspensionist. Elsker sove he. Remolade her</p>

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