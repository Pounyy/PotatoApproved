const categoryLabels = {
  potato: 'Potato Approved',
  fries: 'Fries Approved',
};

const searchableText = (game) => [
  game.title,
  game.genre,
  game.year,
  game.hardware,
  game.description,
].join(' ').toLocaleLowerCase();

export const filterGames = (games, query) => {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return [];
  return games.filter((game) => searchableText(game).includes(normalizedQuery));
};

const createSpecRow = (label, value) => {
  const row = document.createElement('div');
  const term = document.createElement('dt');
  const description = document.createElement('dd');

  term.textContent = label;
  description.textContent = value;
  row.append(term, description);
  return row;
};

const createGameCard = (game) => {
  const card = document.createElement('article');
  card.className = 'game-card';

  const coverFrame = document.createElement('div');
  coverFrame.className = 'cover-frame';

  const cover = document.createElement('img');
  cover.src = game.image;
  cover.alt = `${game.title} cover placeholder`;
  cover.width = 180;
  cover.height = 270;
  cover.loading = 'lazy';
  coverFrame.append(cover);

  const copy = document.createElement('div');
  copy.className = 'game-copy';

  const heading = document.createElement('div');
  heading.className = 'game-heading';

  const title = document.createElement('h2');
  title.textContent = game.title;

  const badge = document.createElement('span');
  badge.className = `badge badge-${game.category}`;
  badge.textContent = categoryLabels[game.category];
  heading.append(title, badge);

  const metadata = document.createElement('p');
  metadata.className = 'game-meta';
  metadata.textContent = `${game.genre} · ${game.year}`;

  const specs = document.createElement('dl');
  specs.className = 'specs';
  specs.append(
    createSpecRow('Hardware', game.hardware),
    createSpecRow('Performance', game.performance),
  );

  const description = document.createElement('p');
  description.className = 'game-description';
  description.textContent = game.description;

  copy.append(heading, metadata, specs, description);

  if (game.storeUrl) {
    const storeLink = document.createElement('a');
    storeLink.className = 'store-link';
    storeLink.href = game.storeUrl;
    storeLink.target = '_blank';
    storeLink.rel = 'noreferrer';
    storeLink.textContent = `${game.storeLabel || 'View store'} `;

    const externalIcon = document.createElement('span');
    externalIcon.setAttribute('aria-hidden', 'true');
    externalIcon.textContent = '↗';
    storeLink.append(externalIcon);
    copy.append(storeLink);
  }

  card.append(coverFrame, copy);
  return card;
};

const renderGames = (container, games) => {
  const fragment = document.createDocumentFragment();
  for (const game of games) fragment.append(createGameCard(game));
  container.replaceChildren(fragment);
};

const initializeGameSearch = (catalogue) => {
  const input = catalogue.querySelector('[data-game-search]');
  const results = catalogue.querySelector('[data-game-results]');
  const resultCount = catalogue.querySelector('[data-result-count]');
  const searchHelp = catalogue.querySelector('[data-search-help]');
  const emptyState = catalogue.querySelector('[data-empty-state]');
  const gameData = catalogue.querySelector('[data-game-data]');
  const categoryCount = document.querySelector('[data-category-count]');

  if (!input || !results || !resultCount || !searchHelp || !emptyState || !gameData) return;

  const initialCards = Array.from(results.children);
  const initialHelpText = searchHelp.textContent.trim();
  const allGames = JSON.parse(gameData.textContent || '[]');

  const restoreCategory = () => {
    results.replaceChildren(...initialCards);
    resultCount.hidden = true;
    resultCount.textContent = '';
    emptyState.hidden = true;
    searchHelp.textContent = initialHelpText;
    if (categoryCount) categoryCount.hidden = false;
  };

  const showSearchResults = (query) => {
    const matches = filterGames(allGames, query);
    renderGames(results, matches);
    resultCount.textContent = `${matches.length} ${matches.length === 1 ? 'result' : 'results'}`;
    resultCount.hidden = false;
    emptyState.hidden = matches.length !== 0;
    searchHelp.textContent = 'Searching Potato Approved and Fries Approved games.';
    if (categoryCount) categoryCount.hidden = true;
  };

  input.addEventListener('input', () => {
    const query = input.value.trim();
    if (query) showSearchResults(query);
    else restoreCategory();
  });
};

if (typeof document !== 'undefined') {
  for (const catalogue of document.querySelectorAll('[data-game-list]')) {
    initializeGameSearch(catalogue);
  }
}
