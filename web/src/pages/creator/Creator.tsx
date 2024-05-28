import { useEffect, useState } from 'react';
import NavBar from '../../components/Navigation/NavBar';
import './creator.scss';
import { fetchNui } from '../../utils/fetchNui';
import CollectionsOverview from './CollectionsOverview';
import PropertiesOverview from './PropertiesOverview';
import IProperty from './IProperty';

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
        image: "Frames/normal"
    },
    {
        identifier: 2,
        type: "frame",
        label: "Gold",
        image: "Frames/gold"
    },
    {
        identifier: 3,
        type: "frame",
        label: "Shiny",
        image: "Frames/shiny"
    },
    {
        identifier: 4,
        type: "frame",
        label: "Black",
        image: "Frames/black"
    },
    {
        identifier: 5,
        type: "element",
        label: "Fire",
        image: "Elements/FireElement"
    },
    {
        identifier: 6,
        type: "element",
        label: "Water",
        image: "Elements/WaterElement"
    },
    {
        identifier: 7,
        type: "element",
        label: "Ground",
        image: "Elements/GroundElement"
    },
    {
        identifier: 8,
        type: "element",
        label: "Grass",
        image: "Elements/GrassElement"
    },
    {
        identifier: 9,
        type: "back",
        label: "Normal",
        image: "Backs/backOfCard01"
    },
    {
        identifier: 10,
        type: "image-overlay",
        label: "Holo",
        image: "Overlays/Holo"
    }
]