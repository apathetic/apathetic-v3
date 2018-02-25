// import { SET, RESET } from 'types/user'

const initialState = {
  scrollify: "https://www.npmjs.com/package/@apatheticwes/scrollify",
  carousel: "https://www.npmjs.com/package/@apatheticwes/flexicarousel",
  stickynav: "https://www.npmjs.com/package/@apatheticwes/stickynav",
  panels: "https://www.npmjs.com/package/@apatheticwes/panels"
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SET':
      return {...state, ...action.payload}
    default:
      return state
  }
}

