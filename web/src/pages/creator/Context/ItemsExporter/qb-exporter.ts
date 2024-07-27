import { _T } from "@utils/translation";
import { ICard } from "../../Collections/ICard";
import { IItemExporterData } from "./IItemExporterData";

let defaultItemFormat = "['(itemname)'] = { name = '(itemname)', label = '(itemlabel)', weight = (itemweight), type = 'item', image = '(itemimage)', unique = false, useable = true, shouldClose = true, description = '(itemdesc)' },";

let qbExporter = (collectionId: number, collectionName: string, cards: IItemExporterData[]) => {
    let qbString = "";

    //Packs
    let packItemName = "pack_" + collectionId;
    let packItemLabel = collectionName + " Pack";
    let packItemWeight = String(1);
    let packItemImage = "collection_pack.png";
    let packDescription = _T("PACK_FOR_COLLECTION") + collectionName;
    qbString += defaultItemFormat.replace(/\(itemname\)/g, packItemName).replace(/\(itemlabel\)/g, packItemLabel).replace(/\(itemweight\)/g, packItemWeight).replace(/\(itemimage\)/g, packItemImage).replace(/\(itemdesc\)/g, packDescription);
    qbString += "<br><br>";

    //Collection Folder
    let itemName = "folder_" + collectionId;
    let itemLabel = collectionName + " Folder";
    let itemWeight = String(1);
    let itemImage = "collection_folder.png";
    let description = _T("FOLDER_FOR_COLLECTION") + collectionName;
    qbString += defaultItemFormat.replace(/\(itemname\)/g, itemName).replace(/\(itemlabel\)/g, itemLabel).replace(/\(itemweight\)/g, itemWeight).replace(/\(itemimage\)/g, itemImage).replace(/\(itemdesc\)/g, description);
    qbString += "<br><br>";
  
    //Cards
    cards.forEach(card => {

        let itemName = "card_" + collectionId + "_" + card.cardIdentifier;
        let itemLabel = card.cardName;
        let itemWeight = String(1);
        let itemImage = itemName + ".png";
        let description = _T("CARD_FROM_COLLECTION") + collectionName;

        qbString += defaultItemFormat.replace(/\(itemname\)/g, itemName).replace(/\(itemlabel\)/g, itemLabel).replace(/\(itemweight\)/g, itemWeight).replace(/\(itemimage\)/g, itemImage).replace(/\(itemdesc\)/g, description);
        qbString += "<br>";
    });



    return qbString;
};

export default qbExporter;