// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
const openDialog = require('../../renderers/dialog.js');
const ipc = require('electron').ipcRenderer;
import { translate } from 'react-i18next';
import { Section } from '../../components/shared/Section';
import Button from '../shared/Button';
import filter from 'lodash/filter';

// Actions
import * as CategoriesActions from '../../actions/categories';

// Components
import Item from '../../components/items/Item';
import Message from '../../components/shared/Message';
import { Table, THead, TBody, TH, TR } from '../../components/shared/Table';
import _withFadeInAnimation from '../../components/shared/hoc/_withFadeInAnimation';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageContent,
} from '../../components/shared/Layout';

// Selectors
import { getItems } from '../../reducers/ItemsReducer';

// Styled Components
import styled from 'styled-components';

const ItemsListHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
`;

const CategoryContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;

  & > div {
    display: flex;
    flex-direction: row;
    margin-right: 10px;
    &:last-child {
      margin-right: 0px;
    }
  }
`;

const Actions = styled.div `
  flex: none;
  width: 60px;
  margin-left: 40px;
  justify-content: space-between;
`;

// Component
class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.selectCategory = this.selectCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
  }

  selectCategory(event) {
    const {updateFieldData} = this.props;
    this.setState({ selectedCategory: event.target.value }, () => {
      updateFieldData('selectedCategory', this.state.selectedCategory);
    });
  }

  deleteCategory() {
    const { deleteCategory, selectedCategory } = this.props;
    deleteCategory(selectedCategory);
  }

  editCategory() {
    const { editCategory, categories, selectedCategory } = this.props;
    editCategory(filter(categories, {_id: selectedCategory})[0]);
  }

  render() {
    const { t, categories, selectedCategory } = this.props;
    const categoryOptions = categories.map(category => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ));
    return (
      <Section>
        <label className="itemLabel">{t('form:fields:items:category:select')}</label>
        <CategoryContainer>
          <select name="selectedCategory" value={selectedCategory} onChange={this.selectCategory}>
            <option value="">
            All items
            </option>
            {categoryOptions}
          </select>
          <Actions>
            <Button link primary onClick={this.editCategory}>
              <i className="ion-edit" />
            </Button>
            <Button link danger onClick={this.deleteCategory}>
              <i className="ion-close-circled" />
            </Button>
          </Actions>
        </CategoryContainer>
      </Section>
    );
  }
}

// PropTypes
CategorySelect.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  updateFieldData: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

export default compose(
  translate(),
  _withFadeInAnimation
)(CategorySelect);
