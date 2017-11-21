import { OrderedSet, fromJS } from 'immutable';

const initialState = OrderedSet([]);

export default (state = initialState, { type, stories }) => {
  switch (type) {
    case 'STORIES/ADD':
      return OrderedSet(
        stories.map(story => fromJS(story)))
        .union(state);

    default:
      return state
  }
}
