// Lists public GitHub repos in #repos. One unauthenticated request per page
// load (GitHub allows ~60/hour per visitor).
(function () {
  var USER = 'Item135';
  var URL = 'https://api.github.com/users/' + USER + '/repos?sort=updated&per_page=12';
  var list = document.getElementById('repo-list');

  document.getElementById('year').textContent = new Date().getFullYear();

  function showMessage(text) {
    list.innerHTML = '';
    var p = document.createElement('p');
    p.className = 'status';
    p.textContent = text;
    list.appendChild(p);
  }

  // Built with textContent, never innerHTML, so repo data cannot inject markup.
  function repoCard(repo) {
    var card = document.createElement('article');
    card.className = 'card';

    var title = document.createElement('h3');
    title.textContent = repo.name;
    card.appendChild(title);

    var desc = document.createElement('p');
    desc.textContent = repo.description || 'No description provided.';
    card.appendChild(desc);

    var meta = document.createElement('div');
    meta.className = 'repo-meta';
    var lang = document.createElement('span');
    lang.textContent = repo.language || 'No language';
    var stars = document.createElement('span');
    stars.textContent = '★ ' + repo.stargazers_count;
    stars.setAttribute('aria-label', repo.stargazers_count + ' stars');
    meta.appendChild(lang);
    meta.appendChild(stars);
    card.appendChild(meta);

    var link = document.createElement('a');
    link.className = 'card-link';
    link.href = repo.html_url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'View on GitHub →';
    card.appendChild(link);

    return card;
  }

  fetch(URL, { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (repos) {
      if (!Array.isArray(repos) || repos.length === 0) {
        showMessage('No public repositories yet.');
        return;
      }
      list.innerHTML = '';
      repos.forEach(function (repo) { list.appendChild(repoCard(repo)); });
    })
    .catch(function () {
      showMessage('Could not load repositories right now. See them on GitHub: github.com/' + USER);
    });
})();
