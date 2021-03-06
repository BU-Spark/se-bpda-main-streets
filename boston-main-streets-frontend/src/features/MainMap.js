import React from "react";
import { useSelector } from "react-redux";
import MapItem from "../components/MapItem";
import { GeoJSON, Marker } from "react-leaflet";
import { bostonCenter, nameRule } from "../constants";

const MainMap = () => {

    // redux states
    const districtName = useSelector(({ district }) => district)
    const bostonBoundary = useSelector(({ mapBoundary }) => mapBoundary)
    const bostonDistricts = useSelector(({ mapDistricts }) => mapDistricts)
    const mapBusiness = useSelector(({ mapBusiness }) => mapBusiness)

    

    // filter district
    const districtData = (districtName === "Boston")
        ? bostonDistricts
        : {
            ...bostonDistricts,
            features: bostonDistricts.features.filter((district) => (
                district.properties.DIST_NAME.replace(nameRule, "-") === districtName
            ))
        }
        
    let midValX;
    let midValY;
    if (districtName !== "Boston") {
        let mid = districtData.features[0].geometry.coordinates[0].length / 2;
        mid = Math.floor(mid);
        midValX = (districtData.features[0].geometry.coordinates[0][mid][1] + districtData.features[0].geometry.coordinates[0][0][1]) / 2;
        midValY = (districtData.features[0].geometry.coordinates[0][mid][0] + districtData.features[0].geometry.coordinates[0][0][0]) / 2;
    }
    const center = (districtName === "Boston")
        ? bostonCenter
        : [midValX, midValY];


    
    console.log("boston center", bostonCenter);
    console.log("district data",districtData);
    const zoom = (districtName === "Boston") ? 11 : 15

    // local color
    const localStyle = {
        "color": "#CC0062"
    }

    if (!bostonBoundary || !bostonDistricts) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <MapItem key={districtName} center={center} zoom={zoom}>
            <GeoJSON data={bostonBoundary} style={{ color : "#B2BED3", fillOpacity : 0.1, fill : "#3388ff" }}/> 
            <GeoJSON key={districtName} data={districtData} style={localStyle} />
            {mapBusiness && (
                <Marker position={[mapBusiness.latitude, mapBusiness.longitude]} />
            )}
        </MapItem>
    )
}

export default MainMap