import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount = () => {
    document.addEventListener('keydown', this.closeModal);
  };
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.closeModal);
  };

  closeModal = event => {
    if (event.code === 'Escape') {
      this.props.onModalClick();
    }
  };

  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onModalClick();
    }
  };

  render() {
    const { alt, url } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleClick}>
        <div className={css.modal}>
          <img src={url} alt={alt} />
        </div>
      </div>
    );
  }
}
