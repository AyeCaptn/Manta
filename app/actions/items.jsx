import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

// Get All Items
export const getItems = createAction(ACTION_TYPES.ITEM_GET_ALL);

// Save An Item
export const saveItem = createAction(
  ACTION_TYPES.ITEM_SAVE,
  itemData => itemData
);

// Delete An Item
export const deleteItem = createAction(
  ACTION_TYPES.ITEM_DELETE,
  itemID => itemID
);

// Edit An Item
export const editItem = createAction(
  ACTION_TYPES.ITEM_EDIT,
  itemData => itemData
);

// Update An Item
export const updateItem = createAction(
  ACTION_TYPES.ITEM_UPDATE,
  updatedItem => updatedItem
);