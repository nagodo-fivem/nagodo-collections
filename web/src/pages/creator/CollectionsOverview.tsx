const CollectionsOverview = () => {
    return (
        <div className="collections">

            <div className="overview">

                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                <CollectionElement/>
                
            </div>
            
            <div className="actions">
                <Action type = {"button"} label = "New Collection"/>
                <Action type = {"button"} label = "New Collection"/>
            </div>

        </div>
    )
}

const CollectionElement = () => {
    return (
        <div className="element">

        </div>
    )
}

interface ActionProps {
    type: "button" | "input";
    label: string;
}

const Action = ({type, label}: ActionProps) => {

    if (type === "input") {
        return (
            <div className="action">
    
            </div>
        )
    }

    //Button
    return (
        <div className="action button" >
            <div className="label">
                {label}
            </div>
        </div>
    )
}

export default CollectionsOverview;