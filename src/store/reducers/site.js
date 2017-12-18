// import { FETCH } from '..types/posts';
const INITIAL_STATE = {
  items: []
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        items: action.payload.data.items,
        status: 'success'
      };

    case 'FETCH_ERROR':
      console.log('error');
      return {
        ...state,
        status: 'error',
        // items: []
      };

    case 'FETCH_PENDING':
      return {
        status: 'fetching'
      }

    default:
      return state;
  }
}
