// Node Libs
const appConfig = require('electron').remote.require('electron-settings');
import uuidv4 from 'uuid/v4';
import i18n from '../../i18n/i18n';

// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Actions
import * as ItemFormsActions from '../actions/itemForms';
import * as ItemActions from '../actions/items';
import * as CategoryActions from '../actions/categories';
import * as UIActions from '../actions/ui';

// Helper
import { getItemData, getCategoryData, validateItemFormData, validateCategoryFormData } from '../helpers/itemForms';

const ItemFormsMW = ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.ITEM_FORMS_CATEGORY_SAVE: {
      const currentItemFormsData = getState().itemForms;
      // Validate Form Data
      if (!validateCategoryFormData(currentItemFormsData)) return;
      const currentCategoryData = getCategoryData(currentItemFormsData);
      // UPDATE DOC
      if (currentItemFormsData.categoryForm.editMode.active) {
      // Update existing category
        dispatch(CategoryActions.updateCategory(currentCategoryData));
      } else {
      // Create new category
        dispatch(CategoryActions.saveCategory(currentCategoryData));
      }
      // Clear The Form
      dispatch(ItemFormsActions.clearCategoryForm(null, true));
      break;
    }

    case ACTION_TYPES.ITEM_FORMS_ITEM_SAVE: {
      const currentItemFormsData = getState().itemForms;
      // Validate Form Data
      if (!validateItemFormData(currentItemFormsData)) return;
      const currentItemData = getItemData(currentItemFormsData);
      // UPDATE DOC
      if (currentItemFormsData.itemForm.editMode.active) {
      // Update existing item
        dispatch(ItemActions.updateItem(currentItemData));
      } else {
      // Create new item
        dispatch(ItemActions.saveItem(currentItemData));
      }
      // Clear The Form
      dispatch(ItemFormsActions.clearItemForm(null, true));
      break;
    }

    case ACTION_TYPES.ITEM_FORMS_ITEM_CLEAR: {
      // Clear The Form
      next(action);
      break;
    }

    case ACTION_TYPES.ITEM_FORMS_CATEGORY_CLEAR: {
      // Clear The Form
      next(action);
      break;
    }

    default: {
      return next(action);
    }
  }
};

export default ItemFormsMW;
