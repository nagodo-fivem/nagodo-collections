import React, {useState} from 'react';
import '../../../css/pages/adminmenu/card-editor.css'
import { Card } from "../../card";

interface EditorCardData {
    name: string;
    health: number;
    info: string;
    attack: string;
    damage: number;
    cardNum: number;
    size?: number;
}

interface CardTextInputProps {
    title: string;
    type?: string;
    value: string | number;
    onChange: Function;
}

interface CardScaleData {
    cardSize: number;
    sliderSize: number;
}


function CardProperty(props: CardTextInputProps) {  
    const [expanded, setExpanded] = useState<boolean>(false);

    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.onChange(e.target.value);
    }

    function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {

    }
    
    function handleExpand() {
        setExpanded(!expanded);
    }
    
    let className = "card-text-input";
    let iconClassName = "fa-solid fa-chevron-down expand";
    let additionalClassName = "additional";
    if (expanded) {
        className += " expanded"; 
        iconClassName = "fa-solid fa-chevron-up expand";
        additionalClassName += " expanded";
    }
    

    return (
        <div className = {className}>
            <p className='title'>{props.title}</p>

            <i className = {iconClassName} onClick={handleExpand}></i>

            <input type = {props.type} value={props.value} onChange={handleChange} autoComplete='none'/>

            <div className = {additionalClassName}>
                <p className='color'>Color</p>
                <div className='current-color-preview'></div>
                <p className='use-default'>Use default collection color</p>
                <input className='use-default-checkbox' type = "checkbox" />
            </div>
        </div>
    );
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