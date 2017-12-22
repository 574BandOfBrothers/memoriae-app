import { Map, List, fromJS } from 'immutable';

const initialState = Map();

export default (state = initialState, { type, storyId, annotation, annotations }) => {
  switch (type) {
    case 'ANNOTATIONS/ADD':
      return state.set(storyId, fromJS(annotations));

    case 'ANNOTATIONS/CREATE':
      return state
        .update(storyId, (annotations = List()) => annotations.push(fromJS(annotation)));

    default:
      return state
  }
}
