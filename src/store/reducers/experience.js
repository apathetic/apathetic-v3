const initialState = {
  "Front-end": "CSS3, Javascript, ES6, Vue/Vuex, ThreeJS",
  "Back-end": "Node, php, python, Express/Koa, nginx",
  "CMS": "Drupal, Wordpress, Sitecore, Contentful, Brightspot, Symfony, Keystone",
  "Design": "Photoshop, Sketch",
  "Miscellany": "Firebase, bash, git"
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SET':
      return {...state, ...action.payload}
    default:
      return state
  }
}

