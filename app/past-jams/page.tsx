import fs from 'node:fs';
import path from 'node:path';
import JamsView, { Jam } from './JamsView';

function loadJams(): Jam[] {
  const jamsDir = path.join(process.cwd(), 'content', 'jams');
  return fs
    .readdirSync(jamsDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(jamsDir, f), 'utf8')) as Jam)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export default function PastJams() {
  return <JamsView jams={loadJams()} />;
}
