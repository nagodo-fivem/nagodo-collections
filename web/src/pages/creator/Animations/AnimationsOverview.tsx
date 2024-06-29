import IAnimation from "./IAnimation";
import "./animations.scss";

interface AnimationsOverviewProps {
    animations: IAnimation[];
}

const AnimationsOverview = ({ animations }: AnimationsOverviewProps) => {
    return (
        <div className="animations">
            <div className="overview">

            </div>

            <div className="actions">

            </div>

        </div>
    )
}

export default AnimationsOverview;