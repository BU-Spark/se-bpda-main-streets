import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { employmendData } from '../data/employment'
import { Bar, Radar } from 'react-chartjs-2';

export default function Demographics() {

    const districtName = useSelector(({ district }) => district)
    // loop through employment data and find age category
    console.log(districtName);
    const[ageLabels, setAgeLabels] = useState([]);
    const[ageData, setAgeData] = useState([]);

    const[ethnicityLabels, setEthnicityLabels] = useState([]);
    const[ethnicityData, setEthnicityData] = useState([]);

    const[raceLabels, setRaceLabels] = useState([]);
    const[raceData, setRaceData] = useState([]);

    const[educationLabels, setEducationLabels] = useState([]);
    const[educationData, setEducationData] = useState([]);

    const[totalJobs, setTotalJobs] = useState(null);

    useEffect(() => {
        let tempAgeLabels = [];
    let tempAgeData = [];

    let tempEthnicityLabels = [];
    let tempEthnicityData = [];

    let tempRaceLabels = [];
    let tempRaceData = [];

    let tempEducationLabels = [];
    let tempEducationData = [];

    let totalJobsTemp;

    for (let i=0; i < employmendData.length; i++) {
        let districtData = employmendData[i]
        // find districtName key in districtData

        if (districtData.Category === 'Age') {
            tempAgeLabels.push(districtData.Label);
            tempAgeData.push(districtData[districtName] * 100);
        }

        if (districtData.Category === 'Ethnicity') {
            tempEthnicityLabels.push(districtData.Label);
            tempEthnicityData.push(districtData[districtName] * 100);
        }

        if (districtData.Category === 'Race') {
            tempRaceLabels.push(districtData.Label);
            tempRaceData.push(districtData[districtName] * 100);
        }

        if (districtData.Category === 'Education') {
            tempEducationLabels.push(districtData.Label);
            tempEducationData.push(districtData[districtName] * 100);
        }

        if (districtData.Category === 'Jobs') {
            totalJobsTemp = districtData[districtName];
        }
        
    }

    setAgeLabels(tempAgeLabels);
    setAgeData(tempAgeData);
    setEducationData(tempEducationData);
    setEducationLabels(tempEducationLabels);
    setEthnicityData(tempEthnicityData);
    setEthnicityLabels(tempEthnicityLabels);
    setRaceData(tempRaceData);
    setRaceLabels(tempRaceLabels);
    setTotalJobs(totalJobsTemp);

    }, [districtName])


    return (
        <div style={{overflowY: 'scroll', height: '90vh'}}>
            <div>Total Jobs: { totalJobs }</div>
           
            <Bar data={{
                // get top 5 industries

                labels: ageLabels,
                datasets: [{
                    label: 'Age',
                    data: ageData,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',

                    ]
                }],
            }} />
            <Bar 
            
            data={{
                // get top 5 industries

                labels: ethnicityLabels,
                datasets: [{
                    label: 'Ethnicity',
                    data: ethnicityData,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF6384',
                        '#36A2EB',
                    ]
                    
                }],
            }} />
            <Bar data={{
                // get top 5 industries

                labels: raceLabels,
                datasets: [{
                    label: 'Race',
                    data: raceData,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                    ]
                }],
            }} />
            <Bar data={{
                // get top 5 industries

                labels: educationLabels,
                datasets: [{
                    label: 'Education',
                    data: educationData,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                    ]
                    
                }],
            }} />
        </div>


    )
}
