import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import CountDown from './CountDown';
import NewItem from './NewItem';
import Items from './Items';

import './Application.css';

const defaultState = [
  { value: 'Pants', id: uniqueId(), packed: false },
  { value: 'Jacket', id: uniqueId(), packed: false },
  { value: 'iPhone Charger', id: uniqueId(), packed: false },
  { value: 'MacBook', id: uniqueId(), packed: false },
  { value: 'Sleeping Pills', id: uniqueId(), packed: true },
  { value: 'Underwear', id: uniqueId(), packed: false },
  { value: 'Hat', id: uniqueId(), packed: false },
  { value: 'T-Shirts', id: uniqueId(), packed: false },
  { value: 'Belt', id: uniqueId(), packed: false },
  { value: 'Passport', id: uniqueId(), packed: true },
  { value: 'Sandwich', id: uniqueId(), packed: true },
];

class Application extends Component {
  state = {
    items: defaultState
  };

  addItem = itemToAdd => {
    this.setState({
      items: [itemToAdd, ...this.state.items]
    })
  }

  removeItem = (itemToRemove) => {
    const items = this.state.items.filter(item => itemToRemove.id !== item.id);
    this.setState({
      items
    });

  }

  toggleItem = (itemToToggle) => {
    this.setState({
      items: this.state.items.map((item) => {
        if(item.id !== itemToToggle.id) return item;
        return {...itemToToggle, packed: !itemToToggle.packed}
      })
    })
  }

  markAllUnpacked = () => {
  }

  render() {
    const {items} = this.state;
    const packedItems = items.filter(item => item.packed);
    const unpackedItems = items.filter(item => !item.packed);

    return (
      <div className="Application">
        <NewItem addItem={this.addItem} />
        <CountDown />
        <Items title="Unpacked Items" items={unpackedItems} toggleItem={this.toggleItem} removeItem={this.removeItem} />
        <Items title="Packed Items" items={packedItems} toggleItem={this.toggleItem} removeItem={this.removeItem} />
        <button className="button full-width" onClick={() => this.markAllUnpacked()}>Mark All As Unpacked</button>
      </div>
    );
  }
}

export default Application;
