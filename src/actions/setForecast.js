
// the forecast state SET action

export const setForecast = (input) => {
    return {
        type: "SET_FORECAST",
        payload: input
    }
}