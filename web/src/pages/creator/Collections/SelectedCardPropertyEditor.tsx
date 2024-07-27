import Input from "@components/Input/Input";
import { _T } from "@utils/translation";
import { ICard } from "./ICard";
import { useState } from "react";

interface SelectedCardPropertyProps {
    startCardData: ICard;
    handleCardDataChange: (data: ICard) => void;
    handleSelectVisualType: (type: string) => void;
}

const SelectedCardProperty = ({startCardData, handleCardDataChange, handleSelectVisualType}: SelectedCardPropertyProps) => {

    function handleCustomImageChange(image: string) {
        handleCardDataChange({...startCardData, cardImage: image});
    }

    function handleIsCustomImageClick() {
        handleCardDataChange({...startCardData, isCustomCard: !startCardData.isCustomCard});
    }

    function handleNameChange(name: string) {
        if (name.length > 26) return;
        handleCardDataChange({...startCardData, name: name});
    }

    function handleHealthChange(health: string) {
        if (health.length > 4) return;
        let _health = parseInt(health);
        handleCardDataChange({...startCardData, health: _health});
    }

    function handleInfoChange(info: string) {
        if (info.length > 42) return;
        handleCardDataChange({...startCardData, info: info});
    }

    function handleAttackChange(attack: string) {
        if (attack.length > 29) return;
        handleCardDataChange({...startCardData, attack: attack});
    }

    function handleDamageChange(damage: string) {
        if (damage.length > 4) return;
        let _damage = parseInt(damage);
        handleCardDataChange({...startCardData, damage: _damage});
    }

    function handleImageChange(image: string) {
        handleCardDataChange({...startCardData, cardImage: image});
    }

    function handleRarityChange(rarity: string) {
        let _rarity = parseInt(rarity);
        handleCardDataChange({...startCardData, rarity: _rarity});
    }

    if (startCardData.isCustomCard) {
        return (
            <div className="selectedcardproperty" style={{height: "40vh", width: "98%"}}>
                <div className="element">
                    <Input title="Custom Image" key={"ci"} onChange={handleCustomImageChange} startValue={startCardData.cardImage} />
                </div>

                <div className="element">
                    <div className="title">
                        {_T("VISUALS")}
                    </div>
                    <div className="button" onClick={() => {handleIsCustomImageClick()}}>
                        <div className="label"><i className="fa-solid fa-maximize"></i>{_T("IS_CUSTOM")}</div>
                    </div>

                </div>
            </div>
        )
    }
    
    return (
        <div className="selectedcardproperty">
            <div className="element">
                <Input title="Name" key={"name"} onChange={handleNameChange} startValue={startCardData.name} />
            </div>

            <div className="element">
                <Input title="Health" onChange={handleHealthChange} startValue={startCardData.health.toString()} onlyNumbers = {true} />
            </div>

            <div className="element">
                <Input title="Info" onChange={handleInfoChange} startValue={startCardData.info} />
            </div>

            <div className="element">
                <Input title="Attack" onChange={handleAttackChange} startValue={startCardData.attack}/>
            </div>

            <div className="element">
                <Input title="Damage" onChange={handleDamageChange} startValue={startCardData.damage.toString()} onlyNumbers = {true}/>
            </div>

            <div className="element">
                <Input title="Image" onChange={handleImageChange} startValue={startCardData.cardImage}/>
            </div>

            <div className="element">
                <Input title="Rarity" onChange={handleRarityChange} startValue={startCardData.rarity.toString()} onlyNumbers = {true}/>
            </div>

            <div className="element">
                <div className="title">
                    {_T("VISUALS")}
                </div>
                <div className="button" onClick={() => {handleSelectVisualType("frame")}}>
                    <div className="label"><i className="fa-solid fa-folder-open"></i>{_T("FRAME")}</div>
                </div>
                <div className="button" onClick={() => {handleSelectVisualType("element")}}>
                    <div className="label"><i className="fa-solid fa-folder-open"></i>{_T("ELEMENT")}</div>
                </div>
                <div className="button" onClick={() => {handleSelectVisualType("image-overlay")}}>
                    <div className="label"><i className="fa-solid fa-folder-open"></i>{_T("IMAGE_OVERLAY")}</div>
                </div>
                <div className="button">
                    <div className="label"><i className="fa-solid fa-folder-open"></i>Stickers (coming soon)</div>
                </div>
                <div className="button" onClick={() => {handleIsCustomImageClick()}}>
                    <div className="label"><i className="fa-solid fa-maximize"></i>{_T("IS_CUSTOM")}</div>
                </div>
            </div>
        </div>
    )
}

export default SelectedCardProperty;
