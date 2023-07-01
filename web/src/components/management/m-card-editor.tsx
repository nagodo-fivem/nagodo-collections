import React, {useState} from 'react';
import { Card } from "../card";

interface EditorCardData {
    name: string;
    health: number;
    info: string;
    attack: string;
    damage: number;
    cardNum: number;
}

interface CardTextInputProps {
    title: string;
    value: string | number;
    onChange: Function;
}

function CardTextInput(props: CardTextInputProps) {   

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.onChange(e.target.value);
    }

    return (
        <div className="card-text-input">
            <p className='title'>{props.title}</p>

            <input type="text" value={props.value} onChange={handleChange} />
        </div>
    );
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
                <CardTextInput title = 'Name' value = {cardData.name} onChange={handleNameChange} />
                <CardTextInput title = 'Health' value = {cardData.health} onChange={handleHealthChange} />
                <CardTextInput title = 'Info' value = {cardData.info} onChange={handleInfoChange} />
                <CardTextInput title = 'Attack' value = {cardData.attack} onChange={handleAttackChange} />
                <CardTextInput title = 'Damage' value = {cardData.damage} onChange={handleDamageChange} />
            </div>

            <div className="preview">
                <Card name = {cardData.name} health = {cardData.health} info = {cardData.info} attack = {cardData.attack} damage = {cardData.damage} cardNum = {13} size={1.8} />
            </div>
        </div>
    )


    return null;
}