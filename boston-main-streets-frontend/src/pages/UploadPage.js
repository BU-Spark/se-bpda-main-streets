import papaparse from "papaparse";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import dataService from "../services/dataService";
import LineGraph from "../components/LineGraph";
import { dataTypes, districts } from "../constants";
import { Dropdown } from "react-bootstrap";

const UploadPage = () => {

    // states
    const [file, setFile] = useState(null)
    const [jsonList, setJsonList] = useState(null)
    const [district, setDistrict] = useState("")
    const [dataType, setDataType] = useState("")

    // convert CSV file to a list of JSON objects
    const convert = () => {
        papaparse.parse(file, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (_, index) => {
                const header = (index === 0) ? 'date' : 'data'
                return header
            },
            complete: (result) => {
                const data = result.data.map((item) => (
                    {date: item.date, data: parseFloat(item.data)}
                ))
                setJsonList(data)
            }
        })
    }

    const handleUpload = async () => {
        if (!district || !dataType) {
            window.alert("Please select a main street and a data type")
        } else {
            await dataService.updateData(dataType, district, jsonList)
            window.alert(`${dataType} data for ${district} has been successfully updated`)
            setFile(null)
            setJsonList(null)
        }
    }

    return (
        <div>
            {/* dropdowns for district and data type */}
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="district-dropdown">
                    {(district === "") ? "Select a main street" : district}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {districts.map((district, index) => (
                        <Dropdown.Item key={index} onClick={() => setDistrict(district)}>{district}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="data-type-dropdown">
                    {(dataType === "") ? "Select a data type" : dataType}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {dataTypes.map((type, index) => (
                        <Dropdown.Item key={index} onClick={() => setDataType(type)}>{type}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            {/* upload the CSV file and convert it to a list of JSON objects */}
            <Form.Group>
                <Form.Label>Upload file</Form.Label>
                <Form.Control type="file" onChange={({target}) => setFile(target.files[0])} />
            </Form.Group>
            {file && (
                <Button variant="primary" onClick={() => convert()}>Convert</Button>
            )}
            {jsonList && (
                <Button variant="secondary" onClick={() => handleUpload()}>Upload</Button>
            )}
            {/* line graph test */}
            {jsonList && (
                <LineGraph data={jsonList} labelName={"date"} dataName={"data"} />
            )}
        </div>
    )
}

export default UploadPage