// Libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

// Actions
import * as ItemsActions from '../../actions/items';
import * as CategoriesActions from '../../actions/categories';
import { bindActionCreators } from 'redux';

// HOCs
import _withDraggable from './hoc/_withDraggable';
import Button from '../shared/Button.jsx';

// Selectors
import { getItems } from '../../reducers/ItemsReducer';
import { getCategories } from '../../reducers/CategoriesReducer';

import { filter } from 'lodash';
// Styles
import styled from 'styled-components';

const ItemDiv = styled.div`
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

const ItemDivInput = styled.input`
  min-height: 36px;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 16px;
  display: block;
  width: 100%;
  border: 1px solid #f2f3f4;
  color: #3a3e42;
  font-size: 14px;
`;

const ItemDivSelect = styled.select`
  min-height: 36px;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 16px;
  display: block;
  width: 100%;
  border: 1px solid #f2f3f4;
  color: #3a3e42;
  font-size: 14px;
`;

const ItemActions = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 40px;
  margin: 0 !important;
  margin-left: 10px;
`;

const ItemRemoveBtn = styled.a`
  > i {
    color: #ec476e;
  }
`;

const ItemsListActionsBtn = styled(Button)`
  &:focus {
    outline: none !important;
    box-shadow: none !important;
    color: white;
  }
  &:active {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
  &:disabled {
    outline: none !important;
    box-shadow: none !important;
    background-color: #dcdcdc;
  }
`;

// Component
export class RecurringItemPicker extends Component {
  constructor(props) {
    super(props);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.getItem = this.getItem.bind(this);
    this.addRecurringItem = this.addRecurringItem.bind(this);
  }

  componentWillMount() {
    const { items } = this.props;
    this.setState({
      categoryID: '',
      itemID: '',
      description: '',
      price: 0,
      quantity: 1
    });
  }

  handleCategoryChange(event) {
    const categoryID = event.target.value;
    const { items } = this.props;
    const item = filter(items, { categoryID })[0];
    const itemID = item !== undefined ? item._id : '';
    this.setState({ categoryID, itemID });
  }

  handleItemChange(event) {
    const itemID = event.target.value;
    this.setState({ itemID });
  }

  addRecurringItem() {
    const { addRecurringItem } = this.props;
    addRecurringItem(this.getItem());
  }

  getItem() {
    const { items } = this.props;
    const { itemID } = this.state;
    const item =
      itemID !== '' ? filter(items, { _id: this.state.itemID })[0] : items[0];
    return { description: item.description, price: item.price, quantity: 1 };
  }

  render() {
    const { t, actions, hasHandler, categories, items } = this.props;
    const categoryOptions = categories.map(category => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ));
    const selectedItems =
      this.state.categoryID !== ''
        ? filter(items, { categoryID: this.state.categoryID })
        : items;
    const itemOptions = selectedItems.map(item => (
      <option key={item._id} value={item._id}>
        {item.description}
      </option>
    ));

    return (
      <ItemDiv>
        <div className="flex2">
          <ItemDivSelect
            name="categoryID"
            value={this.state.categoryID}
            onChange={this.handleCategoryChange}
          >
            <option value="">All items</option>
            {categoryOptions}
          </ItemDivSelect>
        </div>

        <div className="flex2">
          <ItemDivSelect
            name="itemID"
            value={this.state.itemID}
            onChange={this.handleInputChange}
          >
            {itemOptions}
          </ItemDivSelect>
        </div>

        <div className="itemsListActions">
          <ItemsListActionsBtn primary disabled={selectedItems.length === 0} onClick={this.addRecurringItem}>
            {t('form:fields:items:add')}
          </ItemsListActionsBtn> 
        </div>
      </ItemDiv>
    );
  }
}

RecurringItemPicker.propTypes = {
  addRecurringItem: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

// Map state to props & Export
const mapStateToProps = state => ({
  items: getItems(state),
  categories: getCategories(state),
});

export default compose(connect(mapStateToProps))(RecurringItemPicker);
