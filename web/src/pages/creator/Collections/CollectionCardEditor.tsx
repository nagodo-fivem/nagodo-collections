import { useEffect, useState } from "react";
import { FrontCard } from "@components/card/Card";
import Action from "../Action/Action";
import { ICard } from "./ICard";
import IProperty from "../Properties/IProperty";
import getImagePath from "@helpers/getImagePath";
import { fetchNui } from "@utils/fetchNui";
import { useNuiEvent } from "@hooks/useNuiEvent";
import { isEnvBrowser } from "@utils/misc";
import StickerPlacement from "./StickerPlacement";
import { _T } from "@utils/translation";
import SelectedCardProperty from "./SelectedCardPropertyEditor";

const defaultCard: ICard = {identifier: -1, name: "", health: 100, info: "", attack: "", damage: 99, cardNum: 1, rarity: 50, frameIdentifier: 1, elementIdentifier: 1, imageOverlayIdentifier: -1, cardImage: "Cards/FirstEditionCollection/CardPictures/black_blackgris_01.png", isCustomCard: false};
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

    useEffect(() => {
        fetchNui("fetchCards", {
            collection: collectionIdentifier
        }, testCards).then((data) => {
            setCards(data)
            });
    }, []);

    function handleNewCardClick() {
        setEditingCard(true);
        setSelectingProperty(true);

        let _defaultCard = {...defaultCard};
        _defaultCard.name = _T("NEW_CARD");

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

        setSelectedCard(defaultCard);
    }
    
    function handleDeleteClick() {
        setEditingCard(false);
        setSelectingProperty(false);

        fetchNui("deleteCard", {
            collectionIdentifier: collectionIdentifier,
            cardIdentifier: selectedCard.identifier
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
            _properties.unshift({identifier: -1, type: "image-overlay", label: _T("NONE"), image: ""})
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
                                    <FrontCard size={cardSize} name={card.name} health={card.health} info={card.info} attack={card.attack} damage={card.damage} cardNum={card.cardNum} cardImage={card.cardImage} frameImage={getFrameByIdentifier(card.frameIdentifier)} elementImage = {getElementByIdentifier(card.elementIdentifier)} imageOverlayImage={getImageOverlayByIdentifier(card.imageOverlayIdentifier)} isCustomCard = {card.isCustomCard}/>
                                </div>
                            )

                        })}

                    </div>
                )};

                {(editingCard && selectedCard) && (
                    <div className="editor">
                        <div className="preview">
                            <FrontCard size={1.6} name={newCardData.name} health={newCardData.health} info={newCardData.info} attack={newCardData.attack} damage={newCardData.damage} cardNum={newCardData.cardNum} cardImage={newCardData.cardImage} frameImage={getFrameByIdentifier(newCardData.frameIdentifier)} elementImage = {getElementByIdentifier(newCardData.elementIdentifier)} imageOverlayImage={getImageOverlayByIdentifier(newCardData.imageOverlayIdentifier)} isCustomCard = {newCardData.isCustomCard} />
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

                {/* {selectedCard.name === "" && (
                    // filter 
                )} */}
                
            </div>

            {selectedCard.name !== "" && (
                <div className="btns">
                    <div className="btn cancel small" onClick={handleCancelClick}>
                        <div className="text">
                            {_T("CANCEL")}
                        </div>
                    </div>
                    <div className="btn delete small" onClick={handleDeleteClick}>
                        <div className="text">
                            {_T("DELETE")}
                        </div>
                    </div>
                    <div className="btn save small" onClick={handleSaveClick}>
                        <div className="text">
                            {_T("SAVE")}
                        </div>
                    </div>
                </div>
            )}
            
            
        </div>
    )
}
export default CollectionCardEditor;

let testCards: ICard[] = [
    {
        identifier: 1,
        name: "John Olsen",
        health: 100,
        info: "Test her",
        attack: "Kredit her dwdwdw dww dwdwdddd",
        damage: 9999,
        cardNum: 1,
        frameIdentifier: 1,
        elementIdentifier: 1,
        imageOverlayIdentifier: -1,
        cardImage: "Cards/FirstEditionCollection/CardPictures/black_blackgris_01.png",
        rarity: 50,
        isCustomCard: false
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
        cardImage: "Cards/FirstEditionCollection/CardPictures/black_blackgris_01.png",
        rarity: 50,
        isCustomCard: false
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
        cardImage: "Cards/FirstEditionCollection/CustomCards/c_john_olsen_01.png",        
        rarity: 50,
        isCustomCard: true
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