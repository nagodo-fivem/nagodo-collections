import { ICard } from "../../Collections/ICard";
import { IItemExporterData } from "./IItemExporterData";

let defaultItemFormat = "['(itemname)'] = { name = '(itemname)', label = '(itemlabel)', weight = (itemweight), type = 'item', image = '(itemimage)', unique = false, useable = true, shouldClose = true, description = '(itemdesc)' },";

let qbExporter = (collectionId: number, collectionName: string, cards: IItemExporterData[]) => {
    let qbString = "";

    //Packs

    //Collection Folder
    let itemName = collectionId + "_folder";
    let itemLabel = collectionName + " Folder";
    let itemWeight = String(1);
    let itemImage = "collection_folder.png";
    let description = "Folder for collection: " + collectionName;
    qbString += defaultItemFormat.replace(/\(itemname\)/g, itemName).replace(/\(itemlabel\)/g, itemLabel).replace(/\(itemweight\)/g, itemWeight).replace(/\(itemimage\)/g, itemImage).replace(/\(itemdesc\)/g, description);
    qbString += "<br><br>";
  
    //Cards
    cards.forEach(card => {

        let itemName = collectionId + "_" + card.cardIdentifier + "_card";
        let itemLabel = card.cardName;
        let itemWeight = String(1);
        let itemImage = itemName + ".png";
        let description = "Card from collection: " + collectionId;

        qbString += defaultItemFormat.replace(/\(itemname\)/g, itemName).replace(/\(itemlabel\)/g, itemLabel).replace(/\(itemweight\)/g, itemWeight).replace(/\(itemimage\)/g, itemImage).replace(/\(itemdesc\)/g, description);
        qbString += "<br>";
    });



    return qbString;
};

export default qbExporter;