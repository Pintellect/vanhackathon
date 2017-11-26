import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import contentListReducer from "./content-list/reducer";
import currentContentReducer from "./content-detail/reducer";
import highlightReducer from "./annotator/reducer";

const rootReducer = combineReducers({
  contentList: contentListReducer,
  currentContent: currentContentReducer,
  highlights: highlightReducer,
  form: formReducer.plugin({
    annotation: (state, action) => {
      switch(action.type) {
        case "ANNOTATION_SAVE_SUCCESS":
          return undefined;
        default:
          return state;
      }
    }
  }),
})

export default rootReducer