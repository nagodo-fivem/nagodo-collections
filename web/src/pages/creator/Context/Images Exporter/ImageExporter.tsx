import { useEffect, useState } from "react";
import "./imageexporter.scss";
import { ICard } from "../../Collections/ICard";
import { fetchNui } from "../../../../utils/fetchNui";
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import Card from "../../../../components/card/Card";
import { getImagePath } from "../../../../helpers/ItemImagePath";

interface ImageExporterProps {
    collectionIdentifier: number;
}

const ImageExporter = ({collectionIdentifier}: ImageExporterProps) => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [currentCard, setCurrentCard] = useState<ICard>();

    useEffect(() => {
        fetchNui<any>("getCardsForExport", {
            collectionIdentifier: collectionIdentifier
        }, []).then((data) => {
            setCards(data);
        })
    }, []);

    function convertToImage() {
        let node = document.getElementById('domToExport');
        if (node == null) return;
        domtoimage.toBlob(node)
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

    return (
        <div className="imageexporter">

            <div id = "domToExport" className="domToExport" onClick={convertToImage}>
            <Card size={1} name={"John Olsen"} health={100} info={"Din mor"} attack={"Cola her"} damage={99} cardNum={23} cardImage={"https://i1.sndcdn.com/artworks-000482128809-fp33kj-t500x500.jpg"} frameImage={"Frames/normal.png"} elementImage = {"Elements/FireElement.png"} imageOverlayImage={""}/>
            </div>

        </div>
    )
}


export default ImageExporter;