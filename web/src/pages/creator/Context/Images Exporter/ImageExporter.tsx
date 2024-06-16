import { useEffect, useRef, useState } from "react";
import "./imageexporter.scss";
import { ICard } from "../../Collections/ICard";
import { fetchNui } from "../../../../utils/fetchNui";
import domtoimage from 'dom-to-image';
import Card from "../../../../components/card/Card";
import IProperty from "../../Properties/IProperty";
import DropDown from "../../../../components/Dropdown/Dropdown";

interface ImageExporterProps {
    collectionIdentifier: number;
}

const ImageExporter = ({collectionIdentifier}: ImageExporterProps) => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [properties, setProperties] = useState<IProperty[]>(testProperties);
    const [currentCard, setCurrentCard] = useState<ICard>();
    const [isExporting, setIsExporting] = useState<boolean>(false);

    const [cardAmountToExport, setCardAmountToExport] = useState<number>(1);
    const [cardAmountExported, setCardAmountExported] = useState<number>(0);
    const [cardQuality, setCardQuality] = useState<number>(4);

    const domToExport = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchNui<any>("getCardsForImageExport", {
            collectionIdentifier: collectionIdentifier
        }, []).then((data) => {
            setCards(data);
        })
    }, []);

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
        domtoimage.toBlob(domToExport.current)
            .then(async function (blob: any) {
                console.log(blob);

                let base = await base64(blob);

                fetchNui("saveImage", {
                    blob: base
                });
            });
    }

    function base64(blob: any) {
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
       
    }

    function GetEstimatedFileSize() {
        let perCard = 0.5;

        if (cardQuality === 1) {
            perCard = 0.5;
        } else if (cardQuality === 2) {
            perCard = 1;
        }
        else if (cardQuality === 3) {
            perCard = 1.25;
        }
        else if (cardQuality === 4) {
            perCard = 1.6;
        }
        

        let allCards = cardAmountToExport * perCard;

        return (perCard).toFixed(2) + " (" + allCards.toFixed(2) + ") MB";
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

            <div id = "domToExport" className="domToExport" onClick={convertToImage} ref={domToExport}>
                <Card size={QualityToSize(cardQuality)} name={"John Olsen"} health={100} info={"Din mor"} attack={"Cola her"} damage={99} cardNum={23} cardImage={"https://i1.sndcdn.com/artworks-000482128809-fp33kj-t500x500.jpg"} frameImage={getFrameByIdentifier(1)} elementImage = {getElementByIdentifier(1)} imageOverlayImage={getImageOverlayByIdentifier(1)}/>
            </div>

            <div className="information">
                <QualitySelector callback = {setCardQuality} />
                <div className="cardToExport">Cards in collection: {cardAmountToExport}</div>
                <div className="estimatedSize">Estimated file size: {GetEstimatedFileSize()}</div>
                
            </div>

            <div className="export-btn" onClick={handleExportClick}>
                <div className="label">Export</div>
            </div>
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
            ]} onChange={handleChange}/>
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


export default ImageExporter;