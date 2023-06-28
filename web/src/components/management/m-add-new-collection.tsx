import React, {useState} from 'react';
import { fetchNui } from "../../utils/fetchNui";

function NewCollectionInput(props: {allCollectionNames?: string}) {
    const [value, setValue] = useState<string>("")
    const [currentError, setCurrentError] = useState<string>("")

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
        newCollectionName = e.target.value;

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
            <p className='response'>{currentResponse}</p>
        </div>
    )
}

export function AddNewCollection(props: {allCollectionsNames: string[]}) {
    const [currentResponse, setCurrentResponse] = useState<string>("")
    

    return (
        <div className='addNewCollection'>
            <NewCollectionInput />
            <NewCollectionAccept />
        </div>
    );
}




function NewCollectionAccept(props: {allCollectionNames?: string}) {

    function acceptNewCollection() {
        if (props.allCollectionNames != undefined) {
            if (props.allCollectionNames.includes(newCollectionName)) return;
        };

        fetchNui<string>('createNewCollection', {
            name: newCollectionName
        }).then((response) => {
            setCurrentResponse(response);
            
        })
    }

    return (
        <div className='newCollectionAccept' onClick={acceptNewCollection}>
            <p className='title'>Accept</p>
        </div>
    )
}




