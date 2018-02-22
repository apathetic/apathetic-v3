// import { SET, RESET } from 'types/user'

const initialState = {
  demos: [
    'http://apathetic.github.io/showcase/',
    'smash your friends',
    'modular synth',
    'malformed.ca'
  ]
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SET':
      return {...state, ...action.payload}
    default:
      return state
  }
}

