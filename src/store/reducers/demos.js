const initialState = {
  "component showcase": "http://apathetic.github.io/showcase/",
  // "smash your friends": "",
  // "modular synth": "http://dist-axkszcvddu.now.sh",
  "modular synth": "http://malformed.ca"
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SET':
      return {...state, ...action.payload}
    default:
      return state
  }
}

