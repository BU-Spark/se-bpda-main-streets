import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { nameRule } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { changeDistrict } from "../reducers/districtReducer";
import { getSpendingData, getMobilityData } from "../reducers/boardDataReducer";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'


const DistrictList = () => {

    // redux states
    const districtName = useSelector(({ district }) => district)
    const bostonDistricts = useSelector(({ mapDistricts }) => mapDistricts)

    // redux and router hooks
    const dispatch = useDispatch()
    const history = useHistory()
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    // wait for loading
    if (!districtName || !bostonDistricts) {
        return (
            <div>loading...</div>
        )
    }

    // get boston districts data
    const bostonDistrictsName = bostonDistricts.features.map((district) => (district.properties.DIST_NAME.replace(nameRule, "-")))

    // list white background
    const listStyle = {
        "background": "white"
    }

    // handle list selection
    const handleChange = (name) => {
        // if name === districtname set null
        
        setSelectedDistrict(name)
        dispatch(changeDistrict(name))
        dispatch(getSpendingData(name))
        dispatch(getMobilityData(name))
    }

    return (
        <Form>
            <Box sx={{ bgcolor: 'white', width: '50vh' }}>
                <h2 style={{ padding : 12, fontSize : 18 }}>Main Street Neighborhoods
                </h2>
                <Grid container spacing={1} style={{ flexGrow: '1', overflow: 'auto', maxHeight: '20vh', marginLeft: '3px', paddingRight: '2px'}}>
                    {bostonDistrictsName.map((name, index) => {
                            return (
                                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                    <Form.Check
                                        label={name === "Dudley-Square" ? "Roxbury" : name.replace('-', ' ')} name="list" type="radio" checked={name === districtName}
                                        id={`inline-list-${index}`} onChange={() => handleChange(name)}
                                    />
                                </Grid>
                            )
                        
                    })}
                </Grid>
            </Box>
        </Form>
    )
}

export default DistrictList