import { useEffect, useState } from 'react';
import NavBar from '../../components/Navigation/NavBar';
import './creator.scss';
import { fetchNui } from '../../utils/fetchNui';
import CollectionsOverview from './Collections/CollectionsOverview';
import PropertiesOverview from './Properties/PropertiesOverview';
import { ContextMenu } from './Context/contextMenu';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import IProperty from './Properties/IProperty';
import ICollection from './Collections/ICollection';

const Creator = () => {
    const [selectedPage, setSelectedPage] = useState<string>("collections");
    const [collections, setCollections] = useState<ICollection[]>(testCollections);
    const [properties, setProperties] = useState<IProperty[]>(testProperties);

    useEffect(() => {
        fetchNui('fetchCollections').then((data) => {
            setProperties(data);
        }).catch((err) => {
            
        });

        fetchNui('fetchProperties').then((data) => {
            setProperties(data);
        }).catch((err) => {
            
        });

    }, []);

    useNuiEvent<any>('setCollections', (data) => {
        setCollections(data.collections);
    });

    useNuiEvent<any>('setProperties', (data) => {
        setProperties(data.properties);
    });

    function handleNavItemPressed(page: string) {
        setSelectedPage(page);
    }

    return (
        <ContextMenu>
            <div className='creator'>
                <NavBar selectedPage = {selectedPage} navigationCallback = {handleNavItemPressed} />

                {/* Collections */}
                {selectedPage === "collections" && (
                    <CollectionsOverview collections = {collections}/>
                )}

                {/* Properties */}
                {selectedPage === "properties" && (
                    <PropertiesOverview properties = {properties}/>
                )}

            </div>
        </ContextMenu>
        
    )
}

export default Creator;

let testCollections: ICollection[] = [
    {
        identifier: 1,
        label: "First Edition",
        cardAmount: 10
    }
]



let testProperties: IProperty[] = [
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