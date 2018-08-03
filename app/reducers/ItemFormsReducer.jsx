// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
// Libs
import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

const initialState = {
  itemForm: {
    open: false,
    editMode: {
      active: false,
    },
    required_fields: {
      description: true,
      categoryID: true,
      price: true,
    },
  },
  item: {
    description: "",
    categoryID: "",
    price: "",
  },
  categoryForm: {
    open: false,
    editMode: {
      active: false,
    },
    required_fields: {
      name: true,
    },
  },
  category: {
    name: "",
  },
  selectedCategory: "",
};

const ItemFormsReducer = handleActions(
  {
    [ACTION_TYPES.ITEM_FORMS_ITEM_TOGGLE]: state =>
      Object.assign({}, state, {
        itemForm: Object.assign({}, state.itemForm, {
          open: !state.itemForm.open,
        }),
      }),

    [ACTION_TYPES.ITEM_FORMS_ITEM_CLOSE]: state =>
      Object.assign({}, state, {
        itemForm: Object.assign({}, state.itemForm, {
          open: false,
        }),
      }),
    
    [ACTION_TYPES.ITEM_FORMS_CATEGORY_TOGGLE]: state =>
      Object.assign({}, state, {
        categoryForm: Object.assign({}, state.categoryForm, {
          open: !state.categoryForm.open,
        }),
      }),

    [ACTION_TYPES.ITEM_FORMS_CATEGORY_CLOSE]: state =>
      Object.assign({}, state, {
        categoryForm: Object.assign({}, state.categoryForm, {
          open: false,
        }),
      }),

    [ACTION_TYPES.ITEM_FORMS_FIELD_UPDATE_DATA]: (state, action) => {
      const { field, data } = action.payload;
      if (typeof data === 'object') {
        return Object.assign({}, state, {
          [field]: {
            ...state[field],
            ...data,
          },
        });
      }
      return Object.assign({}, state, {
        [field]: data
      });
    },

    [ACTION_TYPES.ITEM_EDIT]: (state, action) => {
      const {
        _id,
        description,
        categoryID,
        price,
      } = action.payload;
      return Object.assign({}, state, {
        // Load content
        item: Object.assign({}, state.item, {
          _id: _id !== undefined ? _id : state.item._id,
          description: description !== undefined ? description : state.item.description,
          categoryID: categoryID !== undefined ? categoryID : state.item.categoryID,
          price: price !== undefined ? price : state.item.price,
        }),
        // Update settings
        itemForm: Object.assign({}, state.itemForm, {
          editMode: {
            active: true,
            data: action.payload,
          },
          open: true,
          required_fields: Object.assign({}, state.itemForm.required_fields, {
            _id: description !== undefined,
            description: description !== undefined,
            categoryID: categoryID !== undefined,
            price: price !== undefined,
          }),
        }),
      });
    },

    [ACTION_TYPES.CATEGORY_EDIT]: (state, action) => {
      const {
        _id,
        name,
      } = action.payload;
      return Object.assign({}, state, {
        // Load content
        category: Object.assign({}, state.category, {
          _id: _id !== undefined ? _id : state.category._id,
          name: name !== undefined ? name : state.category.name,
        }),
        // Update settings
        categoryForm: Object.assign({}, state.categoryForm, {
          editMode: {
            active: true,
            data: action.payload,
          },
          open: true,
          required_fields: Object.assign({}, state.categoryForm.required_fields, {
            _id: _id !== undefined,
            name: name !== undefined,
          }),
        }),
      });
    },

    [ACTION_TYPES.ITEM_FORMS_ITEM_CLEAR]: state => 
      Object.assign({}, state, {
        item: Object.assign({}, initialState.item),
        itemForm: Object.assign({}, initialState.itemForm, {
          open: true,
        })
      }),

    [ACTION_TYPES.ITEM_FORMS_CATEGORY_CLEAR]: state => 
      Object.assign({}, state, {
        category: Object.assign({}, initialState.category),
        categoryForm: Object.assign({}, initialState.categoryForm, {
          open: true,
        })
      }),
  },

  initialState
);

export default ItemFormsReducer;

// Selector Input
const getItemFormsState = state => state.itemForms;

// Selectors
export const getItemForm = createSelector(
  getItemFormsState,
  itemFormsState => itemFormsState.itemForm
);

export const getCategoryForm = createSelector(
  getItemFormsState,
  itemFormsState => itemFormsState.categoryForm
);

export const getSelectedCategory = createSelector(
  getItemFormsState,
  itemFormsState => itemFormsState.selectedCategory
)

export const getItem = createSelector(
  getItemFormsState,
  itemFormsState => itemFormsState.item
);

export const getCategory = createSelector(
  getItemFormsState,
  itemFormsState => itemFormsState.category
);