// src/js/github.js
// Real-Time GitHub API Activity & Stats Fetcher (Cached Serverless Consumer with Fallback)

export async function fetchGitHubStats() {
  const reposEl = document.getElementById('gh-repos');
  const followersEl = document.getElementById('gh-followers');
  const followingEl = document.getElementById('gh-following');

  let statsData = null;

  // 1. Primary Attempt: Cached Serverless Function Endpoint
  try {
    const apiRes = await fetch('/api/github-stats');
    if (apiRes.ok) {
      statsData = await apiRes.json();
    }
  } catch (apiErr) {
    // Serverless endpoint offline in local static dev
  }

  // 2. Secondary Fallback: Direct GitHub API
  if (!statsData) {
    try {
      const ghRes = await fetch('https://api.github.com/users/AyushGaurav4529');
      if (ghRes.ok) {
        statsData = await ghRes.json();
      }
    } catch (ghErr) {
      console.warn('Direct GitHub API fetch issue:', ghErr);
    }
  }

  // 3. Render Stats to DOM
  if (statsData) {
    const repos = statsData.public_repos ?? '14+';
    const followers = statsData.followers ?? '18+';
    const following = statsData.following ?? '22+';

    if (reposEl) reposEl.textContent = repos;
    if (followersEl) followersEl.textContent = followers;
    if (followingEl) followingEl.textContent = following;

    const statsSection = document.getElementById('github-activity');
    if (statsSection) {
      const statCards = statsSection.querySelectorAll('.text-2xl, .text-3xl');
      if (statCards.length >= 2) {
        statCards[0].textContent = `${repos} Public Repos`;
        statCards[1].textContent = `${followers} Followers`;
      }
    }
  } else {
    // Safe defaults
    if (reposEl) reposEl.textContent = '14+';
    if (followersEl) followersEl.textContent = '18+';
    if (followingEl) followingEl.textContent = '22+';
  }
}
