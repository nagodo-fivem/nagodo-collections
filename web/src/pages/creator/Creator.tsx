import { useEffect, useState } from 'react';
import NavBar from '../../components/Navigation/NavBar';
import './creator.scss';
import { fetchNui } from '../../utils/fetchNui';
import CollectionsOverview from './CollectionsOverview';
import PropertiesOverview from './Properties/PropertiesOverview';
import IProperty from './Properties/IProperty';
import { ContextMenu } from './Context/contextMenu';

const Creator = () => {
    const [selectedPage, setSelectedPage] = useState<string>("collections");
    const [collections, setCollections] = useState<Collection[]>(testCollections);
    const [properties, setProperties] = useState<IProperty[]>(testProperty);

    useEffect(() => {
        // fetchNui('getCollections').then((data) => {
        //     setCollections(data);
        // });

    }, []);

    function handleNavItemPressed(page: string) {
        setSelectedPage(page);
    }

    return (
        <ContextMenu>
            <div className='creator'>
                <NavBar selectedPage = {selectedPage} navigationCallback = {handleNavItemPressed} />

                {/* Collections */}
                {selectedPage === "collections" && (
                    <CollectionsOverview/>
                )}

                {/* Properties */}
                {selectedPage === "properties" && (
                    <PropertiesOverview properties = {testProperty}/>
                )}

            </div>
        </ContextMenu>
        
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



let testProperty: IProperty[] = [
    {
        identifier: 1,
        type: "frame",
        label: "Normal",
        image: "Frames/normal.png"
    },
    {
        identifier: 2,
        type: "frame",
        label: "Gold",
        image: "Frames/gold.png"
    },
    {
        identifier: 3,
        type: "frame",
        label: "Shiny",
        image: "Frames/shiny.png"
    },
    {
        identifier: 4,
        type: "frame",
        label: "Black",
        image: "Frames/black.png"
    },
    {
        identifier: 5,
        type: "element",
        label: "Fire",
        image: "Elements/FireElement.png"
    },
    {
        identifier: 6,
        type: "element",
        label: "Water",
        image: "Elements/WaterElement.png"
    },
    {
        identifier: 7,
        type: "element",
        label: "Ground",
        image: "Elements/GroundElement.png"
    },
    {
        identifier: 8,
        type: "element",
        label: "Grass",
        image: "Elements/GrassElement.png"
    },
    {
        identifier: 9,
        type: "back",
        label: "Normal",
        image: "Backs/backOfCard01.png"
    },
    {
        identifier: 10,
        type: "image-overlay",
        label: "Holo",
        image: "Overlays/Holo.png"
    }
]