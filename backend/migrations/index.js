import { promises as fs } from "fs";
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default async function migrations(client) {
    const files = await fs.readdir(__dirname);
    const migrations = files.filter(f => f !== "index.js").map(f => parseInt(f.replace(/\.js$/, ""))).sort();

    console.log("все миграции", migrations);

    let applied = [];
    try {
        const list = await client.query("select id from public.migrations");
        applied = list.rows.map(r => r.id).map(e => parseInt(e)).sort();
    } catch {
        applied = [];
    }
    console.log("применённые миграции", applied);

    const rest = migrations.filter(f => !applied.includes(f));

    for (let i = 0; i < rest.length; ++i) {
        console.log('apply migration ', rest[i]);
        const obj = await import('./'+ rest[i] +'.js');
        const migration = obj.default;
        await migration(client);
    }

    console.log("новые миграции применены");
}
