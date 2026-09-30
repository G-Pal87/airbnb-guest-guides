# Translation tone guidelines

These rules apply to every translated guest guide in `src/data/translations/*.json`,
across both templates (Tenerife and Cyprus) and all properties.

## Source of truth

English is the base language. The English content lives in `src/data/properties/*.json`
(and is shared/synced from `src/data/master-tenerife.json` / `src/data/master-cyprus.json`
for certain sections — see `scripts/sync-from-master.js`). Every translation must stay
faithful in meaning to the English source. Never invent facts; only adapt tone.

Always preserve exactly, in every language: host/co-host names, phone numbers, WhatsApp
numbers, emails, door/access codes, WiFi details, addresses, times, distances, and place
names. Only the surrounding language changes — never the facts.

## Target tone

Casual, polite, warm, and welcoming — never stiff, bureaucratic, or corporate. A guest
reading a house rule or a "how to get here" note should feel like a friendly host is
personally talking to them, not like they're reading a policy document.

- Short, natural sentences. Contractions/informal phrasing where the language allows it.
- Exclamation points used sparingly for genuine warmth (welcomes, thank-yous), not on
  every line.
- House rules phrased as friendly requests ("Please just smoke outside — thanks so
  much!"), not legal notices.
- Keep any existing gender-neutral notation for the host (e.g. Polish `wdzięczny/-a`)
  where the host's gender isn't fixed by the template.

## Register: how to address the guest, per language

Politeness comes from warmth and courtesy, not from grammatical formality. Each
language uses exactly one form of "you", the same in all 5 guides and in every string
(UI labels, house rules, things to do, check-in/check-out notes, contact messages,
everything). Never mix forms within a language, and never use the formal/polite
register (Sie, usted, Ön, Pan/Pani).

| Language | Use | Examples | Never |
|---|---|---|---|
| German (`de`) | informal singular: du / dich / dir / dein | "Folge dem Weg", "Genieß deinen Aufenthalt!" | ihr / euch, Sie / Ihnen |
| Spanish (`es`) | informal singular: tú / te / tu(s) | "Sigue recto", "Disfruta de tu estancia" | vosotros / os, usted / su |
| Hungarian (`hu`) | informal singular: te | "Fordulj jobbra", "Érezd jól magad!" | ti (-tok/-tek), Ön / Maga |
| French (`fr`) | plural: vous / votre / vos | "Tournez à gauche", "Profitez bien de votre séjour !" | tu / ton |
| Polish (`pl`) | plural, capitalised: Wy / Was / Wam / Wasz | "Skręćcie w lewo", "Życzymy Wam udanego pobytu!" | Ty / Twój, Pan / Pani |
| Russian (`ru`) | plural: вы / вас / ваш (lowercase) | "Поверните налево", "Приятного вам отдыха!" | ты / твой |
| Greek (`el`) | plural: εσείς / σας | "Προχωρήστε μπροστά", "Ξεκλειδώστε την πόρτα" | εσύ / σου, "Προχώρα" |
| Ukrainian (`uk`) | informal singular: ти / тебе / твій (lowercase) | "Поверни ліворуч" | Ви / Вас |
| Hebrew (`he`) | keep the existing form of each guide (plural אתם in the Cyprus guides, slashed singular את/ה in the Tenerife guides) | "פתחו", "תוכל/י" | mixing within a guide |

## Translate the meaning, not the words

Write what a local host would naturally say, not a word-by-word copy of the English.
Jokes, idioms and asides that don't work in the target language should be rephrased
or dropped (e.g. "hello rain, wind and sunshine" is not "γεια σου βροχή", but
"βροχή, αέρας και λιακάδα"). Use local, natural names for places where one exists
(Teide-Nationalpark, Parc national du Teide), and keep the same name for the same
place everywhere in a language. "Avlida" is the AVLIDA Hotel, not a town.

The host's gender matters in languages that mark it: the Tenerife guides are hosted by
Rita (female); the Cyprus guides by Giorgos (male), with Rita as co-host (female).

## Structure

Never change JSON keys, nesting, or array order/length. Only the translated string
values change.
