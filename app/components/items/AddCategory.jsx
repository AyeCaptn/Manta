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
  margin-bottom: 20px;
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

const Name = styled.div`
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

class AddCategory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.props.category;
    this.saveCategoryFormData = this.saveCategoryFormData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Update local state
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value }, () => {
      this.props.updateFieldData('category', this.state);
    });
  }

  componentWillReceiveProps(newProps) {
    this.state = newProps.category
  }

  saveCategoryFormData() {
    const { saveCategoryFormData } = this.props;
    saveCategoryFormData(this.state)
  }

  render() {
    const { t, toggleCategoryForm, categoryForm, clearCategoryForm } = this.props;
    const { open } = categoryForm;
    return (
      <Motion
        style={{
          height: spring(open ? 190 : 45),
          rotate: spring(open ? 180 : 0),
        }}
      >
        {({ height, rotate }) => (
          <Wrapper style={{ height: `${height}px` }}>
            <SettingsHeader href="#" onClick={toggleCategoryForm}>
              <Label>{t('form:fields:category:name')}</Label>
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
                <Name>
                  <Field>
                    <label className="itemLabel">
                      {t('form:fields:category:description')}
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      placeholder={t('form:fields:item:name')}
                    />
                  </Field>
                </Name>
              </Row>
              <Buttons>
                <Button danger onClick={clearCategoryForm}>
                  {t('items:btns:reset')}
                </Button>
                <Button success onClick={this.saveCategoryFormData}>
                  {t('items:btns:add')}
                </Button>
              </Buttons>
            </AllFields>
          </Wrapper>
        )}
      </Motion>
    );
  }
}

AddCategory.propTypes = {
  categoryForm: PropTypes.object.isRequired,
  toggleCategoryForm: PropTypes.func.isRequired,
  clearCategoryForm: PropTypes.func.isRequired,
  updateFieldData: PropTypes.func.isRequired,
  saveCategoryFormData: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

// Export
export default AddCategory;
