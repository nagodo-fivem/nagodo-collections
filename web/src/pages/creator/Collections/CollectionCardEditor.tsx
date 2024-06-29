import { useState } from "react";
import FrontCard from "../../../components/card/Card";
import Action from "../Action/Action";
import { ICard } from "./ICard";
import Input from "../../../components/Input/Input";
import IProperty from "../Properties/IProperty";
import { getImagePath } from "../../../helpers/ItemImagePath";
import { fetchNui } from "../../../utils/fetchNui";
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import StickerPlacement from "./StickerPlacement";
import { isEnvBrowser } from "../../../utils/misc";

const defaultCard: ICard = {identifier: -1, name: "", health: 100, info: "", attack: "", damage: 99, cardNum: 1, rarity: 50, frameIdentifier: 1, elementIdentifier: 1, imageOverlayIdentifier: -1, cardImage: "Cards/FirstEdition Collection/CardPictures/black_blackgris_01.png"};
const cardSize = 0.619;
const CollectionCardEditor = ({collectionIdentifier, _properties}: {collectionIdentifier: number, _properties: IProperty[]}) => {
    const [properties, setProperties] = useState<IProperty[]>(isEnvBrowser() ? testProperties : _properties);
    const [selectingProperty, setSelectingProperty] = useState(false); 
    const [selectingPropertyType, setSelectingPropertyType] = useState("frame");
    const [editingCard, setEditingCard] = useState(false); 
    const [newCardData, setNewCardData] = useState<ICard>(defaultCard);
    const [selectedCard, setSelectedCard] = useState<ICard>(defaultCard);
    const [cards, setCards] = useState<ICard[]>(isEnvBrowser() ? testCards : []); 

    useNuiEvent<any>('setCards', (data) => {
        setCards(data.cards);
    });

    function handleNewCardClick() {
        setEditingCard(true);
        setSelectingProperty(true);

        let _defaultCard = {...defaultCard};
        _defaultCard.name = "New card";

        setSelectedCard(_defaultCard);
        setNewCardData(_defaultCard);
    }

    function handleCardClick(card: ICard) {
        setEditingCard(true);
        setSelectingProperty(true);
        setSelectedCard(card);
        setNewCardData(card);
    }

    function handleCancelClick() {
        console.log("Cancel clicked");
        setSelectedCard(defaultCard);
        setEditingCard(false);
        setNewCardData(defaultCard);
        setSelectingProperty(false);
    }

    function handleSaveClick() {

        setEditingCard(false);
        setSelectingProperty(false);

        fetchNui("saveCard", {
            collection: collectionIdentifier,
            card: newCardData
        });
    }

    function handleCardDataChange(card: ICard) {
       setNewCardData(card);
    }

    function handleSelectVisualType(type: string) {
        setSelectingPropertyType(type);
        setSelectingProperty(true);
    }

    function getPropertiesByType(type: string) {
        let _properties: IProperty[] = [];
        _properties = properties.filter(property => property.type === type);

        if (type === "image-overlay") {
            _properties.unshift({identifier: -1, type: "image-overlay", label: "None", image: ""})
        }


        return _properties;
    }

    function getFrameByIdentifier(identifier: number) {
        let frame = properties.find(property => property.identifier === identifier && property.type === "frame");
        if (frame) return frame.image;
        return "";
    }

    function getElementByIdentifier(identifier: number) {
        let element = properties.find(property => property.identifier === identifier && property.type === "element");
        if (element) return element.image;
        return "";
    }

    function getImageOverlayByIdentifier(identifier: number) {
        let imageOverlay = properties.find(property => property.identifier === identifier && property.type === "image-overlay");
        if (imageOverlay) return imageOverlay.image;
        return "";
    }

    function selectProperty(type: string, identifier: number) {
        if (type === "frame") {
            setNewCardData({...newCardData, frameIdentifier: identifier});
        } else if (type === "element") {
            setNewCardData({...newCardData, elementIdentifier: identifier});
        } else if (type === "image-overlay") {
            setNewCardData({...newCardData, imageOverlayIdentifier: identifier});
        }
    }

    return (
        <div className="collectioncardeditor">
            <div className="overview">
                {!editingCard && (
                    <div className="cards">

                        {cards.map((card, index) => {
                            return (
                                <div className="card-wrapper" onClick={() => {handleCardClick(card)}}>
                                    <FrontCard size={cardSize} name={card.name} health={card.health} info={card.info} attack={card.attack} damage={card.damage} cardNum={card.cardNum} cardImage={card.cardImage} frameImage={getFrameByIdentifier(card.frameIdentifier)} elementImage = {getElementByIdentifier(card.elementIdentifier)} imageOverlayImage={getImageOverlayByIdentifier(card.imageOverlayIdentifier)}/>
                                </div>
                            )

                        })}

                    </div>
                )};

                {(editingCard && selectedCard) && (
                    <div className="editor">
                        <div className="preview">
                            <FrontCard size={1.6} name={newCardData.name} health={newCardData.health} info={newCardData.info} attack={newCardData.attack} damage={newCardData.damage} cardNum={newCardData.cardNum} cardImage={newCardData.cardImage} frameImage={getFrameByIdentifier(newCardData.frameIdentifier)} elementImage = {getElementByIdentifier(newCardData.elementIdentifier)} imageOverlayImage={getImageOverlayByIdentifier(newCardData.imageOverlayIdentifier)} />
                        </div>

                    </div>
                )}

                {(selectingProperty && (selectingPropertyType != "sticker")) && (
                    <div className="selectingProperty">

                        {getPropertiesByType(selectingPropertyType).map((property) => {
                            return (
                                <div className="property" onClick={() => {selectProperty(selectingPropertyType, property.identifier)}} >
                                    <div className="label">{property.label}</div>
                                    <div className="image">
                                        <img src={getImagePath(property.image)} alt={property.label} />
                                    </div>

                                    
                                </div>
                            );
                        })}

                    </div>
                )}
                
                {(selectingProperty && (selectingPropertyType == "sticker")) && (
                    <div className="selectingProperty">

                        <StickerPlacement />
                    </div>
                )}

            </div>
            

            <div className="actions">
                {selectedCard.name !== "" && (
                    <>
                        <SelectedCardProperty startCardData={newCardData} handleCardDataChange = {handleCardDataChange} handleSelectVisualType = {handleSelectVisualType} />
                        
                    </>
                    
                )}
                
                {selectedCard.name === "" && (
                    <Action label = "New card" onClick={handleNewCardClick}/>
                )}
                
            </div>

            {selectedCard.name !== "" && (
                <div className="btns">
                    <div className="btn cancel small" onClick={handleCancelClick}>
                        <div className="text">
                            Cancel
                        </div>
                    </div>
                    <div className="btn delete small">
                        <div className="text">
                            Delete
                        </div>
                    </div>
                    <div className="btn save small" onClick={handleSaveClick}>
                        <div className="text">
                            Save
                        </div>
                    </div>
                </div>
            )}
            
            
        </div>
    )
}
export default CollectionCardEditor;


