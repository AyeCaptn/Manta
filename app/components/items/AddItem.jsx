// Libraries
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

// Animation
import { Motion, spring } from 'react-motion';

import { Field, Row } from '../shared/Part';
import Button from '../shared/Button';

// Styles
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 0px;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const SettingsHeader = styled.a`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: #2c323a;
  &:hover {
    text-decoration: none;
    color: #2c323a;
  }
`;

const AllFields = styled.div`
  padding: 10px 40px 25px 40px;
  background: #f2f3f4;
`;

const Description = styled.div`
  flex: 5;
`;

const Category = styled.div`
  flex: 2;
`;

const Price = styled.div`
  flex: 1;
`;

const Setting = styled.div`
  margin-right: 20px;
  > label {
    color: #4f555c;
    margin-bottom: 10px;
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #4f555c;
  margin-bottom: 0px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  button {  margin-left: 10px; }
  i { margin-right: 10p
`;

// Component

class AddItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.props.item;
    this.setState({categoryID: this.props.categories[0]._id})
    this.saveItemFormData = this.saveItemFormData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Update local state
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = name === 'price' ? parseFloat(target.value) : target.value;
    this.setState({ [name]: value }, () => {
      this.props.updateFieldData('item', this.state);
    });
  }

  componentWillReceiveProps(newProps) {
    this.state = newProps.item
    this.setState({categoryID: this.props.categories[0]._id})
  }

  saveItemFormData() {
    const { saveItemFormData } = this.props;
    saveItemFormData(this.state)
  }

  render() {
    const { t, toggleItemForm, itemForm, clearItemForm, categories } = this.props;
    const { open, editMode } = itemForm;
      const w = 3;
    const categoryOptions = categories.map(category => (
      <option key={category._id} value={category._id}>{category.name}</option>
    ));
    const saveButton = editMode.active ? (
      <Button success onClick={this.saveItemFormData}>
        {t('items:btns:update')}
      </Button>
    ) : (
      <Button success onClick={this.saveItemFormData}>
        {t('items:btns:add')}
      </Button>
    );

    return (
      <Motion
        style={{
          height: spring(open ? 190 : 45),
          rotate: spring(open ? 180 : 0),
        }}
      >
        {({ height, rotate }) => (
          <Wrapper style={{ height: `${height}px` }}>
            <SettingsHeader href="#" onClick={toggleItemForm}>
              <Label>{t('form:fields:item:name')}</Label>
              <div
                style={{
                  transform: `rotate(${rotate}deg)`,
                }}
              >
                <i className="ion-arrow-down-b" />
              </div>
            </SettingsHeader>
            <AllFields>
              <Row>  
                <Description>
                  <Field>
                    <label className="itemLabel">
                      {t('form:fields:item:description')}
                    </label>
                    <input
                      name="description"
                      type="text"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      placeholder={t('form:fields:item:description')}
                    />
                  </Field>
                </Description>
                <Category>
                  <Field>
                    <label className="itemLabel">
                      {t('form:fields:item:categoryID')}
                    </label>
                    <select
                      name="categoryID"
                      value={this.state.categoryID}
                      onChange={this.handleInputChange}
                    >
                      {categoryOptions}
                    </select>
                  </Field>
                </Category>
                <Price>
                  <Field>
                    <label className="itemLabel">
                      {t('form:fields:item:price')}
                    </label>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      value={this.state.price}
                      onChange={this.handleInputChange}
                      placeholder={t('form:fields:item:price')}
                    />
                  </Field>
                </Price>
              </Row>
              <Buttons>
                <Button danger onClick={clearItemForm}>
                  {t('items:btns:reset')}
                </Button>
                {saveButton}
              </Buttons>
            </AllFields>
          </Wrapper>
        )}
      </Motion>
    );
  }
}

AddItem.propTypes = {
  itemForm: PropTypes.object.isRequired,
  clearItemForm: PropTypes.func.isRequired,
  toggleItemForm: PropTypes.func.isRequired,
  updateFieldData: PropTypes.func.isRequired,
  saveItemFormData: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
};

// Export
export default AddItem;
