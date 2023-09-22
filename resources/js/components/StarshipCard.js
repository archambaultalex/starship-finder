import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function StarshipCard(props) {
    return (
        <div className="starship-container">
            <div className="full-width">
                <h3 style={{fontWeight: "bold"}}>{props.name}</h3>
                <p>{props.shipClass}</p>
                <p>{props.maker}</p>
            </div>

            <div className="full-width">
                <p>{props.crew} crew, {props.passengers} passengers</p>
                <p>Cargo capacity: {props.cargo}</p>
            </div>

            <div className="full-width">
                <h4 style={{ textAlign: "right" }}>{props.cost} cr</h4>
            </div>
        </div>
    );
}

export default StarshipCard;

