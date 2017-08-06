const $qs = selector => window.document.querySelector.bind(window.document)(selector);

const addEventClickListener = (clickEvtListener) => {
  $qs('#penguinView').addEventListener('click', clickEvtListener);
};

const emptyElement = ($elm) => {
  $elm.innerHTML = ''; // eslint-disable-line  no-param-reassign
};

const svgParser = str =>
  new window.DOMParser().parseFromString(str, 'image/svg+xml');

const showSpinner = () => {
  const $penguinImage = $qs('#penguinView .penguin-image');

  const $div = window.document.createElement('div');
  $div.classList.add('loader');

  const svgSpinner = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path opacity=".5" d="M20.2 5.17c-8.25 0-14.94 6.7-14.94 14.95s6.7 14.94 14.94 14.94 14.95-6.7 14.95-14.95c0-8.2-6.7-14.9-14.95-14.9zm0 26.58c-6.42 0-11.63-5.2-11.63-11.64 0-6.4 5.2-11.6 11.63-11.6 6.43 0 11.63 5.2 11.63 11.65S26.63 31.8 20.2 31.8z"/>
      <path d="M26 10.05l1.67-2.87c-2.2-1.27-4.75-2-7.47-2v3.3c2.12 0 4.1.58 5.8 1.57z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path>
     </svg>
  `;

  $div.appendChild($div.ownerDocument.importNode(svgParser(svgSpinner).documentElement, true));
  emptyElement($penguinImage);
  $penguinImage.appendChild($div);
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
  showSpinner,
  penguinTitle,
  penguinInfo,
  penguinImage,
  penguinControlls,
  updatePenguin,
  addEventClickListener,
};
