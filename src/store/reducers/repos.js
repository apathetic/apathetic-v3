// import { SET, RESET } from 'types/user'

const initialState = {
  repos: {
    "scrollify": "https://github.com/apathetic/scrollify",
    "modular synth": "https://github.com/apathetic/modular-synth",
    "carousel": "https://github.com/apathetic/flexicarousel",
    "boilerplate": "https://",
    "this here site.": "https://github.com/apathetic/stickynav"
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

