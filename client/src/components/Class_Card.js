import React from 'react'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MdExitToApp } from "react-icons/md";
// MdExitToApp

const Class_Card = () => {

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Uneroll
        </Tooltip>
    );


    return (
        <div className="p-4 center">
            <Card style={{ width: '18rem'}} className="card1">
                <Card.Img variant="top" src="images/book1.jpg" alt="image" />
                <Card.Body style={{textAlign:"left"}}>
                    <Card.Title className="card_title">
                        Class Name
                    </Card.Title>
                    <Card.Text>
                        Subject_Code <br/>
                        Professor Name
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
        </div>
    )
}

export default Class_Card
