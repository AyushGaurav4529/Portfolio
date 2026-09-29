// src/js/github.js
// Real-Time GitHub API Activity & Stats Fetcher

export async function fetchGitHubStats() {
  const reposEl = document.getElementById('gh-repos');
  const followersEl = document.getElementById('gh-followers');
  const followingEl = document.getElementById('gh-following');

  try {
    const res = await fetch('https://api.github.com/users/AyushGaurav4529');
    if (res.ok) {
      const data = await res.json();
      if (reposEl) reposEl.textContent = data.public_repos ?? '12+';
      if (followersEl) followersEl.textContent = data.followers ?? '15+';
      if (followingEl) followingEl.textContent = data.following ?? '20+';

      const statsSection = document.getElementById('github-activity');
      if (statsSection) {
        const statCards = statsSection.querySelectorAll('.text-2xl, .text-3xl');
        if (statCards.length >= 2) {
          statCards[0].textContent = `${data.public_repos}+ Public Repos`;
          statCards[1].textContent = `${data.followers || 15}+ Followers`;
        }
      }
    }
  } catch (err) {
    if (reposEl) reposEl.textContent = '10+';
    if (followersEl) followersEl.textContent = '12+';
    if (followingEl) followingEl.textContent = '18+';
  }
}
