import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/categories';

const CategoriesReducer = handleActions(
  {
    [combineActions(
      Actions.getAllCategories,
      Actions.saveCategory,
      Actions.updateCategory,
      Actions.deleteCategory
    )]: (state, action) => action.payload,
  },
  []
);

export default CategoriesReducer;

// Selector
const getCategoriesState = state => state.categories;
export const getCategories = createSelector(
  getCategoriesState,
  categories => categories
);
