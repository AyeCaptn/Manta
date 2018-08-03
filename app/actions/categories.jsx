import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

// Get All Contacts
export const getAllCategories = createAction(ACTION_TYPES.CATEGORY_GET_ALL);

// Save A Category
export const saveCategory = createAction(
  ACTION_TYPES.CATEGORY_SAVE,
  categoryData => categoryData
);

// Delete A Category
export const deleteCategory = createAction(
  ACTION_TYPES.CATEGORY_DELETE,
  categoryID => categoryID
);

// Edit A Category
export const editCategory = createAction(
  ACTION_TYPES.CATEGORY_EDIT,
  categoryData => categoryData
);
  
  // Update A Category
export const updateCategory = createAction(
  ACTION_TYPES.CATEGORY_UPDATE,
  updatedCategory => updatedCategory
);