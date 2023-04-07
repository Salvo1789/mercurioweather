const initialState = {
    coordinates: []
  };
  
  const mainReducer = (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_COORDINATES":
        return {
          ...state,
          coordinates: action.payload
        };
      default:
        return state;
    }
  };
  
  export default mainReducer;