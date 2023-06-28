import React, {useState} from 'react';
import { Card } from "../card";
import '../../css/openpack.css';




export function OpenPackMenu(props: {amount: number}) {
    let cardsOpened = 0;
    

    return (
        <div className="cards-container">
            <Card size={1} />
            <Card size={1} />
            <Card size={1} />
            <Card size={1} />
            <Card size={1} />
            <Card size={1} />
            <Card size={1} />
            <Card size={1} />
            <Card size={1} />
            <Card size={1} />
        </div>
    );
}