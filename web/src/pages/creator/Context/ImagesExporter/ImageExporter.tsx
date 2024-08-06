import { useEffect, useRef, useState } from "react";
import "./imageexporter.scss";
import { ICard } from "../../Collections/ICard";
import { fetchNui } from "../../../../utils/fetchNui";
import domtoimage from 'dom-to-image';
import { FrontCard } from "../../../../components/card/Card";
import IProperty from "../../Properties/IProperty";
import DropDown from "../../../../components/Dropdown/Dropdown";
import { _T } from "@utils/translation";
import { isContext } from "vm";

interface ImageExporterProps {
    collectionIdentifier: number;
    closeContext: () => void;
}

const ImageExporter = ({collectionIdentifier, closeContext}: ImageExporterProps) => {
    const [cards, setCards] = useState<ICard[]>(testCards);
    const [properties, setProperties] = useState<IProperty[]>(testProperties);
    const [currentCard, setCurrentCard] = useState<ICard>();
    const [isExporting, setIsExporting] = useState<boolean>(false);

    const [cardAmountToExport, setCardAmountToExport] = useState<number>(1);
    const [cardAmountExported, setCardAmountExported] = useState<number>(0);
    const [cardQuality, setCardQuality] = useState<number>(2);
    const [bytesPerSecond, setBytesPerSecond] = useState<number>(40000);

    const domToExport = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchNui<any>("getPropertiesForImageExport", {

        }).then((data) => {
            setProperties(data);
        }).catch((error) => {
            setProperties(testProperties);
        })

        fetchNui<any>("getCardsForImageExport", {
            collectionIdentifier: collectionIdentifier
        }).then((data) => {
            setCardAmountToExport(data.length);
            setCards(data);
            setCurrentCard(data[0]);
        }).catch((error) => {
            setCardAmountToExport(testCards.length);
            setCards(testCards);
            setCurrentCard(testCards[0]);
        })
    }, []);

    useEffect(() => {
        if (cardAmountExported === cardAmountToExport) return;
        if (!isExporting) return;
        setTimeout(() => {
            convertToImage();
        }, 100);
    }, [currentCard]);

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

    function convertToImage() {
        
        if (domToExport.current == null) return;
        if (currentCard == null) return;

        domtoimage.toBlob(domToExport.current)
            .then(async function (blob: any) {

                let base: any = await base64(blob);
                let splitChunks = [];

                //Split in 100kb chunks
                for (let i = 0; i < base.length; i += 100000) {
                    splitChunks.push(base.substring(i, i + 100000));
                }

                for (let i = 0; i < splitChunks.length; i++) {
                    await fetchNui("saveImage", {
                        cardName: "card_" + collectionIdentifier + "_" + currentCard.identifier,
                        payloadAmount: splitChunks.length,
                        payloadIndex: i,
                        blob: splitChunks[i],
                        bps: bytesPerSecond
                    });
                }

                setCardAmountExported(cardAmountExported + 1);
                if (cardAmountExported + 1 >= cardAmountToExport) {
                    setIsExporting(false);
                    setCardAmountExported(0);
                    setCurrentCard(cards[0]);
                    return;
                }
                setCurrentCard(cards[cardAmountExported + 1]);
            });
    }

    function base64(blob: any): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('Failed to convert blob to base64 string.'));
                }
            }
        });
    }

    function handleExportClick() {
        if (isExporting) return;

        setIsExporting(true);
        setCardAmountExported(0);

        convertToImage();
    }

    function handleStopExportClick() {
        setIsExporting(false);
        setCardAmountExported(0);
        setCurrentCard(cards[0]);
    }

    function handleCancelClick() {
        setIsExporting(false);
        setCardAmountExported(0);
        setCurrentCard(undefined);

        closeContext();
    }

    function GetEstimatedFileSize() {
        let perCard = 0.5;

        if (cardQuality === 1) {
            perCard = 0.06;
        } else if (cardQuality === 2) {
            perCard = 0.24;
        }
        else if (cardQuality === 3) {
            perCard = 0.36;
        }
        else if (cardQuality === 4) {
            perCard = 0.54;
        }
        

        let allCards = cardAmountToExport * perCard;

        return (perCard).toFixed(2) + " (" + allCards.toFixed(2) + ") MB";
    }

    function GetEstimatedTime() {
        let perCard = 0.5;

        if (cardQuality === 1) {
            perCard = 0.06;
        } else if (cardQuality === 2) {
            perCard = 0.18;
        }
        else if (cardQuality === 3) {
            perCard = 0.252;
        }
        else if (cardQuality === 4) {
            perCard = 0.371;
        }

        let allCards = cardAmountToExport * (perCard * 100000);

        let seconds = allCards / bytesPerSecond;
        seconds += cardAmountToExport * 0.2;

        return (seconds).toFixed(1) + " " + _T("SECONDS");
    }

    function QualityToSize(quality: number) {
        switch (quality) {
            case 1:
                return 0.5;
            case 2:
                return 1;
            case 3:
                return 1.25;
            case 4:
                return 1.6;
            default:
                return 0.5;
        }
    }

    function getDomToExportSize(size: number) {
        let scale = 0.025 * size;
        let width = 1024 * scale
        let height = 1420 * scale

        return {"height": height + "vh", "width": width + "vh"}
    }

    return (
        <div className="imageexporter">

            {cards.length === 0 && (
                <div >
                    <div className="nocardstoexport" >
                        {_T("NO_CARDS_TO_EXPORT")}
                    </div>
                    <div className="returnbtn" onClick={handleCancelClick}>
                        <div className="text">
                            {_T("BACK")}
                        </div>
                    </div>
                </div>
                
            )}


            {cards.length > 0 && currentCard && (
                <>
                    <div id = "domToExport" className="domToExport" ref={domToExport} style={getDomToExportSize(QualityToSize(cardQuality))}>
                        <FrontCard size={QualityToSize(cardQuality)} name={currentCard.name} health={currentCard.health} info={currentCard.info} attack={currentCard.attack} damage={currentCard.damage} cardNum={23} cardImage={currentCard.cardImage} frameImage={getFrameByIdentifier(currentCard.frameIdentifier)} elementImage = {getElementByIdentifier(currentCard.elementIdentifier)} imageOverlayImage={getImageOverlayByIdentifier(currentCard.imageOverlayIdentifier)} isCustomCard = {currentCard.isCustomCard}/>
                    </div>

                    <div className="information">
                        <QualitySelector callback = {setCardQuality} />
                        <BytesPerSecond callback = {setBytesPerSecond} />
                        <div className="cardToExport">{_T("CARDS_IN_COLLECTION")} {cardAmountToExport}</div>
                        <div className="estimatedSize">{_T("ESTIMATED_FILE_SIZE")} {GetEstimatedFileSize()}</div>
                        <div className="estimatedTime">{_T("ESTIMATED_TIME")} {GetEstimatedTime()}</div>
                        
                    </div>

                    {isExporting && (
                        <>
                            <div className="stop-btn" onClick={handleStopExportClick}>
                                <div className="label">{_T("STOP")}</div>
                            </div>
                        </>
                        
                       
                    )}
                    

                    {!isExporting && (
                        <div className="cancel-btn" onClick={handleCancelClick}>
                            <div className="label">{_T("CANCEL")}</div>
                        </div>
                    )}

                    {!isExporting && (

                        <div className="export-btn" onClick={handleExportClick}>
                            <div className="label">{_T("EXPORT")}</div>
                        </div>
                    )}
                </>
            )}

            
        </div>
    )
}


