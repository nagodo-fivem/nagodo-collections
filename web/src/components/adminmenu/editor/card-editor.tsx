import React, {useState} from 'react';
import '../../../css/pages/adminmenu/card-editor.css'
import { Card } from "../../card";
import { CardDetails } from './card-details';

interface EditorCardData {
    name: string;
    health: number;
    info: string;
    attack: string;
    damage: number;
}

interface CardScaleData {
    cardSize: number;
    sliderSize: number;
}


function Preview(props: EditorCardData) {

    return (
        <div className='preview-section'>

            <div className='container'>
                <div className="preview">
                    <Card name = {props.name} health = {props.health} info = {props.info} attack = {props.attack} damage = {props.damage} cardNum = {"XX"} size={1.8} />
                </div>
            </div>
            
        </div>
        
    )
}

export function CardEditor() {
    const [cardData, setCardData] = useState<EditorCardData>({name: "", health: 0, info: "", attack: "", damage: 0});

    return (
        <div className="card-editor">
            <div className="input">
                <CardDetails />
            </div>

            <Preview name = {cardData.name} health = {cardData.health} info = {cardData.info} attack = {cardData.attack} damage = {cardData.damage} />
        </div>
    )

}