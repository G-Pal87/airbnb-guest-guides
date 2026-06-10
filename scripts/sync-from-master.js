#!/usr/bin/env node
/**
 * Syncs master-managed fields from master-tenerife.json / master-cyprus.json
 * into each matching property file.
 *
 * Master-managed fields: thingsToDo, houseRules, gettingAround, emergency
 * Property-specific fields (never touched): id, name, address, wifi, checkin,
 *   gettingHere, appliances, checkout, host, cohost, heroImage, etc.
 *
 * Usage:
 *   node scripts/sync-from-master.js           # sync all properties
 *   node scripts/sync-from-master.js tenerife  # sync only Tenerife properties
 *   node scripts/sync-from-master.js cyprus    # sync only Cyprus properties
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(new URL('.', import.meta.url).pathname, '..');
const DATA = join(ROOT, 'src/data');

const PROPERTIES = {
  tenerife: ['beach-side-studio', 'two-bedroom'],
  cyprus: ['luxe-poolside-escape', 'poolside-central-studio', 'venus-beach-retreat'],
};

const MASTER_FIELDS = ['thingsToDo', 'houseRules', 'gettingAround', 'emergency'];

const filter = process.argv[2]; // optional: 'tenerife' or 'cyprus'

let changed = 0;

for (const [location, ids] of Object.entries(PROPERTIES)) {
  if (filter && filter !== location) continue;

  const masterPath = join(DATA, `master-${location}.json`);
  const master = JSON.parse(readFileSync(masterPath, 'utf-8'));

  for (const id of ids) {
    const propPath = join(DATA, 'properties', `${id}.json`);
    const property = JSON.parse(readFileSync(propPath, 'utf-8'));

    let updated = false;
    for (const field of MASTER_FIELDS) {
      if (field in master) {
        const before = JSON.stringify(property[field]);
        const after = JSON.stringify(master[field]);
        if (before !== after) {
          property[field] = master[field];
          updated = true;
        }
      }
    }

    if (updated) {
      writeFileSync(propPath, JSON.stringify(property, null, 2) + '\n', 'utf-8');
      console.log(`  ✓ Updated ${id}`);
      changed++;
    } else {
      console.log(`  — No changes for ${id}`);
    }
  }
}

console.log(`\nSync complete. ${changed} file(s) updated.`);
