import { useState } from "react";

interface EditorCardDetails {
    name: string;
    health: number;
    info: string;
    attack: string;
    damage: number;

}

export function CardDetails() {
    const [cardDetails, setCardDetails] = useState<EditorCardDetails>({name: "", health: 0, info: "", attack: "", damage: 0});

    function handleNameChange(name: string) {
        if (name.length > 17) return;
        setCardDetails({...cardDetails, name: name})
    }

    function handleHealthChange(health: number) {
        if (health > 9999) return;
        setCardDetails({...cardDetails, health: health})
    }

    function handleInfoChange(info: string) {
        if (info.length > 49) return;
        setCardDetails({...cardDetails, info: info})
    }

    function handleAttackChange(attack: string) {
        if (attack.length > 25) return;
        setCardDetails({...cardDetails, attack: attack})
    }

    function handleDamageChange(damage: number) {
        if (damage > 999) return;
        setCardDetails({...cardDetails, damage: damage})
    }


    return (
        <div className="card">

        </div>
    )
}