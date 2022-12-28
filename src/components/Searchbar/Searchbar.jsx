import { React, Component } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onInputChange = event => {
    this.setState({
      query: event.target.value,
    });
  };

  onSearchSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onSearchSubmit}>
          <button type="submit" className="button">
            <BiSearchAlt2 />
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}
