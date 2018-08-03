import filter from 'lodash/filter';
import PropTypes from 'prop-types';
// Libs
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import * as CategoriesActions from '../actions/categories';
import * as ItemFormsActions from '../actions/itemForms';
// Actions
import * as ItemsActions from '../actions/items';
import AddCategory from '../components/items/AddCategory';
// Components
import AddItem from '../components/items/AddItem';
import CategorySelect from '../components/items/CategorySelect';
import ItemList from '../components/items/ItemList';
import { PageContent, PageHeader, PageHeaderTitle, PageWrapper } from '../components/shared/Layout';
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';
import { getCategories } from '../reducers/CategoriesReducer';
import { getCategory, getCategoryForm, getItem, getItemForm, getSelectedCategory } from '../reducers/ItemFormsReducer';
// Selectors
import { getItems } from '../reducers/ItemsReducer';
const openDialog = require('../renderers/dialog.js');
const ipc = require('electron').ipcRenderer;





// Component
class Items extends Component {
  constructor(props) {
    super(props);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.editCategory = this.editCategory.bind(this);
  }

  componentDidMount() {
    ipc.on('confirmed-delete-category', (event, index, categoryId) => {
      if (index === 0) {
        this.confirmedDeleteCategory(categoryId);
      }
    });
    ipc.on('confirmed-delete-item', (event, index, itemId) => {
      if (index === 0) {
        this.confirmedDeleteItem(itemId);
      }
    });
  }

  componentWillUnmount() {
    ipc.removeAllListeners('confirmed-delete-category');
    ipc.removeAllListeners('confirmed-delete-item');
  }

  categoryHasItems(categoryId) {
    const { items } = this.props;
    return filter(items, {categoryID: categoryId}).length > 0
  }

  deleteCategory(categoryId) {
    const { t } = this.props;
    if (categoryId === '') {
      openDialog({
        type: 'info',
        title: t('dialog:deleteCategory:default:title'),
        message: t('dialog:deleteCategory:default:message'),
      })
    } else if (this.categoryHasItems(categoryId)) {
      openDialog({
        type: 'info',
        title: t('dialog:deleteCategory:nonempty:title'),
        message: t('dialog:deleteCategory:nonempty:message'),
      })
    } else {
      openDialog(
        {
          type: 'warning',
          title: t('dialog:deleteContact:title'),
          message: t('dialog:deleteContact:message'),
          buttons: [
            t('common:yes'),
            t('common:noThanks')
          ],
        },
        'confirmed-delete-category',
        categoryId
      )
    }
  }

  confirmedDeleteCategory(categoryId) {
    const { deleteCategory } = this.props.boundCategoriesActionCreators;
    const { updateFieldData } = this.props.boundItemFormsActionCreators;
    deleteCategory(categoryId);
    updateFieldData('selectedCategory', '');
  }

  deleteItem(itemId) {
    const { t } = this.props;
    openDialog(
      {
        type: 'warning',
        title: t('dialog:deleteContact:title'),
        message: t('dialog:deleteContact:message'),
        buttons: [
          t('common:yes'),
          t('common:noThanks')
        ],
      },
      'confirmed-delete-item',
      itemId
    );
  }

  confirmedDeleteItem(itemId) {
    const { deleteItem } = this.props.boundItemsActionCreators;
    deleteItem(itemId);
  }

  editItem(item) {
    const { editItem } = this.props.boundItemsActionCreators;
    editItem(item);
  }

  editCategory(category) {
    const { editCategory } = this.props.boundCategoriesActionCreators;
    editCategory(category);
  }

  render() {
    const { 
      t,
      items,
      item, 
      categories,
      category, 
      itemForm, 
      categoryForm,
      selectedCategory,
    } = this.props;
    const {
      clearItemForm,
      clearCategoryForm,
      saveItemFormData,
      saveCategoryFormData,
      toggleItemForm,
      toggleCategoryForm,
      updateFieldData,
    } = this.props.boundItemFormsActionCreators;

    const selectedItems = selectedCategory !== '' 
      ? filter(items, {'categoryID': selectedCategory}) 
      : items;

    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>{t('items:header')}</PageHeaderTitle>
        </PageHeader>
        <PageContent>
          <AddItem
            itemForm={itemForm}
            toggleItemForm={toggleItemForm}
            item={item}
            t={t}
            clearItemForm={clearItemForm}
            categories={categories}
            updateFieldData={updateFieldData}
            saveItemFormData={saveItemFormData}
            updateItem={this.deleteItem}
          />
          <AddCategory
            categoryForm={categoryForm}
            toggleCategoryForm={toggleCategoryForm}
            category={category}
            t={t}
            clearCategoryForm={clearCategoryForm}
            updateFieldData={updateFieldData}
            saveCategoryFormData={saveCategoryFormData}
          />
          <CategorySelect 
            categories={categories} 
            selectedCategory={selectedCategory} 
            updateFieldData={updateFieldData} 
            deleteCategory={this.deleteCategory} 
            editCategory={this.editCategory} 
          />
          <ItemList 
            items={selectedItems} 
            deleteItem={this.deleteItem} 
            editItem={this.editItem} 
          />
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes
Items.propTypes = {
  boundItemsActionCreators: PropTypes.shape({
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
  }).isRequired,
  boundCategoriesActionCreators: PropTypes.shape({
    deleteCategory: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
  }).isRequired,
  boundItemFormsActionCreators: PropTypes.shape({
    clearItemForm: PropTypes.func.isRequired,
    clearCategoryForm: PropTypes.func.isRequired,
    saveItemFormData: PropTypes.func.isRequired,
    saveCategoryFormData: PropTypes.func.isRequired,
    toggleItemForm: PropTypes.func.isRequired,
    toggleCategoryForm: PropTypes.func.isRequired,
    updateFieldData: PropTypes.func.isRequired,
  }).isRequired,
  items: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  itemForm: PropTypes.object.isRequired,
  categoryForm: PropTypes.object.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  boundItemsActionCreators: bindActionCreators(ItemsActions, dispatch),
  boundCategoriesActionCreators: bindActionCreators(CategoriesActions, dispatch),
  boundItemFormsActionCreators: bindActionCreators(ItemFormsActions, dispatch),
});

// Map state to props & Export
const mapStateToProps = state => ({
  items: getItems(state),
  categories: getCategories(state),
  item: getItem(state),
  category: getCategory(state),
  itemForm: getItemForm(state),
  categoryForm: getCategoryForm(state),
  selectedCategory: getSelectedCategory(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  translate(),
  _withFadeInAnimation
)(Items);
