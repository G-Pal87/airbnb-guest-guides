#!/usr/bin/env node
/**
 * Syncs master-managed fields from master-tenerife.json / master-cyprus.json
 * into each matching property file.
 *
 * Replace fields: thingsToDo, houseRules, gettingAround, emergency
 *   — entire array/object replaced with the master version.
 *
 * Partial object fields: gettingHere
 *   — sub-keys synced from master EXCEPT directionPhotos and directionPhotosBus,
 *     which are property-specific (different door/entrance per unit).
 *
 * Merge fields: appliances
 *   — matched by name; master entries update matching property entries.
 *   — property-specific entries (e.g. BBQ, Magical Terrace) are preserved.
 *   — new entries in the master are appended.
 *
 * Property-specific fields (never touched): id, name, address, wifi, checkin,
 *   gettingHere, checkout, host, cohost, heroImage, etc.
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

const REPLACE_FIELDS = ['thingsToDo', 'houseRules', 'gettingAround', 'emergency'];
const PARTIAL_OBJECT_FIELDS = { gettingHere: ['directionPhotos', 'directionPhotosBus'] };
const MERGE_BY_NAME_FIELDS = ['appliances'];

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

    for (const field of REPLACE_FIELDS) {
      if (field in master) {
        const before = JSON.stringify(property[field]);
        const after = JSON.stringify(master[field]);
        if (before !== after) {
          property[field] = master[field];
          updated = true;
        }
      }
    }

    for (const [field, excludeKeys] of Object.entries(PARTIAL_OBJECT_FIELDS)) {
      if (!(field in master)) continue;
      const propObj = property[field] ?? {};
      let fieldUpdated = false;
      for (const [k, v] of Object.entries(master[field])) {
        if (excludeKeys.includes(k)) continue;
        if (JSON.stringify(propObj[k]) !== JSON.stringify(v)) {
          propObj[k] = v;
          fieldUpdated = true;
        }
      }
      if (fieldUpdated) {
        property[field] = propObj;
        updated = true;
      }
    }

    for (const field of MERGE_BY_NAME_FIELDS) {
      if (!(field in master)) continue;
      const propList = property[field] ?? [];
      const masterList = master[field];
      let fieldUpdated = false;
      for (const masterEntry of masterList) {
        const idx = propList.findIndex(e => e.name === masterEntry.name);
        if (idx === -1) {
          propList.push(masterEntry);
          fieldUpdated = true;
        } else if (JSON.stringify(propList[idx]) !== JSON.stringify(masterEntry)) {
          propList[idx] = masterEntry;
          fieldUpdated = true;
        }
      }
      if (fieldUpdated) {
        property[field] = propList;
        updated = true;
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
