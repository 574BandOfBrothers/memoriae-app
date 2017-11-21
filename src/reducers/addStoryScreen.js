import { Map, fromJS } from 'immutable';

const initialState = Map({
  isSaveInProgress: false,
  isSaveComplete: false,
  saveError: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'STORIES/CREATE_REQUEST':
      return state
        .set('isSaveInProgress', true)
        .set('isSaveComplete', false)
        .set('isSaveError', null)

   case 'STORIES/ADD':
      return state
        .set('isSaveInProgress', false)
        .set('isSaveComplete', true)
        .set('isSaveError', null)

    case 'STORIES/CREATE_REQUEST_FAIL':
      return state
        .set('isSaveInProgress', false)
        .set('isSaveComplete', false)
        .set('isSaveError', action.error)

    case 'ADD_STORY_SCREEN/CLEAR':
      return initialState;

    default:
      return state
  }
}
