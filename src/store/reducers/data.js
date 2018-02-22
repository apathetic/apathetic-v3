// import { SET, RESET } from 'types/user'

const initialState = {
  demos: [
    'http://apathetic.github.io/showcase/',
    'smash your friends',
    'modular synth',
    'malformed.ca'
  ],
  repos: {
    "scrollify": "https://github.com/apathetic/scrollify",
    "modular synth": "https://github.com/apathetic/modular-synth",
    "carousel": "https://github.com/apathetic/flexicarousel",
    "boilerplate": "https://",
    "this here site.": "https://github.com/apathetic/stickynav"
  },
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
    case 'RESET':
      
      


    default:
      return state
  }
}

