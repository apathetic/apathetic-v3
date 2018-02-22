// import { SET, RESET } from 'types/user'

const initialState = {
  npm: {
    "scrollify": "https://www.npmjs.com/package/@apatheticwes/scrollify",
    "carousel": "https://www.npmjs.com/package/@apatheticwes/flexicarousel",
    "stickynav": "https://www.npmjs.com/package/@hugeinc/stickynav",
    "panels": "https://www.npmjs.com/package/@hugeinc/panels"
  }
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SET':
      return {...state, ...action.payload}
    default:
      return state
  }
}

