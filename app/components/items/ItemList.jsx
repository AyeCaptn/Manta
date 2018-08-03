// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
const openDialog = require('../../renderers/dialog.js');
const ipc = require('electron').ipcRenderer;
import { translate } from 'react-i18next';
import { Section } from '../../components/shared/Section';

// Actions
import * as ItemsActions from '../../actions/items';

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

// Component
class ItemList extends PureComponent {

  render() {
    const { t, items, deleteItem, editItem } = this.props;
    const itemsComponent = items.map((item, index) => (
      <Item
        key={item._id}
        item={item}
        index={index}
        editItem={editItem}
        deleteItem={deleteItem}
      />
    ));
    return (
      <Section>
        <ItemsListHeader>
          <label className="itemLabel">{t('form:fields:items:name')} *</label>
        </ItemsListHeader>
        {items.length === 0 ? (
          <Message info text={t('messages:category:noItem')} />
        ) : (
          <Table hasBorders bg>
            <THead>
              <TR>
                <TH>{t('items:fields:description')}</TH>
                <TH>{t('items:fields:price')}</TH>
                <TH actions>{t('items:fields:actions')}</TH>
              </TR>
            </THead>
            <TBody>{itemsComponent}</TBody>
          </Table>
        )}
      </Section>
    );
         }
}

// PropTypes
ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default compose(
  translate(),
  _withFadeInAnimation
)(ItemList);
