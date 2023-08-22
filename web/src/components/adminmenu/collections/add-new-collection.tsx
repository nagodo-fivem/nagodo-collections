import React, {useState} from 'react';
import { fetchNui } from "../../../utils/fetchNui";


function NewCollectionInput(props: {setNewCollectionName: Function, currentResponse: string, allCollectionNames: string[]}) {
    const [value, setValue] = useState<string>("")
    const [currentError, setCurrentError] = useState<string>("")

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
        props.setNewCollectionName(e.target.value);
        

        if (props.allCollectionNames === undefined) return;

        if (props.allCollectionNames.includes(e.target.value)) {
            setCurrentError("Collection name already exists")
        } else {
            setCurrentError("")
        }

    }

    return (
        <div className='newCollectionInput'>
            <p className='title'><i className="fa-solid fa-hashtag"></i>Collection name</p>
            <input type="text" value={value} onChange={handleChange} />
            <p className='error'>{currentError}</p>
            <p className='response'>{props.currentResponse}</p>
        </div>
    )
}


export function AddNewCollection(props: {allCollectionsNames: string[]}) {
    const [currentResponse, setCurrentResponse] = useState<string>("")

    let newCollectionName: string = "";

    function setNewCollectionName(name: string) {
        newCollectionName = name;
    }

    function getNewCollectionName() {
        return newCollectionName;
    }

    return (
        <div className='addNewCollection'>
            <NewCollectionInput setNewCollectionName = {setNewCollectionName} currentResponse = {currentResponse} allCollectionNames = {props.allCollectionsNames}/>
            <NewCollectionAcceptBtn setCurrentResponse={setCurrentResponse} getNewCollectionName={getNewCollectionName} allCollectionNames = {props.allCollectionsNames}/>
        </div>
    );
}




function NewCollectionAcceptBtn(props: {setCurrentResponse: Function, getNewCollectionName: Function, allCollectionNames: string[]}) {

    function acceptNewCollection() {
        let newCollectionName: string = props.getNewCollectionName();

        if (props.allCollectionNames != undefined) {

            if (props.allCollectionNames.includes(newCollectionName)) return;
            
        };

        fetchNui<string>('createNewCollection', {
            name: newCollectionName
        }).then((response) => {
            props.setCurrentResponse(response);
            
        })
    }

    return (
        <div className='newCollectionAccept' onClick={acceptNewCollection}>
            <p className='title'>Accept</p>
        </div>
    )
}




