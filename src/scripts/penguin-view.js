const $qs = selector => window.document.querySelector.bind(window.document)(selector);

const addEventClickListener = (clickEvtListner) => {
  $qs('#penguinView').addEventListener('click', clickEvtListner);
};

const emptyElement = ($elm) => {
  $elm.innerHTML = ''; // eslint-disable-line  no-param-reassign
};

const penguinTitle = ({ name }) => {
  const $header = $qs('#penguinView header');
  const $h3 = window.document.createElement('h2');
  $h3.appendChild(window.document.createTextNode(name));
  emptyElement($header);
  $header.appendChild($h3);
};

const penguinImage = ({ imageUrl, name }) => {
  const $penguinImage = $qs('#penguinView .penguin-image');
  const $div = window.document.createElement('div');
  const $img = window.document.createElement('img');
  $div.classList.add('image');
  $img.setAttribute('src', imageUrl);
  $img.setAttribute('alt', `image ${name}`);
  $div.appendChild($img);
  emptyElement($penguinImage);
  $penguinImage.appendChild($div);
};

const penguinInfo = ({ size, favoriteFood }) => {
  const $penguinInfo = $qs('#penguinView .penguin-info');
  const $ul = window.document.createElement('ul');

  [{ label: 'Size: ', data: size },
    { label: 'Favorite food: ', data: favoriteFood },
  ].forEach((item) => {
    const $li = window.document.createElement('li');
    const $span = window.document.createElement('span');

    $span.appendChild(window.document.createTextNode(item.label));
    $li.appendChild($span);

    $li.appendChild(window.document.createTextNode(item.data));
    $ul.appendChild($li);
  });

  emptyElement($penguinInfo);
  $penguinInfo.appendChild($ul);
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
  $penguinView.classList.add('container');

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
