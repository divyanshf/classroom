import React from 'react'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MdExitToApp } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import {Link} from 'react-router-dom'
// MdExitToApp

const Class_Card = (props) => {

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Unenroll
        </Tooltip>
    );

    const renderUnenroll = () => {
        return (
            <Card.Footer style={{textAlign:'center'}}>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                            >
                                <MdExitToApp onClick={() => {props.unenroll(props.id)}} className="exit"/>
                            </OverlayTrigger>
                        </Card.Footer>
        );
    }


    return (
        <div className="p-4 center">
            <Card style={{ width: '18rem', color: "black" }} className="card1">    
                        <Card.Img variant="top" src="images/book1.jpg" alt="image" />
                        <Link to={{
                            pathname: `/class/${props.id}/stream`,
                            state: {
                                details: {
                                    id:props.id,
                                    ClassCode: props.ClassCode,
                                    admin: props.admin,
                                    classname: props.classname,
                                    link:props.link
                                }}
                            }} 
                            className="nav-link"
                            style={{color: "black"}}
                        >
                        <Card.Body style={{textAlign:"left"}}>
                            <Card.Title className="card_title">
                                {props.classname}
                            </Card.Title>
                            <Card.Text>
                                {props.code} <br/>
                                {props.admin}
                            </Card.Text>
                        </Card.Body>
                </Link>
                        {props.user.role === 'Student' ? renderUnenroll() : null}
                </Card>
        </div>
    )
}

export default Class_Card
