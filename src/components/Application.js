import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import CountDown from './CountDown';
import NewItem from './NewItem';
import Items from './Items';

import Store from './Store';

import './Application.css';

class Application extends Component {
  state = {
    items: Store.getItems()
  };

  updateItemStore = () => {
    this.setState({
      items: Store.getItems()
    })
  }

  componentDidMount() {
    Store.on('change', this.updateItemStore);
  }

  componentWillUnmount() {
    Store.off('change', this.updateItemStore);
  }

  markAllUnpacked = () => {
    
    // const items = this.state.items.map(item => {
    //   return {...item, packed: false}
    // });
    // this.setState({
    //   items
    // })
  }

  render() {
    const {items} = this.state;
    const packedItems = items.filter(item => item.packed);
    const unpackedItems = items.filter(item => !item.packed);

    return (
      <div className="Application">
        <NewItem />
        <CountDown />
        <Items title="Unpacked Items" items={unpackedItems} />
        <Items title="Packed Items" items={packedItems} />
        <button className="button full-width" onClick={() => this.markAllUnpacked()}>Mark All As Unpacked</button>
      </div>
    );
  }
}

export default Application;
