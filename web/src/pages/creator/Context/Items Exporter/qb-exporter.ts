import { ICard } from "../../Collections/ICard";

let defaultItemFormat = "['(itemname)'] = { name = '(itemname)', label = '(itemlabel)', weight = (itemweight), type = 'item', image = '(itemimage)', unique = false, useable = true, shouldClose = true, description = '(itemdesc)' },";

let qbExporter = (collectionId: number, cards: ICard[]) => {
    let qbString = "";

    //Packs

    //Collection Folder
    let itemName = collectionId + "_folder";
    let itemLabel = "Collection Folder";
    let itemWeight = String(1);
    let itemImage = "collection_folder.png";
    let description = "Folder for collection: " + collectionId;
    qbString += defaultItemFormat.replace(/\(itemname\)/g, itemName).replace(/\(itemlabel\)/g, itemLabel).replace(/\(itemweight\)/g, itemWeight).replace(/\(itemimage\)/g, itemImage).replace(/\(itemdesc\)/g, description);
    qbString += "<br><br>";
  
    //Cards
    cards.forEach(card => {

        let itemName = collectionId + "_" + card.identifier + "_card";
        let itemLabel = card.name;
        let itemWeight = String(1);
        let itemImage = itemName + ".png";
        let description = "Card from collection: " + collectionId;

        qbString += defaultItemFormat.replace(/\(itemname\)/g, itemName).replace(/\(itemlabel\)/g, itemLabel).replace(/\(itemweight\)/g, itemWeight).replace(/\(itemimage\)/g, itemImage).replace(/\(itemdesc\)/g, description);
        qbString += "<br>";
    });



    return qbString;
};

export default qbExporter;