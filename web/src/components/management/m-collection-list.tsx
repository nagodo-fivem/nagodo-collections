import React, {useState} from 'react';
import { ManageCollection } from './m-manage-collection';
import { AddNewCollection } from './m-add-new-collection';

interface Collection {
    name: string;
    id: number;
}

function NewCollection(props: {setAddingNewCollection: Function}) {
    return (
        <div className='collectionItem' onClick={() => {props.setAddingNewCollection(true)}}>
            <i className="fa-solid fa-folder-plus icon"></i>
            <p className='title'>New</p>
        </div>
    )
}

function CollectionItem(props: {name: string, pressable?: boolean, setManageCollection: Function}) {
    var name: string = props.name;

    if (name === undefined) name = "Name is undefined";

    var maxNameLength: number = 15;
    if (name.length > maxNameLength) name = name.substring(0, maxNameLength) + "...";


    if (props.pressable) {
        return (
            <div className='collectionItem' onClick={() => {props.setManageCollection(true)}}>
                <i className="fa-solid fa-folder icon"></i>
                <p className='title'>{name}</p>
            </div>
        )
    }

    return (
        <div className='collectionItem' onClick={() => {}}>
            <i className="fa-solid fa-folder icon"></i>
            <p className='title'>{name}</p>
        </div>
    )
}

export function AllCollections() {
    const [allCollections, setAllCollections]          = useState<Collection[]> ([{name: "Test", id: 1}])
    const [allCollectionsNames, setAllCollectionNames] = useState<string[]>     (["din mor"])
    const [addingNewCollection, setAddingNewCollection] = useState<boolean>     (false)
    const [manageCollection, setManageCollection]       = useState<boolean>     (false)

    if (addingNewCollection) {
        return (
            <div className='collections'>
                <ReturnBtn type = {"collections"} setAddingNewCollection={setAddingNewCollection}/>
                <AddNewCollection allCollectionsNames={allCollectionsNames} />
            </div>
        )
    } 

    if (manageCollection) {
        return (
            <div className='manageCollection'>
                <ReturnBtn type = {"manageCollection"} setManageCollection={setManageCollection}/>
                <ManageCollection />  

            </div>
        );
    }

    return (
        <div className="collections">
            <NewCollection setAddingNewCollection={setAddingNewCollection}/>

            {allCollections.map((collection) => (
                <CollectionItem name={collection.name} key={collection.id} pressable = {true} setManageCollection={setManageCollection}/>
            ))}
        </div>
    );
}

function ReturnBtn(props: {type: string, setAddingNewCollection?: any, setManageCollection?: any}) {
    if (props.type === "collections") {
        return (
            <div className='returnBtn' onClick={() => {props.setAddingNewCollection(false)}}>
                
                <p className='title'><i className="fa-solid fa-arrow-left icon"></i>Back</p>
            </div>
        )
    }
    else if (props.type === "manageCollection") {
        return (
            <div className='returnBtn' onClick={() => {props.setManageCollection(false)}}>
                
                <p className='title'><i className="fa-solid fa-arrow-left icon"></i>Back</p>
            </div>
        )
    }

    return null;
}