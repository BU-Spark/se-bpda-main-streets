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
import logo from '../static/logo.png';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from '@mui/material/Grid'





const DashBoard = () => {

    const [tab, setTab] = useState("Employment Data")
    const [expandButton, setExpandButton] = useState("bi bi-arrow-bar-left")

    // redux states
    const districtName = useSelector(({ district }) => district)
    const dispatch = useDispatch()
    const isExpanded = useSelector(state => state.windowSize)

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

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    // open external window on main street page
    const handleClick = () => {
        window.open("https://bostonmainstreets.org/");
    };

    const tabStyle = {
        textTransform: 'capitalize',
        color: 'black',
        
    }

    const districtNameStyle = isExpanded === true ? { fontSize: 36, marginTop: '10px' } : { fontSize: 72, marginTop: '10px' }
    const logoStyle = isExpanded === true ? '30px' : '60px'

    return (
        <Box style={{ "height": "100vh" }}>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <Button variant="outline-primary" onClick={() => handleWindowSize()}><i className={expandButton}></i></Button>
                </Grid>
                <Tabs
                    style={{ backgroundColor: "#f9f9f9"}}
                    value={tab}
                    onChange={handleChange}
                    TabIndicatorProps={{ style: { backgroundColor: "0066CC" } }}
                    variant='scrollable'
                >
                    <Tab value="Employment Data" label="Economic Activity" style={tabStyle} />
                    <Tab value="Neighborhood" label="Neighborhood" style={tabStyle} />
                    <Tab value="Businesses" label="Businesses" style={tabStyle} />
                </Tabs>
            </Grid>
            <div>
                <h1 style={districtNameStyle}>
                    {districtName.replace('-', ' ').toUpperCase()}
                    {/* {districtName === 'Boston' ? <Button variant="text" size="small" onClick={() => handleClick()}>
                        <img src={logo} width={logoStyle} alt="logo" style={{marginBottom: '8px', marginLeft: '3px'}} />
                    </Button> : <></>} */}
                </h1>
            </div>


            {tab === "Employment Data" && <EmploymentBoard />}
            {tab === "Businesses" && <BusinessBoard />}
        </Box>
    )
}

export default DashBoard