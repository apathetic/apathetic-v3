// NOTE: this kind of thing shouldn't really be in app state; it's
// here more just for funsises
const initialState = {
  logos: [
    "mcm",
    "walmart",
    "hp",
    "nyulangone",
    "nbc",
    "google"
  ]
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
