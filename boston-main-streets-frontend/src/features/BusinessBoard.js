import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, FormControl } from "react-bootstrap";
import CardItem from "../components/BusinessCardItem";
import BusinessForm from "./BusinessForm";
import { removeMapBusiness, setMapBusiness } from "../reducers/mapBusinessReducer";
import Grid from '@mui/material/Grid'

const BusinessesBoard = () => {

    // states
    const [modificationMode, setModificationMode] = useState(false)
    const [oneBusiness, setOneBusiness] = useState(null)
    const [keyWord, setKeyWord] = useState('')
    const [containerSize, setContainerSize] = useState(3)

    // redux states: business, user
    const businessData = useSelector(({ business }) => business).filter((business) => (
        business.business_name.toLowerCase().includes(keyWord.toLowerCase())
    ))
    const user = useSelector(({ user }) => user)
    const currentWindowSize = useSelector(state => state.windowSize)
    const dispatch = useDispatch()

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
        if (currentWindowSize === true) {
            setContainerSize(6)
        } 
        else {
            setContainerSize(3)
        }
    }, [currentWindowSize])


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
        <FormControl type="search" onChange={({target}) => setKeyWord(target.value)} placeholder="Search" value={keyWord} />
                <Grid container spacing={1} style={{ flexGrow: '1', overflowY: 'scroll', overflowX: 'hidden', maxHeight: '80vh'}} sx={{mt: 0.5}}>
                    {businessData.map((business, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={containerSize}>
                        <CardItem key={index} title={<Button variant="link" onClick={() => handleView(business)}> {setBusinessUpperCase(business.business_name)} </Button>} text={`Address: ${business.street_address}`}>
                            <Row>
                                <Col>
                                    <Button variant="link" onClick={() => handleView()}>Website</Button>
                                </Col>
                                <Col>
                                    {
                                        user
                                            ? <Button variant="link" onClick={() => handleUpdate(business)}>Update</Button>
                                            : <Button variant="link" onClick={() => handleUpdate(business)} disabled>Update</Button>
                                    }
                                </Col>
                            </Row>
                        </CardItem>
                    </Grid>
                ))}
        </Grid>
        </>
    )
}

export default BusinessesBoard