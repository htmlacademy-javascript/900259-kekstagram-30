
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = ({url, description, comments, likes, id}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = (pictures, container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createPicture(picture);
    fragment.appendChild(thumbnail);
  });
  container.append(fragment);
};

export { renderThumbnails };
