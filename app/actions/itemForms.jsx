import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

export const toggleItemForm = createAction(
  ACTION_TYPES.ITEM_FORMS_ITEM_TOGGLE
);

export const toggleCategoryForm = createAction(
  ACTION_TYPES.ITEM_FORMS_CATEGORY_TOGGLE
);

export const closeItemForm = createAction(
  ACTION_TYPES.ITEM_FORMS_ITEM_CLOSE
);

export const closeCategoryForm = createAction(
  ACTION_TYPES.ITEM_FORMS_CATEGORY_CLOSE
);

export const saveItemFormData = createAction(
  ACTION_TYPES.ITEM_FORMS_ITEM_SAVE
);

export const saveCategoryFormData = createAction(
  ACTION_TYPES.ITEM_FORMS_CATEGORY_SAVE
);

export const updateFieldData = createAction(
  ACTION_TYPES.ITEM_FORMS_FIELD_UPDATE_DATA,
  (field, data) => ({ field, data })
);

export const clearItemForm = createAction(
  ACTION_TYPES.ITEM_FORMS_ITEM_CLEAR,
  (event, muted = false) => muted
);

export const clearCategoryForm = createAction(
  ACTION_TYPES.ITEM_FORMS_CATEGORY_CLEAR, 
  (event, muted = false) => muted
);
