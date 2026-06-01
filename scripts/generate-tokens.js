import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tokensPath = join(__dirname, '../src/data/tokens.json');

function generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 8; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

const existing = JSON.parse(readFileSync(tokensPath, 'utf-8'));

// Build a map of propertyId -> old token (for display)
const propertyToOldToken = {};
for (const [token, propertyId] of Object.entries(existing)) {
  propertyToOldToken[propertyId] = token;
}

// Generate new unique tokens for each property
const propertyIds = Object.values(existing);
const newTokens = {};
const usedTokens = new Set();

for (const propertyId of propertyIds) {
  let token;
  do {
    token = generateToken();
  } while (usedTokens.has(token));
  usedTokens.add(token);
  newTokens[token] = propertyId;
}

writeFileSync(tokensPath, JSON.stringify(newTokens, null, 2) + '\n');

console.log('\nNew tokens generated successfully!\n');
for (const [token, propertyId] of Object.entries(newTokens)) {
  const propertyName = propertyId
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  console.log(`New URL for ${propertyName}: /guide/${token}`);
}
console.log('\ntokens.json updated.\n');
