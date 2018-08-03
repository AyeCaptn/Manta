// Libs
import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

// Component
import Item from '../Item';
import { TR, TD } from '../../shared/Table';
import Button from '../../shared/Button';

// Mocks
const item = {
  _id: 'id-string',
  name: 'Product/Service A',
  description: 'Description of the product/service',
  price: 12.3,
};
const editItem = jest.fn();
const deleteItem = jest.fn();

describe('Renders correctly to the DOM', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Item
        item={item}
        editItem={editItem}
        deleteItem={deleteItem}
      />
    );
  });

  it('renders 1 TR row', () => {
    expect(wrapper.find(TR)).toHaveLength(1);
    expect(wrapper.find(TR)).not.toHaveLength(2);
  });

  it('renders 5 TD columns', () => {
    expect(wrapper.find(TD)).toHaveLength(5);
    expect(wrapper.find(TD)).not.toHaveLength(6);
  });

  it('receive correct props', () => {
    const mountWrapper = mount(
      <Item
        item={item}
        editItem={editItem}
        deleteItem={deleteItem}
      />
    );
    expect(mountWrapper.prop('item')).toEqual(item);
    expect(mountWrapper.prop('editItem')).toEqual(editItem);
    expect(mountWrapper.prop('deleteItem')).toEqual(deleteItem);
  });

  it('renders 2 buttons in the last TD', () => {
    expect(
      wrapper
        .find(TD)
        .last()
        .find(Button)
    ).toHaveLength(2);
    expect(
      wrapper
        .find(TD)
        .last()
        .find(Button)
    ).not.toHaveLength(3);
  });

  describe('renders buttons correctly', () => {
    let firstBtn, lastBtn;
    beforeEach(() => {
      firstBtn = wrapper.find(Button).first();
      lastBtn = wrapper.find(Button).last();
    });

    it('renders buttons with correct props', () => {
      expect(firstBtn.prop('link')).toBe(true);
      expect(firstBtn.prop('primary')).toBe(true);
      expect(firstBtn.prop('success')).toBe(false);
      expect(lastBtn.prop('link')).toBe(true);
      expect(lastBtn.prop('danger')).toBe(true);
      expect(lastBtn.prop('success')).toBe(false);
    });

    it('handle click correctly', () => {
      firstBtn.simulate('click');
      expect(editItem).toHaveBeenCalled();
      expect(editItem).toHaveBeenCalledWith(item);

      lastBtn.simulate('click');
      expect(deleteItem).toHaveBeenCalled();
      expect(deleteItem).toHaveBeenCalledWith('id-string');
    });
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Item
          item={item}
          editItem={editItem}
          deleteItem={deleteItem}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
