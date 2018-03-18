import { combineReducers } from 'redux'

import experience from "./experience";
import sites from "./sites";
import demos from "./demos";
import repos from "./repos";
import logos from "./logos";
import npm from "./npm";

export default combineReducers({
  experience,
  sites,
  demos,
  repos,
  logos,
  npm
});

