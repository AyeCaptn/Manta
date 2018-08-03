// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
// Libs
import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';

import * as Actions from '../actions/items';

const ItemsReducer = handleActions(
  {
    [combineActions(
      Actions.getItems,
      Actions.saveItem,
      Actions.updateItem,
      Actions.deleteItem
    )]: (state, action) => action.payload,
  },
  []
);

export default ItemsReducer;

// Selector
const getItemsState = state => state.items;
export const getItems = createSelector(
  getItemsState,
  items => items
);
