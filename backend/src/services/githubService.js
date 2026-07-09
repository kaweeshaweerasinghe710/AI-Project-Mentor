const axios = require('axios');


function parseGithubUrl(url) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) {
    throw new Error('Invalid GitHub repository URL');
  }
  const owner = match[1];
  const repo = match[2].replace(/\.git$/, '');
  return { owner, repo };
}



async function getDefaultBranch(owner, repo, token) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  return response.data.default_branch || 'main';
}




async function getFileTree(owner, repo, branch, token) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
    { headers }
  );

  return response.data.tree || [];
}




async function getFileContent(owner, repo, branch, filePath) {
  const response = await axios.get(
    `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`,
    { responseType: 'text' }
  );
  return response.data;
}


async function fetchRepoFiles(repoUrl) {
  const { owner, repo } = parseGithubUrl(repoUrl);
  const token = process.env.GITHUB_TOKEN; // Optional GitHub Token
  const defaultBranch = await getDefaultBranch(owner, repo, token);
  const tree = await getFileTree(owner, repo, defaultBranch, token);
  const allowedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.go', '.rs', '.java', '.c', '.cpp', '.cs', '.html', '.css'];
  const ignoredPaths = ['node_modules/', '.git/', '.next/', 'dist/', 'build/', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
  const filteredTree = tree.filter(item => {
    if (item.type !== 'blob') return false; 
    const isIgnored = ignoredPaths.some(ignored => item.path.includes(ignored));
    const hasAllowedExtension = allowedExtensions.some(ext => item.path.endsWith(ext));
    return !isIgnored && hasAllowedExtension;
  });

 
  const filesToFetch = filteredTree.slice(0, 40);
  const fileContents = [];

  for (const file of filesToFetch) {
    try {
      const content = await getFileContent(owner, repo, defaultBranch, file.path);
      if (content.length < 50000) {
        fileContents.push({
          path: file.path,
          content: content
        });
      }
      await new Promise(resolve => setTimeout(resolve, 80));
    } catch (err) {
      console.warn(`Failed to fetch content for ${file.path}:`, err.message);
    }
  }
  return {
    repoName: repo,
    files: fileContents
  };
}



module.exports = {
  fetchRepoFiles
};