interface QualitySelectorProps {
    callback: (quality: number) => void;
}

const QualitySelector = ({callback}: QualitySelectorProps) => {

    function handleChange(value: string) {
        callback(parseInt(value));
    }

    return (
        <div className="qualityselector">
            <DropDown title= {_T("QUALITY")} options={[
                {label: _T("LOW"), identifier: "1"},
                {label: _T("MEDIUM"), identifier: "2"},
                {label: _T("HIGH"), identifier: "3"},
                {label: _T("ULTRA"), identifier: "4"}
            ]} onChange={handleChange} currentValue="2"/>
        </div>
    )
}

interface BytesPerSecondProps {
    callback: (bytes: number) => void;
}

const BytesPerSecond = ({callback}: BytesPerSecondProps) => {

    function handleChange(value: string) {
        callback(parseInt(value));
    }

    return (
        <div className="bytespersecond">
            <DropDown title={_T("SPEED")} options={[
                {label: _T("DEFAULT"), identifier: "20000"},
                {label: "1.5x", identifier: "30000"},
                {label: "2x", identifier: "40000"},
                {label: "2.5x", identifier: "50000"},
                {label: "3x", identifier: "60000"}
            ]} onChange={handleChange} currentValue="20000"/>
        </div>
    )
}


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
    }
]


let testCards = [
    {
        identifier: 1,
        name: "John Olsen1",
        health: 100,
        info: "Test her",
        attack: "Kredit her",
        damage: 99,
        cardNum: 1,
        frameIdentifier: 1,
        elementIdentifier: 1,
        imageOverlayIdentifier: -1,
        cardImage: "Cards/FirstEdition Collection/CardPictures/black_blackgris_01.png",
        rarity: 50,
        isCustomCard: false
    },
    {
        identifier: 2,
        name: "John Olsen2",
        health: 100,
        info: "Test her",
        attack: "Kredit her",
        damage: 99,
        cardNum: 1,
        frameIdentifier: 1,
        elementIdentifier: 1,
        imageOverlayIdentifier: 1,
        cardImage: "Cards/FirstEdition Collection/CardPictures/black_blackgris_01.png",
        rarity: 50,
        isCustomCard: false
    },
    {
        identifier: 3,
        name: "John Olsen3",
        health: 1100,
        info: "Test her",
        attack: "Kredit her",
        damage: 99,
        cardNum: 1,
        frameIdentifier: 1,
        elementIdentifier: 1,
        imageOverlayIdentifier: -1,
        cardImage: "Cards/FirstEdition Collection/CardPictures/black_blackgris_01.png",        
        rarity: 50,
        isCustomCard: false
    },
    {
        identifier: 4,
        name: "John Olsen4",
        health: 100,
        info: "Test her",
        attack: "Kredit her",
        damage: 99,
        cardNum: 1,
        frameIdentifier: 1,
        elementIdentifier: 1,
        imageOverlayIdentifier: 1,
        cardImage: "Cards/FirstEdition Collection/CardPictures/black_blackgris_01.png",
        rarity: 50,
        isCustomCard: false
    },
    {
        identifier: 5,
        name: "John Olsen5",
        health: 100,
        info: "Test her",
        attack: "Kredit her",
        damage: 99,
        cardNum: 1,
        frameIdentifier: 1,
        elementIdentifier: 1,
        imageOverlayIdentifier: -1,
        cardImage: "Cards/FirstEdition Collection/CardPictures/black_blackgris_01.png",
        rarity: 50,
        isCustomCard: false
    },
]

export default ImageExporter;