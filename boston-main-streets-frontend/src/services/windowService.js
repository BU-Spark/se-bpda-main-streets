export const expand = (state) => {
    return {
        type: 'EXPAND',
        payload: state
    }
}

export const collapse = (state) => {
    return {
        type: 'COLLAPSE',
        payload: state
    }
}