const { execSync } = require('child_process');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

// Load local .env file
const localEnvPath = path.resolve(__dirname, '.env');
const localEnv = dotenv.parse(fs.readFileSync(localEnvPath));

let vercelKeys = [];
try {
  const result = execSync(`vercel env ls`).toString();
  const lines = result.split('\n').filter((line) => line.trim() !== '');
  lines.forEach((line, i) => {
    if (i > 0) {
      const [name, value, environments, created] = line.split(/\s{2,}/);
      if (name) {
        vercelKeys.push(name.trim());
      }
    }
  });
} catch (error) {
  console.error('Error fetching Vercel environment variables:', error.message);
  process.exit(1);
}

// Compare local and Vercel environment variables
const localKeys = Object.keys(localEnv);
for (const localkey of localKeys) {
  if (!vercelKeys.includes(localkey)) {
    console.log('Variables missing in Vercel project:', localkey);
    return;
  }
}
for (const vericelkey of vercelKeys) {
  if (!localKeys.includes(vericelkey)) {
    console.log('Variables missing in local project:', vericelkey);
    return;
  }
}
console.log(
  'Local .env file of NextJS project (back) is conform to the deployed Vercel project and vice-versa.',
);
