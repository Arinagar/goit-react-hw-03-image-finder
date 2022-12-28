import { React, Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'service/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button.styled';
import { RingLoader } from 'react-spinners';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    error: null,
    loading: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchPhotos();
    }
  }

  onIncrementPage = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  fetchPhotos = async () => {
    this.setState({ loading: true });
    try {
      const data = await getImages(this.state.searchQuery, this.state.page);
      console.log(data);
      this.setState(prevState => {
        return { images: [...prevState.images, ...data] };
      });
    } catch (error) {
      this.setState({ error: `Something went wrong... ${error.message}` });
    } finally {
      this.setState({ loading: false });
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
    const { loading } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onImageSearch} />
        {loading ? (
          <RingLoader color="#36d7b7" size={200} />
        ) : (
          <ImageGallery data={this.state.images} />
        )}
        <Button type="button" onClick={this.onIncrementPage}>
          {loading ? <Loader /> : 'Load more'}
        </Button>
      </>
    );
  }
}
