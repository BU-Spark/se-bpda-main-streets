import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, FormControl } from "react-bootstrap";
import CardItem from "../components/BusinessCardItem";
import BusinessForm from "./BusinessForm";
import { setMapBusiness } from "../reducers/mapBusinessReducer";
import Grid from '@mui/material/Grid'

const BusinessesBoard = () => {

    // states
    const [modificationMode, setModificationMode] = useState(false)
    const [oneBusiness, setOneBusiness] = useState(null)
    const [keyWord, setKeyWord] = useState('')
    const [containerSize, setContainerSize] = useState(3)
    
    

    // redux states: business, user
    
    const user = useSelector(({ user }) => user)
    const isExpanded = useSelector(state => state.windowSize)
    const dispatch = useDispatch()

    const businessData = useSelector(({ business }) => business).filter((business) => {
        const val = business.business_name.toLowerCase().includes(keyWord.toLowerCase());
        return val;
    })

    let businessStuff = useSelector(({ business }) => business);

    const [displayBusiness, setDisplayBusiness] = useState(businessData.reverse().slice(0, 20));

    // update display business when neighborhood is changed
    useEffect(() => {
        setDisplayBusiness(businessData.slice(0, 20));
    }
    ,[businessStuff]);

    

    // handle view, update and back
    const handleView = (business) => {
        dispatch(setMapBusiness(business))
        
    }
    const handleUpdate = (business) => {
        setOneBusiness(business)
        setModificationMode(true)
    }
    const handleBack = () => {
        setOneBusiness(null)
        setModificationMode(false)
    }
    
    

    // update the number of business cards in a single column depending on window size
    useEffect(() => {
        
        if (isExpanded === true) {
            setContainerSize(6)
        }
        else {
            setContainerSize(3)
        }
        
    }, [isExpanded])

    // update displayBusiness when business data is updated
    
    if (modificationMode) {
        return (
            <Row>
                <BusinessForm business={oneBusiness} />
                <Button variant="link" onClick={() => handleBack()}>Back</Button>
            </Row>
        )
    }

    const setBusinessUpperCase = (business_name) => {
        const words = business_name.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        return words.join(" ");
    }

    return (
        <>
            <FormControl type="search" onChange={({ target }) => {
                setKeyWord(target.value)
                setDisplayBusiness(displayBusiness.reverse().filter((business) => (
                    business.business_name.toLowerCase().includes(target.value.toLowerCase())
                )).reverse().slice(0, 20))
            }} placeholder="Search" value={keyWord} />
            <div>

                <Grid container spacing={1} style={{ flexGrow: '1', overflowY: 'scroll', overflowX: 'hidden', maxHeight: '70vh' }} sx={{ mt: 0.5 }}>

                    {displayBusiness.map((business, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={containerSize}>
                            <CardItem key={index} title={<Button variant="link" onClick={() => handleView(business)}> {setBusinessUpperCase(business.business_name)} </Button>} text={business.street_address} description={business.NAICS_2017_6digit_desc}>
                                <Row>
                                    <Col>
                                        {
                                            user
                                                ? <Button variant="link" onClick={() => handleUpdate(business)}>Update</Button>
                                                : <></>
                                        }
                                    </Col>
                                </Row>
                            </CardItem>
                        </Grid>
                    ))}

                </Grid>
                <Button variant="link"
                    onClick={() => {
                        // concat 20 from business data to displayBusiness
                        setDisplayBusiness(displayBusiness.concat(businessData.slice(displayBusiness.length, displayBusiness.length + 20)));
                    }}
                    style={{
                        marginLeft: 'auto',
                    }}
                >Load More
                </Button>
            </div>
        </>
    )
}

export default BusinessesBoard