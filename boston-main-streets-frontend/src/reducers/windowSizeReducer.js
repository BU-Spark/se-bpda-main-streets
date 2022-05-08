const windowSizeReducer = (state = true, action) => {
    switch (action.type) {
        case 'EXPAND':
            return !state
        case 'COLLAPSE':
            return !state
        default:
            return state
    }
}
export default windowSizeReducer;