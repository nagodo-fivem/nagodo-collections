import { Card } from "../../card";

export function ManageCollection() {
   
    return (
        <div className='allCards'>
            <Card name = "John Olsen" health = {310} info = "Førtidspension. Højde: 150cm. Vægt: 170kg" attack = "Hvad glor du på?" damage = {120} cardNum = {13} size = {1}/>
        </div>
    );
    
}