import dataService from "../services/dataService";

const boardDataReducer = (state = {"spending": null, "mobility": null}, action) => {
    switch (action.type) {
        case ("GET_SPENDING_DATA"):
            return {"spending": action.data.spending, "mobility": state.mobility}
        case ("GET_MOBILITY_DATA"):
            return {"spending": state.spending, "mobility": action.data.mobility}
        default:
            return state
    }
}

export const getSpendingData = (districtName) => {
    return async (dispatch) => {
       
        let data;
        try {
            data = await dataService.getData("spending", districtName)
        } catch (error) {
            console.log(error);
        }
        
        dispatch({
            type: "GET_SPENDING_DATA",
            data: {
                spending: data
            }
        })
    }
}

export const getMobilityData = (districtName) => {
    return async (dispatch) => {
        let data;
        try {
            data = await dataService.getData("mobility", districtName)
        } catch (error) {
            console.log(error);
        }
        dispatch({
            type: "GET_MOBILITY_DATA",
            data: {
                mobility: data
            }
        })
    }
}

export default boardDataReducer