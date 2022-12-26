export const ImageGallery = ({ data }) => {
  console.log(data);
  return (
    <ul className="gallery">
      {data.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <li className="gallery-item" key={id}>
            <img src={webformatURL} alt={tags} />
          </li>
        );
      })}
    </ul>
  );
};
