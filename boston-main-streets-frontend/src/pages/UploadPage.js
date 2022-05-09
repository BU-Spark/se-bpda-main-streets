import papaparse from "papaparse";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import spendingService from "../services/spendingService";
import LineGraph from "../components/LineGraph";
import { districts } from "../constants";

const UploadPage = () => {

    // states
    const [file, setFile] = useState(null)
    const [jsonList, setJsonList] = useState(null)
    const [district, setDistrict] = useState("")

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
        await spendingService.updateSpending('Allston-Village', jsonList)
    }

    return (
        <div>
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