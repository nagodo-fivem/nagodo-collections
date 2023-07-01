import React, {useState} from 'react';
import { Card } from "../card";
import '../../css/openpack.css';




export function OpenPackMenu(props: {amount: number}) {
    let cardsOpened = 0;
    

    return (
        <div className="cards-container">
            <Card name = "John Olsen" health = {310} info = "Førtidspension. Højde: 150cm. Vægt: 170kg" attack = "Hvad glor du på?" damage = {120} cardNum = {13} size={1} />
            
        </div>
    );
}