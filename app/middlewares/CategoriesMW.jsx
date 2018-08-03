// Node Libs
import uuidv4 from 'uuid/v4';

// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Helpers
import { getAllDocs, saveDoc, deleteDoc, updateDoc } from '../helpers/pouchDB';
import i18n from '../../i18n/i18n';

const CategoriesMW = ({ dispatch }) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.CATEGORY_GET_ALL: {
      return getAllDocs('categories')
        .then(allDocs => {
          next(
            Object.assign({}, action, {
              payload: allDocs,
            })
          );
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message,
            },
          });
        });
    }

    case ACTION_TYPES.CATEGORY_SAVE: {
      return saveDoc('categories', action.payload)
        .then(newDocs => {
          next({
            type: ACTION_TYPES.CATEGORY_SAVE,
            payload: newDocs,
          });
          dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: i18n.t('messages:item:saved'),
            },
          });
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message,
            },
          });
        });
    }

    case ACTION_TYPES.CATEGORY_UPDATE: {
      return updateDoc('categories', action.payload)
        .then(docs => {
          next({
            type: ACTION_TYPES.CATEGORY_UPDATE,
            payload: docs,
          });
          dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: i18n.t('messages:item:updated'),
            },
          });
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message,
            },
          });
        });
    }

    case ACTION_TYPES.CATEGORY_DELETE: {
      return deleteDoc('categories', action.payload)
        .then(remainingDocs => {
          next({
            type: ACTION_TYPES.CATEGORY_DELETE,
            payload: remainingDocs,
          });
          dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: i18n.t('messages:item:deleted'),
            },
          });
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message,
            },
          });
        });
    }

    default: {
      return next(action);
    }
  }
};

export default CategoriesMW;
