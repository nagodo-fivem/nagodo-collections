import { useEffect, useRef, useState } from "react";
import "./imageexporter.scss";
import { ICard } from "../../Collections/ICard";
import { fetchNui } from "../../../../utils/fetchNui";
import domtoimage from 'dom-to-image';
import FrontCard from "../../../../components/card/Card";
import IProperty from "../../Properties/IProperty";
import DropDown from "../../../../components/Dropdown/Dropdown";

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
                console.log(blob);

                let base: any = await base64(blob);
                let splitChunks = [];

                //Split in 100kb chunks
                for (let i = 0; i < base.length; i += 100000) {
                    splitChunks.push(base.substring(i, i + 100000));
                }

                for (let i = 0; i < splitChunks.length; i++) {
                    await fetchNui("saveImage", {
                        cardName: collectionIdentifier + "_" + currentCard.identifier + ".png",
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
            perCard = 0.18;
        }
        else if (cardQuality === 3) {
            perCard = 0.252;
        }
        else if (cardQuality === 4) {
            perCard = 0.371;
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

        return (seconds).toFixed(1) + " seconds";
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

    return (
        <div className="imageexporter">


            {cards.length > 0 && currentCard && (
                <>
                    <div id = "domToExport" className="domToExport" ref={domToExport}>
                        <FrontCard size={QualityToSize(cardQuality)} name={currentCard.name} health={100} info={"Din mor"} attack={"Cola her"} damage={99} cardNum={23} cardImage={"https://i1.sndcdn.com/artworks-000482128809-fp33kj-t500x500.jpg"} frameImage={getFrameByIdentifier(1)} elementImage = {getElementByIdentifier(1)} imageOverlayImage={getImageOverlayByIdentifier(1)}/>
                    </div>

                    <div className="information">
                        <QualitySelector callback = {setCardQuality} />
                        <BytesPerSecond callback = {setBytesPerSecond} />
                        <div className="cardToExport">Cards in collection: {cardAmountToExport}</div>
                        <div className="estimatedSize">Estimated file size: {GetEstimatedFileSize()}</div>
                        <div className="estimatedTime">Estimated time: {GetEstimatedTime()}</div>
                        
                    </div>

                    {isExporting && (
                        <>
                            <div className="stop-btn" onClick={handleStopExportClick}>
                                <div className="label">Stop</div>
                            </div>
                        </>
                        
                       
                    )}
                    

                    {!isExporting && (
                        <div className="cancel-btn" onClick={handleCancelClick}>
                            <div className="label">Cancel</div>
                        </div>
                    )}

                    {!isExporting && (

                        <div className="export-btn" onClick={handleExportClick}>
                            <div className="label">Export</div>
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
            <DropDown title="Quality" options={[
                {label: "Low", identifier: "1"},
                {label: "Medium", identifier: "2"},
                {label: "High", identifier: "3"},
                {label: "Ultra", identifier: "4"}
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
            <DropDown title="Bytes per second" options={[
                {label: "20000", identifier: "20000"},
                {label: "30000", identifier: "30000"},
                {label: "40000", identifier: "40000"},
                {label: "50000", identifier: "50000"},
                {label: "60000", identifier: "60000"}
            ]} onChange={handleChange} currentValue="40000"/>
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
        rarity: 50
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
        rarity: 50
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
        rarity: 50
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
        rarity: 50
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
        rarity: 50
    },
    {
        identifier: 6,
        name: "John Olsen6",
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
        identifier: 7,
        name: "John Olsen7",
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
        identifier: 8,
        name: "John Olsen8",
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
        identifier: 9,
        name: "John Olsen9",
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
        identifier: 10,
        name: "John Olsen10",
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
        identifier: 11,
        name: "John Olsen11",
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
        identifier: 12,
        name: "John Olsen12",
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
        identifier: 13,
        name: "John Olsen13",
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
        identifier: 14,
        name: "John Olsen14",
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
        identifier: 15,
        name: "John Olsen15",
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
        identifier: 16,
        name: "John Olsen16",
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
        identifier: 17,
        name: "John Olsen17",
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
        identifier: 18,
        name: "John Olsen18",
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
        identifier: 19,
        name: "John Olsen19",
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
        identifier: 20,
        name: "John Olsen20",
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
        identifier: 21,
        name: "John Olsen21",
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
        identifier: 22,
        name: "John Olsen22",
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
        identifier: 23,
        name: "John Olsen23",
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
        identifier: 24,
        name: "John Olsen24",
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
        identifier: 25,
        name: "John Olsen25",
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
        identifier: 26,
        name: "John Olsen26",
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
        identifier: 27,
        name: "John Olsen27",
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
        identifier: 28,
        name: "John Olsen28",
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
        identifier: 29,
        name: "John Olsen29",
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
        identifier: 30,
        name: "John Olsen30",
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
    }


]

export default ImageExporter;