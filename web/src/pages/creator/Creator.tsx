import { useEffect, useState } from 'react';
import NavBar from '../../components/Navigation/NavBar';
import './creator.scss';
import { fetchNui } from '../../utils/fetchNui';
import CollectionsOverview from './CollectionsOverview';

const Creator = () => {
    const [selectedPage, setSelectedPage] = useState<string>("collections");
    const [collections, setCollections] = useState<Collection[]>(testCollections);

    useEffect(() => {
        // fetchNui('getCollections').then((data) => {
        //     setCollections(data);
        // });

    }, []);

    function handleNavItemPressed(page: string) {
        setSelectedPage(page);
    }

    return (
        <div className='creator'>
            <NavBar selectedPage = {selectedPage} navigationCallback = {handleNavItemPressed} />

            {/* Collections */}
            {selectedPage === "collections" && (
                <CollectionsOverview/>
            )}
        </div>
    )
}

export default Creator;

interface Collection {
    label: string;
}

let testCollections: Collection[] = [
    {
        label: "First Edition"
    }
]