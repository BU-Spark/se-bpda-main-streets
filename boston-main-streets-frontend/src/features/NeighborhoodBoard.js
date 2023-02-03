import React from 'react'
import { useSelector } from "react-redux";
import { neighborhoods, neighborhoodsList } from '../data/data';

export default function NeighborhoodBoard() {

  const districtName = useSelector(({ district }) => district);
  console.log(districtName);

  return (
    <div>
        { neighborhoodsList.map((neighborhood) => {
            if (neighborhood.Code === districtName) {
              console.log(neighborhood);
                return (
                  <div style={{fontSize: 12, lineHeight: 1.2, overflowY: true}}>
                    <div dangerouslySetInnerHTML={{__html: neighborhood.Text}}>
                    </div>
                  </div>
                )
            }
        }
        )}
    </div>
  )
}
