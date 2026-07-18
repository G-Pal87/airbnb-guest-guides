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

## Register: use the informal "you" form, in every language

Politeness comes from warmth and courtesy, not from grammatical formality. Use the
informal singular "you" address consistently — never the formal/polite register —
across every string in every section (UI labels, house rules, things to do, check-in/
check-out notes, contact messages, everything).

| Language | Use (informal) | Not (formal) |
|---|---|---|
| French (`fr`) | tu / te / ton / ta / tes | vous / votre / vos |
| German (`de`) | du / dich / dir / dein | Sie / Ihnen / Ihr |
| Spanish (`es`) | tú / te / tu(s) | usted / su(s) |
| Greek (`el`) | εσύ / σου (singular) | εσείς / σας (formal) |
| Hungarian (`hu`) | te / neked / tiéd | Ön / Öntől / Magának |
| Polish (`pl`) | Ty / Twój (capitalized) | Pan / Pani |
| Russian (`ru`) | ты / тебя / твой (lowercase) | Вы / Вас / Ваш (capitalized formal) |

Polish already follows this house style (capitalized `Ty`/`Twój` is the standard warm,
polite-but-informal register in written Polish) — use it as the reference tone when in
doubt. Watch for and fix any register that mixes informal and formal forms within the
same language (this has happened in Spanish, e.g. informal `tu estancia` next to formal
`¿Necesita ayuda?`/`Contáctenos` — pick the informal form throughout).

## Structure

Never change JSON keys, nesting, or array order/length. Only the translated string
values change.
