import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultDistrict } from "../reducers/districtReducer";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, ButtonGroup } from "react-bootstrap";
import EmploymentBoard from "../features/EmploymentBoard";
import BusinessBoard from "../features/BusinessBoard";
import { removeMapBusiness } from "../reducers/mapBusinessReducer";
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { expand, collapse } from "../services/windowService"




const DashBoard = () => {

    const [tab, setTab] = useState("Employment Data")
    const [expandButton, setExpandButton] = useState("bi bi-arrow-bar-left")

    // redux states
    const districtName = useSelector(({ district }) => district)
    const dispatch = useDispatch()

    // react router
    const history = useHistory()



    // go back to boston page
    const handleBack = () => {
        dispatch(defaultDistrict())
        dispatch(removeMapBusiness())
    }

    // change state of window size and button style
    const handleWindowSize = () => {
        dispatch(expand())
        if (expandButton === "bi bi-arrow-bar-left") setExpandButton("bi bi-arrow-bar-right")
        else setExpandButton("bi bi-arrow-bar-left")
    }

    const buttonStyle = {
        backgroundImage: "url(" + "https://patronicity.s3.amazonaws.com/static/SponsorLogos/BMS_Icon_NoTag_RGB.JPG" + ")"
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const tabStyle = {
        textTransform: 'capitalize',
        color: 'black'
    }

    return (
        <Container fluid style={{ "height": "100vh" }}>
            <>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Button variant="outline-primary" onClick={() => handleWindowSize()}><i className={expandButton}></i></Button>
                    <Tab value="Employment Data" label="Employment Data" style={tabStyle} />
                    <Tab value="Life & Culture" label="Life & Culture" style={tabStyle} />
                    <Tab value="Businesses" label="Businesses" style={tabStyle} />
                </Tabs>
            </>
            <Row>
                <h1>
                    {districtName.replace('-', ' ').toUpperCase()}
                    <Button variant="text" size="small" onClick={() => handleBack()}>
                        <img src="https://patronicity.s3.amazonaws.com/static/SponsorLogos/BMS_Icon_NoTag_RGB.JPG" width="30" alt="folder" />
                    </Button>
                </h1>
            </Row>

            {tab === "Employment Data" && <EmploymentBoard />}
            {tab === "Businesses" && <BusinessBoard />}
        </Container>
    )
}

export default DashBoard