// import { SET, RESET } from 'types/user'

const initialState = {
  "scrollify": "https://github.com/apathetic/scrollify",
  "modular synth": "https://github.com/apathetic/modular-synth",
  // "carousel": "https://github.com/apathetic/flexicarousel",
  "boilerplate": "https://github.com/apathetic/boilerplate-react",
  "this here site": "https://github.com/apathetic/apathetic-v2"
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SET':
      return {...state, ...action.payload}
    default:
      return state
  }
}

