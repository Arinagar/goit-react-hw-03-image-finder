import { React, Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'service/api';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    error: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchPhotos();
    }
  }

  fetchPhotos = async () => {
    try {
      const data = await getImages(this.state.searchQuery, this.state.page);
      console.log(data);
      this.setState(prevState => {
        return { images: [...prevState.images, ...data] };
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  onImageSearch = newQuery => {
    this.setState({
      searchQuery: newQuery,
      images: [],
      page: 1,
    });
  };

  render() {
    console.log(this.state.images);
    return (
      <>
        <Searchbar onSubmit={this.onImageSearch} />
        <ImageGallery data={this.state.images} />
      </>
    );
  }
}
