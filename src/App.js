import React, { Component } from "react";
import "./styles.css";
import DropDownComponent from "./DropDown";
const filterMockData = [
  { id: 1, item: "Filter 1" },
  { id: 2, item: "Filter 2" },
  { id: 3, item: "Filter 3" },
  { id: 4, item: "Filter 4" },
  { id: 5, item: "Filter 5" },
  { id: 6, item: "Filter 6" },
  { id: 7, item: "Filter 7" },
  { id: 8, item: "Filter 8" },
  { id: 9, item: "Filter 9" },
  { id: 10, item: "Filter 10" }
];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ItemsList: filterMockData,
      isFilterEnabled: false,
      selectedItem: "",
      filterList: 5, // Diffault to show the number of item list in dropdown and every click it will increase 5 more
      searchItem: "",
      userHasThePrivilagesToAddItem: true // true/false to enable the "add&Select" feature to the user
    };
    this.searchItems = this.searchItems.bind(this);
    this.filterToggel = this.filterToggel.bind(this);
    this.moreItems = this.moreItems.bind(this);
    this.selectedItemFromFilter = this.selectedItemFromFilter.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  moreItems = () => {
    this.setState({ filterList: this.state.filterList + 5 });
  };
  filterToggel = () => {
    this.setState({
      isFilterEnabled: !this.state.isFilterEnabled,
      searchItem: "",
      filterList: 5
    });
  };
  selectedItemFromFilter = item => {
    this.setState({
      selectedItem: item,
      isFilterEnabled: !this.state.isFilterEnabled,
      searchItem: ""
    });
  };
  searchItems = event => {
    this.setState({ searchItem: event.target.value });
  };
  addItem = item => {
    const newItem = this.state.ItemsList.concat({ id: Date.now(), item: item });
    this.setState({
      ItemsList: newItem,
      isFilterEnabled: !this.state.isFilterEnabled,
      selectedItem: item
    });
  };
  render() {
    const {
      ItemsList,
      isFilterEnabled,
      selectedItem,
      filterList,
      searchItem,
      userHasThePrivilagesToAddItem
    } = this.state;

    const items = ItemsList.filter(data => {
      if (searchItem == null) return data;
      else if (data.item.toLowerCase().includes(searchItem.toLowerCase())) {
        return data;
      } else {
        return false;
      }
    }).map((item, itemIndex) => {
      return (
        <div className="dropDown-content">
          {filterList > itemIndex && (
            <DropDownComponent
              item={item}
              selectedItemFromFilter={() =>
                this.selectedItemFromFilter(item.item)
              }
            />
          )}
        </div>
      );
    });
    return (
      <div className="App">
        <h1>Drop-Down CodeSandbox</h1>
        <button className="drop-down-button" onClick={this.filterToggel}>
          {selectedItem ? (
            <span>{selectedItem} </span>
          ) : (
            <span>Select a Loaction</span>
          )}
          <i className="fa fa-toggle-down" />
        </button>

        <br />

        {isFilterEnabled && (
          <>
            <section className="section">
              <form className="form" id="addItemForm">
                <input
                  onChange={this.searchItems}
                  type="text"
                  className="input"
                  placeholder="Search..."
                />
              </form>
            </section>
            <div>
              {" "}
              {items.length > 0 ? (
                items
              ) : (
                <div>
                  "{searchItem}" not found
                  <span>
                    {userHasThePrivilagesToAddItem && (
                      <button
                        className="drop-down-button"
                        onClick={() => this.addItem(searchItem)}
                      >
                        Add & Select
                      </button>
                    )}
                  </span>
                </div>
              )}{" "}
            </div>
            {filterList < ItemsList.length && items.length > 5 && (
              <span onClick={this.moreItems}>5 more...</span>
            )}
          </>
        )}
      </div>
    );
  }
}
