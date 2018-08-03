const openDialog = require('../renderers/dialog');
const appConfig = require('electron').remote.require('electron-settings');
import { getInvoiceValue } from './invoice';
import { isEmpty, pick, includes } from 'lodash';
import i18n from '../../i18n/i18n';
import uuidv4 from 'uuid/v4';

function validateItemFormData(itemFormsData) {
  const {
    itemForm,
    item
  } = itemFormsData;
  const {
    description,
    categoryID,
    price,
  } = item;
  // Required fields
  const { required_fields } = itemForm;
  if (!validateDescription(required_fields.description, description)) return false;
  if (!validateCategoryID(required_fields.categoryID, categoryID)) return false;
  if (!validatePrice(required_fields.price, price)) return false;
  return true;
}

function validateCategoryFormData(itemFormsData) {
  const {
    categoryForm,
    category
  } = itemFormsData;
  const {
    name,
  } = category;
  // Required fields
  const { required_fields } = categoryForm;
  if (!validateName(required_fields.name, name)) return false;
  return true;
}

function getItemData(itemFormsData) {
  const {
    item,
    itemForm
  } = itemFormsData;
  const {
    description,
    categoryID,
    price
  } = item;
  // Required fields
  const { editMode, required_fields } = itemForm;
  // Set Initial Value
  const itemData = {};  
  // Set description
  if (required_fields.description) itemData.description = description;
  // Set category
  if (required_fields.categoryID) itemData.categoryID = categoryID;
  // Set price
  if (required_fields.price) itemData.price = price;

  // Return final value
  return Object.assign({}, itemData, {
    // Metadata
    _id: editMode.active ? editMode.data._id : uuidv4(),
    _rev: editMode.active ? editMode.data._rev : null,
    created_at: editMode.active ? editMode.data.created_at : Date.now(),
  });
}

function getCategoryData(itemFormsData) {
  const {
    category,
    categoryForm
  } = itemFormsData;
  const {
    name,
  } = category;
  // Required fields
  const { editMode, required_fields } = categoryForm;
  // Set Initial Value
  const categoryData = {};  
  // Set description
  if (required_fields.name) categoryData.name = name;

  // Return final value
  return Object.assign({}, categoryData, {
    // Metadata
    _id: editMode.active ? editMode.data._id : uuidv4(),
    _rev: editMode.active ? editMode.data._rev : null,
    created_at: editMode.active ? editMode.data.created_at : Date.now(),
  });
}

// VALIDATION RULES
function validateDescription(isRequired, description) {
  if (isRequired) {
    if (!description || description === '') {
      openDialog({
        type: 'warning',
        title: i18n.t('dialog:validation:item:description:title'),
        message: i18n.t('dialog:validation:item:description:message'),
      });
      return false;
    }
    return true;
  }
  return true; 
}  

function validateCategoryID(isRequired, categoryID) {
  if (isRequired) {
    if (!categoryID || categoryID === '') {
      openDialog({
        type: 'warning',
        title: i18n.t('dialog:validation:item:category:title'),
        message: i18n.t('dialog:validation:item:category:message'),
      });
      return false;
    }
    return true;
  }
  return true; 
}  

function validateName(isRequired, name) {
  if (isRequired) {
    if (!name || name === '') {
      openDialog({
        type: 'warning',
        title: i18n.t('dialog:validation:category:name:title'),
        message: i18n.t('dialog:validation:category:name:message'),
      });
      return false;
    }
    return true;
  }
  return true; 
}  

function validatePrice(isRequired, price) {
  if (isRequired) {
    if (!price || price <= 0) {
      openDialog({
        type: 'warning',
        title: i18n.t('dialog:validation:item:price:title'),
        message: i18n.t('dialog:validation:item:price:message'),
      });
      return false;
    }
    return true;
  }
  return true; 
}

export {
  validateItemFormData,
  validateCategoryFormData,
  getItemData,
  getCategoryData,
  validateDescription,
  validateCategoryID,
  validateName,
  validatePrice,
};
