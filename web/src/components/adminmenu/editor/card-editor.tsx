import React, {useState} from 'react';
import '../../../css/pages/adminmenu/card-editor.css'
import { Card } from "../../card";
import { CardProperty } from './card-property';

interface EditorCardData {
    name: string;
    health: number;
    info: string;
    attack: string;
    damage: number;
    cardNum: number;
    size?: number;
}

interface CardScaleData {
    cardSize: number;
    sliderSize: number;
}


function Preview(props: EditorCardData) {
    const [size, setSize] = useState<CardScaleData>({cardSize: 1.5, sliderSize: 15});

    function handleSizeChange(e: React.ChangeEvent<HTMLInputElement>) {
        let sliderSize = parseInt(e.target.value);
        let cardSize = sliderSize / 10;
        setSize({cardSize: cardSize, sliderSize: sliderSize});
    }

    return (
        <div className='preview-section'>

            <div className="scale">
                <input type="range" min="1" max="19" value={size.sliderSize} onChange={handleSizeChange} />
            </div>

            <div className='container'>
                <div className="preview">
                    <Card name = {props.name} health = {props.health} info = {props.info} attack = {props.attack} damage = {props.damage} cardNum = {13} size={size.cardSize} />
                </div>
            </div>
            
        </div>
        
    )
}

export function CardEditor() {
    const [cardData, setCardData] = useState<EditorCardData>({name: "", health: 0, info: "", attack: "", damage: 0, cardNum: 0});

    function handleNameChange(name: string) {
        if (name.length > 17) return;
        setCardData({...cardData, name: name})
    }

    function handleHealthChange(health: number) {
        if (health > 9999) return;
        setCardData({...cardData, health: health})
    }

    function handleInfoChange(info: string) {
        if (info.length > 49) return;
        setCardData({...cardData, info: info})
    }

    function handleAttackChange(attack: string) {
        if (attack.length > 25) return;
        setCardData({...cardData, attack: attack})
    }

    function handleDamageChange(damage: number) {
        if (damage > 999) return;
        setCardData({...cardData, damage: damage})
    }

    return (
        <div className="card-editor">
            <div className="input">
                <CardProperty title = 'Name' value = {cardData.name} onChange={handleNameChange} />
                <CardProperty title = 'Health' type='number' value = {cardData.health} onChange={handleHealthChange} />
                <CardProperty title = 'Info' value = {cardData.info} onChange={handleInfoChange} />
                <CardProperty title = 'Attack' value = {cardData.attack} onChange={handleAttackChange} />
                <CardProperty title = 'Damage' value = {cardData.damage} onChange={handleDamageChange} />
            </div>

            <Preview name = {cardData.name} health = {cardData.health} info = {cardData.info} attack = {cardData.attack} damage = {cardData.damage} cardNum = {13} size = {1.8} />
        </div>
    )

}