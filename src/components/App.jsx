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
    totalPages: 0,
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
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...data],
          totalPages: data.totalHits,
          error: '',
        };
      });
    } catch (error) {
      this.setState({ error: `Something went wrong... ${error.message}` });
    } finally {
      this.setState({ loading: false });
    }
  };

  onImageSearch = newQuery => {
    if (newQuery === this.state.searchQuery) {
      alert('same query! Try to change your request');
      return;
    }
    this.setState({
      searchQuery: newQuery,
      images: [],
      page: 1,
    });
  };

  render() {
    const { loading, totalPages, images, error } = this.state;
    const isLastResults = images.length === totalPages;
    const showLoadMore = !isLastResults && !loading;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onImageSearch} />
        {loading ? (
          <RingLoader color="#36d7b7" size={200} />
        ) : (
          <ImageGallery data={this.state.images} />
        )}
        {showLoadMore && (
          <Button type="button" onClick={this.onIncrementPage}>
            {loading ? <Loader /> : 'Load more'}
          </Button>
        )}
        {error && <p>{error}</p>}
      </div>
    );
  }
}
