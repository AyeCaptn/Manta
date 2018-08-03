// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import { TR, TD } from '../shared/Table';
import Button from '../shared/Button';

// Component
class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  deleteItem() {
    const { deleteItem, item } = this.props;
    deleteItem(item._id);
  }

  editItem() {
    const { editItem, item } = this.props;
    editItem(item);
  }

  render() {
    const { item } = this.props;
    return (
      <TR>
        <TD bold>{item.description}</TD>
        <TD>{item.price}</TD>
        <TD actions>
          <Button link primary onClick={this.editItem}>
            <i className="ion-edit" />
          </Button>
          <Button link danger onClick={this.deleteItem}>
            <i className="ion-close-circled" />
          </Button>
        </TD>
      </TR>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

export default Item;