interface SelectedCardPropertyProps {
    startCardData: ICard;
    handleCardDataChange: (data: ICard) => void;
    handleSelectVisualType: (type: string) => void;
}

const SelectedCardProperty = ({startCardData, handleCardDataChange, handleSelectVisualType}: SelectedCardPropertyProps) => {
    
    function handleNameChange(name: string) {
        if (name.length > 13) return;
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
        if (damage.length > 5) return;
        let _damage = parseInt(damage);
        handleCardDataChange({...startCardData, damage: _damage});
    }

    function handleImageChange(image: string) {
        console.log("Image change", image);
        handleCardDataChange({...startCardData, cardImage: image});
    }

    function handleRarityChange(rarity: string) {
        let _rarity = parseInt(rarity);
        handleCardDataChange({...startCardData, rarity: _rarity});
    }
    
    return (
        <div className="selectedcardproperty">
            <div className="element">
                <Input title="Name" onChange={handleNameChange} startValue={startCardData.name} />
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
                    Visuals
                </div>
                <div className="button" onClick={() => {handleSelectVisualType("frame")}}>
                    <div className="label"><i className="fa-solid fa-folder-open"></i>Frame</div>
                </div>
                <div className="button" onClick={() => {handleSelectVisualType("element")}}>
                    <div className="label"><i className="fa-solid fa-folder-open"></i>Element</div>
                </div>
                <div className="button" onClick={() => {handleSelectVisualType("image-overlay")}}>
                    <div className="label"><i className="fa-solid fa-folder-open"></i>Image Overlay</div>
                </div>
                <div className="button" onClick={() => {handleSelectVisualType("sticker")}}>
                    <div className="label"><i className="fa-solid fa-folder-open"></i>Stickers</div>
                </div>
            </div>
        </div>
    )
}

let testCards: ICard[] = [
    {
        identifier: 1,
        name: "John Olsen",
        health: 100,
        info: "Test her",
        attack: "Kredit her",
        damage: 99,
        cardNum: 1,
        frameIdentifier: 1,
        elementIdentifier: 1,
        imageOverlayIdentifier: -1,
        cardImage: "Cards/FirstEdition Collection/CardPictures/black_blackgris_01.png",
        rarity: 50
    },
    {
        identifier: 2,
        name: "John Olsen",
        health: 100,
        info: "Test her",
        attack: "Kredit her",
        damage: 99,
        cardNum: 1,
        frameIdentifier: 1,
        elementIdentifier: 1,
        imageOverlayIdentifier: 1,
        cardImage: "Cards/FirstEdition Collection/CardPictures/black_blackgris_01.png",
        rarity: 50
    },
    {
        identifier: 3,
        name: "John Olsen",
        health: 1100,
        info: "Test her",
        attack: "Kredit her",
        damage: 99,
        cardNum: 1,
        frameIdentifier: 1,
        elementIdentifier: 1,
        imageOverlayIdentifier: -1,
        cardImage: "Cards/FirstEdition Collection/CardPictures/black_blackgris_01.png",        
        rarity: 50
    }
]

let testProperties: IProperty[] = [
    {
        identifier: 1,
        type: "frame",
        label: "Normal",
        image: "Frames/normal.png"
    },
    {
        identifier: 2,
        type: "frame",
        label: "Gold",
        image: "Frames/gold.png"
    },
    {
        identifier: 3,
        type: "frame",
        label: "Shiny",
        image: "Frames/shiny.png"
    },
    {
        identifier: 4,
        type: "frame",
        label: "Black",
        image: "Frames/black.png"
    },
    {
        identifier: 1,
        type: "element",
        label: "Fire",
        image: "Elements/FireElement.png"
    },
    {
        identifier: 2,
        type: "element",
        label: "Water",
        image: "Elements/WaterElement.png"
    },
    {
        identifier: 3,
        type: "element",
        label: "Ground",
        image: "Elements/GroundElement.png"
    },
    {
        identifier: 4,
        type: "element",
        label: "Grass",
        image: "Elements/GrassElement.png"
    },
    {
        identifier: 1,
        type: "back",
        label: "Normal",
        image: "Backs/backOfCard01.png"
    },
    {
        identifier: 1,
        type: "image-overlay",
        label: "Holo",
        image: "Overlays/Holo.png"
    },
    {
        identifier: 1,
        type: "sticker",
        label: "Sticker",
        image: "Stickers/firstedition.png"
    }
]