import { useState } from "react";
import ICollection from "./ICollection";
import NewCollection from "./NewCollection";
import './collections.scss';
import EditingCollection from "./EditingCollection";
import CollectionCardEditor from "./CollectionCardEditor";
import Action from "../Action/Action";

interface CollectionsOverviewProps {
    collections: ICollection[];
}
let currentSelectedCollection: ICollection = {identifier: 0, label: "", cardAmount: 0};
const CollectionsOverview = ({collections}: CollectionsOverviewProps) => {
    const [addingNewCollection, setAddingNewCollection] = useState(false);
    const [editingCollection, setEditingCollection] = useState(false);
    const [editingCards, setEditingCards] = useState(false);

    function handleNewCollectionBtn() {
        setAddingNewCollection(true);
    }

    function handleNewCollectionCreated() {
        setAddingNewCollection(false);
    }
    
    function handleCancelClick() {
        console.log("cancel");
        setAddingNewCollection(false);
        setEditingCollection(false);
    }

    function handleCollectionChange(collection: ICollection) {
        currentSelectedCollection = collection;
    }

    function handleCollectionClick(collection: ICollection) {
        currentSelectedCollection = collection;
        setAddingNewCollection(false);
        setEditingCollection(true);
    }

    function handleEditCardsClick() {
        setEditingCards(true);
    }

    return (
        <div className="collections">

            {editingCards && (
                <CollectionCardEditor collectionIdentifier={currentSelectedCollection.identifier} />
            )}

            {!editingCards && (
                <>
                    <div className="overview">

                        <div className="scroll">
                            {collections.map((collection, index) => {
                                return (
                                    <CollectionElement key={index} collection = {collection} onCollectionClick={handleCollectionClick}/>
                                )
                            })}
                        </div>

                    </div>
                    
                    <div className="actions">
                        <NewCollection show = {addingNewCollection} cancelBtnCallback={handleCancelClick} handleNewCollectionCreated = {handleNewCollectionCreated}/>
                        <EditingCollection show = {editingCollection} cancelBtnCallback = {handleCancelClick} selectedCollection={currentSelectedCollection} changeCallback={handleCollectionChange} handleEditCardsClick = {handleEditCardsClick} />

                        <Action label = "New Collection" onClick={handleNewCollectionBtn}/>
                    </div>
                </>
            )}

        </div>
    )
}

interface CollectionElementProps {
    collection: ICollection;
    onCollectionClick: (collection: ICollection) => void;
}

const CollectionElement = ({collection, onCollectionClick}: CollectionElementProps) => {

    function handleCollectionClick(collection: ICollection) {
        onCollectionClick(collection);
    }

    return (
        <div className="element" onClick={() => {handleCollectionClick(collection)}}>
            <div className="label">{collection.label}</div>
        </div>
    )
}

export default CollectionsOverview;