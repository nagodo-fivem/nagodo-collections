import React, {useState} from 'react';
import { Card } from "../card";
import '../../css/pages/packageopener/openpack.css';

interface OpenPackMenuProps {
    cardAmount: number;
}


export function OpenPackMenu(props: OpenPackMenuProps) {
    let cardsOpened = 0;
    
    function getHeight() {
        if (props.cardAmount > 4) {
            return "75vh";
        } else {
            return "38vh";
        }
    }

    return (
        <div className="cards-container" style={{"height": getHeight()}}>
            <Card name = "John Olsen" health = {310} info = "Førtidspension. Højde: 150cm. Vægt: 170kg" attack = "Hvad glor du på?" damage = {120} cardNum = {13} size={1} isOpeningCard = {true} />
            <Card name = "John Olsen" health = {310} info = "Førtidspension. Højde: 150cm. Vægt: 170kg" attack = "Hvad glor du på?" damage = {120} cardNum = {13} size={1} isOpeningCard = {true}/>
            <Card name = "John Olsen" health = {310} info = "Førtidspension. Højde: 150cm. Vægt: 170kg" attack = "Hvad glor du på?" damage = {120} cardNum = {13} size={1} isOpeningCard = {true}/>
            <Card name = "John Olsen" health = {310} info = "Førtidspension. Højde: 150cm. Vægt: 170kg" attack = "Hvad glor du på?" damage = {120} cardNum = {13} size={1} />
            <Card name = "John Olsen" health = {310} info = "Førtidspension. Højde: 150cm. Vægt: 170kg" attack = "Hvad glor du på?" damage = {120} cardNum = {13} size={1} />
            <Card name = "John Olsen" health = {310} info = "Førtidspension. Højde: 150cm. Vægt: 170kg" attack = "Hvad glor du på?" damage = {120} cardNum = {13} size={1} />
            <Card name = "John Olsen" health = {310} info = "Førtidspension. Højde: 150cm. Vægt: 170kg" attack = "Hvad glor du på?" damage = {120} cardNum = {13} size={1} />
            
        </div>
    );
}