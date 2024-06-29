import "./StickerPlacement.scss";

const StickerPlacement = () => {
    return (
        <div className="stickerplacement">
            <div className="currentstickers">
                <NewSticker />
                <Sticker />
                <Sticker />
                <Sticker />
            </div>
        </div>
    )
}

function NewSticker() {
    return (
        <div className="sticker">
            
        </div>
    )
}

function Sticker() {
    return (
        <div className="sticker">
            
        </div>
    )
}

export default StickerPlacement;