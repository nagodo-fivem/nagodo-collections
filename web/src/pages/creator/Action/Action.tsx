import "./action.scss";

interface ActionProps {
    label: string;
    onClick: () => void;
}

const Action = ({label, onClick}: ActionProps) => {

    return (
        <div className="action button" onClick={onClick}>
            <div className="label">
                {label}
            </div>
        </div>
    )
}

export default Action;