const $qs = selector => window.document.querySelector.bind(window.document)(selector);

const addEventClickListener = (clickEvtListner) => {
  $qs('#penguinView').addEventListener('click', clickEvtListner);
};

const emptyElement = ($elm) => {
  $elm.innerHTML = ''; // eslint-disable-line  no-param-reassign
};

const penguinTitle = ({ name }) => {
  const $header = $qs('#penguinView header');
  const $h3 = window.document.createElement('h3');
  $h3.appendChild(window.document.createTextNode(name));
  emptyElement($header);
  $header.appendChild($h3);
};

const penguinImage = ({ imageUrl, name }) => {
  const $penguinImage = $qs('#penguinView .penguin-image');
  const $img = window.document.createElement('img');
  $img.setAttribute('src', imageUrl);
  $img.setAttribute('alt', `image ${name}`);
  emptyElement($penguinImage);
  $penguinImage.appendChild($img);
};

const penguinInfo = ({ size, favoriteFood }) => {
  const $penguinInfo = $qs('#penguinView .penguin-info');
  const fragment = window.document.createDocumentFragment();

  [{ label: 'Size: ', data: size },
    { label: 'Favorite food: ', data: favoriteFood },
  ].forEach((item) => {
    const $p = window.document.createElement('p');
    const $span = window.document.createElement('span');

    $span.appendChild(window.document.createTextNode(item.label));
    $p.appendChild($span);

    $p.appendChild(window.document.createTextNode(item.data));
    fragment.appendChild($p);
  });

  emptyElement($penguinInfo);
  $penguinInfo.appendChild(fragment);
};

const penguinControlls = () => {
  const $penguinControlls = $qs('#penguinView .penguin-controlls');
  const fragment = window.document.createDocumentFragment();

  ['previous', 'next'].forEach((item) => {
    const $button = window.document.createElement('button');
    $button.setAttribute('id', `${item}-penguin`);
    $button.appendChild(window.document.createTextNode(item));
    fragment.appendChild($button);
  });

  emptyElement($penguinControlls);
  $penguinControlls.appendChild(fragment);
};

const initPenguinView = ({ id }) => () => {
  const $root = $qs(`#${id}`);

  const $penguinView = window.document.createElement('div');
  $penguinView.setAttribute('id', 'penguinView');

  const $header = window.document.createElement('header');

  $penguinView.appendChild($header);

  ['penguin-image', 'penguin-info', 'penguin-controlls']
    .forEach((item) => {
      const $section = window.document.createElement('section');
      $section.classList.add(item);
      $penguinView.appendChild($section);
    });

  emptyElement($root);

  $root.appendChild($penguinView);
};

const updatePenguin = (props) => {
  penguinTitle(props);
  penguinImage(props);
  penguinInfo(props);
};

module.exports = {
  initPenguinView,
  penguinTitle,
  penguinImage,
  penguinInfo,
  penguinControlls,
  updatePenguin,
  addEventClickListener,
};
