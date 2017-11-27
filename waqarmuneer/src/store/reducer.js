import * as actionTypes from './actions';

const initialState = {
    annotations: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_ANNOTATION:
            const newAnnotation = {
                id: Math.random(), 
                quote: action.annotationData.quote,
                text: action.annotationData.text
            }
            return {
                ...state,
                annotations: state.annotations.concat( newAnnotation )
            }        
    }
    return state;
};

export default reducer;