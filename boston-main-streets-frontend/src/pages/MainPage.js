import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TopBar from "../components/TopBar";
import DashBoard from "../components/DashBoard";
import MainMap from "../features/MainMap";
import { useSelector } from "react-redux";

const MainPage = () => {

    // current redux state on whether the window is collapsed or expanded
    const isExpanded = useSelector(state => state.windowSize);
    const smallSize = 8;
    const largeSize = 4;

    return (
        <div>
            <TopBar />
            <Container fluid>
                <Row>
                    <Col xs={isExpanded === true ? smallSize : largeSize}>
                        <MainMap />
                    </Col>
                    <Col xs={isExpanded === true ? largeSize : smallSize}>
                        <DashBoard />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainPage