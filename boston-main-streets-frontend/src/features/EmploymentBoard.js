import React from "react";
import { Row, Col, CardGroup, Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import CardItem from "../components/CardItem";
import Grid from '@mui/material/Grid'

const EmploymentBoard = () => {

    // calcuate summary
    const districtName = useSelector(({district}) => district)
    const businesses = useSelector(({business}) => business)
    const totalEmp = businesses.map((business) => business.estimated_employment).reduce((a, b) => a+b, 0) 
    const totalBusiness = businesses.length  
    const averageEmp = Math.floor(totalEmp / totalBusiness).toLocaleString('en-US');  
    const isExpanded = useSelector(state => state.windowSize)
    const topSmallSize = 6;
    const butSmallSize = 12;
    const largeSize = 4;


    const cardTitles = [
        { title: "Estimated Number of Employees:", text: totalEmp.toLocaleString('en-US') },
        { title: "Total Number of Businesses:", text: totalBusiness.toLocaleString('en-US') },
    ]
    const cardTitleEm = [
        { title: "Average Employment Size:", text: averageEmp + " Per Business" }
    ]

    if (businesses.length === 0) {
        return (
            <div>Loading...</div>
        )
    }



    const localStyle = {
        marginTop: '10px',
    };
    return (
        <>
        <Grid container spacing={1}>
            {cardTitles.map((card, index) => (
                            <Grid item xs={12} sm={6} md={6} lg={isExpanded == true ? topSmallSize : largeSize}>
                                <CardItem key={index} title={card.title} text={card.text} />
                            </Grid>
            ))}
            {cardTitleEm.map((card, index) => (
                            <Grid item xs={12} sm={12} md={12} lg={isExpanded == true ? butSmallSize : largeSize}>
                                <CardItem key={index} title={card.title} text={card.text} />
                            </Grid>
            ))}
            {(districtName !== "Boston") ? (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Employment</Accordion.Header>
                            <Accordion.Body>1010</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Mobility</Accordion.Header>
                            <Accordion.Body>1010</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Spending</Accordion.Header>
                            <Accordion.Body>1010</Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Grid>
            ) : <></>}
            </Grid>
        </>
    )
    }

export default EmploymentBoard