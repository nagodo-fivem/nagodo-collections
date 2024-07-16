import { useEffect, useRef, useState } from "react";
import "./itemsexporter.scss";
import { ICard } from "../../Collections/ICard";
import { fetchNui } from "@utils/fetchNui";
import DropDown from "@components/Dropdown/Dropdown";
import qbExporter from "./qb-exporter";

interface ItemsExporterProps {
    collectionIdentifier: number;
    closeContext: () => void;
}

const ItemsExporter = ({collectionIdentifier, closeContext}: ItemsExporterProps) => {
    const [cards, setCards] = useState<ICard[]>(testCards);
    const [exportType, setExportType] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [copyToClipboardStatus, setCopyToClipboardStatus] = useState<string>("Copy to clipboard");

    useEffect(() => {
        fetchNui<any>("getCardsForItemsExport", {
            collectionIdentifier: collectionIdentifier
        }, testCards).then((data) => {
            setCards(data);
        })
    }, []);

    function getExportTypes() {
        return [
            {identifier: "qb", label: "QB-Core"},
        ]
    }

    function handleExportTypeChange(type: string) {
        console.log(type);
        setExportType(type);
    }

    function handleCloseClick() {
        closeContext();
    }

    function handleExportClick() {
        
        if (exportType === "qb") {
            let qbString = qbExporter(collectionIdentifier, cards);
            setOutput(qbString);
        }
       
    }

    function handleCopyToClipboard() {
        let toClipBoard = output.replace(/<br>/g, "\n");
        navigator.clipboard.writeText(toClipBoard);
        setCopyToClipboardStatus("Output has been copied to clipboard!");
    }

    return (
        <div className="itemsexporter">

            <div className="exportingCollectionName">
                Exporting collection: {collectionIdentifier}
            </div>
            
            <div className="settings">
                <DropDown title="Export style" options={getExportTypes()} onChange={handleExportTypeChange} customNotSelected = {"Select export style"}/>
    
            </div>

            <div className="output">
                <div className="title">
                    Output
                </div>
                <div className="line"></div>
                <div className="outputtext" dangerouslySetInnerHTML= {{ __html: output }}></div>
            </div>

            <div className="copytoclipboard" onClick={handleCopyToClipboard}>
                <div className="label">{copyToClipboardStatus}</div>
            </div>

            <div className="close-btn" onClick={handleCloseClick}>
                <div className="label">Close</div>
            </div>

            {exportType === "" && (
                <div className="export-btn noaccess">
                    <div className="label">Generate</div>
                </div>
            )}

            {exportType !== "" && (
                <div className="export-btn" onClick={handleExportClick}>
                    <div className="label">Generate</div>
                </div>
            )}
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

export default ItemsExporter;