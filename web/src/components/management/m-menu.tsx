import React, {useState} from 'react';
import '../../css/management.css';
import { Navigation } from "./m-navigation";
import { AllCollections } from "./m-collection-list";


export function ManagementMenu() {
    const [currentPage, setCurrentPage] = useState<string>("collections")

    function Content() {
        
        if (currentPage === "collections") return (
            <div className="content">
                <div className='border'></div>
                <AllCollections />
            </div>
        )

        return null;
    }

    return (
        <div className="adminmenu">
            <Navigation setCurrentPage = {setCurrentPage} />
            <Content />
        </div>
    );
}