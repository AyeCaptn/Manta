import { combineReducers } from 'redux';
import UIReducer from './UIReducer';
import FormReducer from './FormReducer';
import InvoicesReducer from './InvoicesReducer';
import ItemsReducer from './ItemsReducer';
import CategoriesReducer from './CategoriesReducer';
import ItemFormsReducer from './ItemFormsReducer';
import ContactsReducer from './ContactsReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  ui: UIReducer,
  form: FormReducer,
  invoices: InvoicesReducer,
  contacts: ContactsReducer,
  items: ItemsReducer,
  categories: CategoriesReducer,
  itemForms: ItemFormsReducer,
  settings: SettingsReducer,
});
