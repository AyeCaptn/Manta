// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

// Redux
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/form.jsx';
import { getRows } from '../../reducers/FormReducer';

// DragNDrop
import TransitionList from '../../components/shared/TransitionList';
import _withDragNDrop from './hoc/_withDragNDrop';

// Custom Component
import Button from '../shared/Button.jsx';
import { Section } from '../shared/Section';
import RecurringItemRow from './RecurringItemRow.jsx';
import RecurringItemPicker from './RecurringItemPicker.jsx';

// Styled Components
import styled from 'styled-components';

const ItemsListWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  -webkit-app-region: no-drag;
`;

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
`;

const ItemsListDiv = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #4f555c;
  margin-bottom: 0px;
`;

const ItemListColumns = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 10px;
`;

// Component
export class RecurringItemsList extends PureComponent {
  
  render() {
    // Bound Actions
    const { addItem, removeItem, updateItem, addRecurringItem } = this.props.boundActionCreators;
    // Item Rows
    const { t, rows } = this.props;
    const rowsComponent = rows.map((item, index) => (
      <RecurringItemRow
        key={item.id}
        item={item}
        t={t}
        hasHandler={rows.length > 1}
        actions={index !== 0}
        updateRow={updateItem}
        removeRow={removeItem}
        addItem={addItem}
      />
    ));

    // Render
    return (
      <Section>
        <ItemsListWrapper>
          <ItemsListHeader>
            <label className="itemLabel">{t('form:fields:items:name')} *</label>
          </ItemsListHeader>
          <ItemListColumns>
            <div className='flex3'>
              <Label>Description</Label>
            </div>
            <div className='flex1'>
              <Label>Price</Label>
            </div>
            <div className='flex1'>
              <Label>Quantity</Label>
            </div>
          </ItemListColumns>
          <ItemsListDiv>
            <TransitionList componentHeight={50}>
              {rowsComponent}
            </TransitionList>
          </ItemsListDiv>
          <RecurringItemPicker 
            t={t}
            addRecurringItem={addRecurringItem}
          />
        </ItemsListWrapper>
      </Section>
    );
  }
}

RecurringItemsList.propTypes = {
  boundActionCreators: PropTypes.object.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  formState: state.form, // Make drag & drop works
  rows: getRows(state),
});

const mapDispatchToProps = dispatch => ({
  boundActionCreators: bindActionCreators(Actions, dispatch),
});

// Export
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  translate(),
  _withDragNDrop
)(RecurringItemsList);
