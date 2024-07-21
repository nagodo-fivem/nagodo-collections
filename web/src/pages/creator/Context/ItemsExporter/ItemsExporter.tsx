import { useEffect, useState } from "react";
import "./itemsexporter.scss";
import { fetchNui } from "@utils/fetchNui";
import DropDown from "@components/Dropdown/Dropdown";
import qbExporter from "./qb-exporter";
import { IItemExporterData } from "./IItemExporterData";
import { _T } from "@utils/translation";

interface ItemsExporterProps {
    collectionIdentifier: number;
    collectionName: string;
    closeContext: () => void;
}

const ItemsExporter = ({collectionIdentifier, collectionName, closeContext}: ItemsExporterProps) => {
    const [cards, setCards] = useState<IItemExporterData[]>(testCards);
    const [exportType, setExportType] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [copyToClipboardStatus, setCopyToClipboardStatus] = useState<string>(_T("COPY_TO_CLIPBOARD"));

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
            let qbString = qbExporter(collectionIdentifier, collectionName, cards);
            setOutput(qbString);
        }
       
    }

    function handleCopyToClipboard() {
        let toClipBoard = output.replace(/<br>/g, "\n");
        
        const element = document.createElement('textarea');
        element.value = toClipBoard;
        document.body.appendChild(element);
        element.select();
        document.execCommand('copy');
        document.body.removeChild(element);

        // navigator.clipboard.writeText(toClipBoard);
        setCopyToClipboardStatus(_T("COPIED_TO_CLIPBOARD"));
    }

    return (
        <div className="itemsexporter">

            <div className="exportingCollectionName">
                {_T("EXPORTING_COLLECTION")} {collectionIdentifier}
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

let testCards: IItemExporterData[] = [
    {
        collectionIdentifier: 1,
        cardIdentifier: 1,
        cardName: "John Olsen"
    },
    {
        collectionIdentifier: 1,
        cardIdentifier: 2,
        cardName: "John Olsen1"
    },
    {
        collectionIdentifier: 1,
        cardIdentifier: 3,
        cardName: "John Olsen2"
    },
]

export default ItemsExporter;