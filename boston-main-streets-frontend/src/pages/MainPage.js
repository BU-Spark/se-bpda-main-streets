import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TopBar from "../components/TopBar";
import DashBoard from "../components/DashBoard";
import MainMap from "../features/MainMap";
import { experimental_extendTheme } from "@mui/material";
import Button from '@mui/material/Button';

const MainPage = () => {

    const [boo, setBoo] = useState(true)
    return (
        <div>
            <TopBar />
            <Container fluid>
                <Row>
                    {
                        boo == true
                        ?<Button variant="outline-primary" onClick={() => setBoo(!boo)}><i className="bi bi-arrow-bar-left"></i></Button>
                        :<Button variant="outline-primary" onClick={() => setBoo(!boo)}><i className="bi bi-arrow-bar-right"></i></Button>
                    }
                    <Col xs={12} sm={4} md={4} lg={boo == true?9:3}>
                        <MainMap />
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={boo == true?3:9}>
                        <DashBoard />
                    </Col>
                </Row>
            </Container>
        </div>
        
    )
}

export default MainPage