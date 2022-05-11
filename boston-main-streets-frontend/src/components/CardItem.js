import React from "react";
import { Card } from "react-bootstrap";

const CardItem = (props) => {

    return (
        <Card style={{minHeight: '80px', height: '100%'}}>
            <Card.Body>
                <Card.Text style={{fontSize: 16.5, color: '#6A6E73'}}>{props.title}</Card.Text>
                <h4 style={{fontSize: 28}}>{props.text}</h4>
            </Card.Body>
            {props.children}
        </Card>
    )
}

export default CardItem