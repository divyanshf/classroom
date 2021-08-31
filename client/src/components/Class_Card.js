import React from 'react'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MdExitToApp } from "react-icons/md";
import { NavLink } from 'react-router-dom';
// MdExitToApp

const Class_Card = (props) => {

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Unenroll
        </Tooltip>
    );


    return (
        <div className="p-4 center">
            <Link to={{
                pathname: `/class/${props.id}/stream`,
                state: {details:props}
            }} className="nav-link">
                <Card style={{ width: '18rem', color:"black"}} className="card1">
                        <Card.Img variant="top" src="images/book1.jpg" alt="image" />
                        <Card.Body style={{textAlign:"left"}}>
                            <Card.Title className="card_title">
                                {props.id}
                            </Card.Title>
                            <Card.Text>
                                {props.code} <br/>
                                {props.admin}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer style={{textAlign:'center'}}>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <MdExitToApp className="exit"/>
                            </OverlayTrigger>
                        </Card.Footer>
                </Card>
            </Link>
        </div>
    )
}

export default Class_Card
