
import { Database } from "@db/sqlite"
import { assert } from "@std/assert";
const dataPath = './nmap-datenfiles';
const db = new Database ("nmap_data.db");
const outputFilePath = 'Zeit.csv';



function parseDate(dateStr: string): Date {
    const p = dateStr.split('_');
    return new Date(`${p[0]}:${p[1]}:${p[2]}+${p[3]}:${p[4]}`);
}

async function main() {
    try {
        const dirEntries = await Deno.readDir(dataPath);
        for await (const dirEntry of dirEntries) {
            if (!dirEntry.isFile) {
                continue;
            }
            let date;
            try {
                date = parseDate(dirEntry.name);
            } catch (err) {
                assert(err instanceof Error);
                console.error('Error parsing date:', dirEntry.name, err.message);
                continue;
            }
            const filePath = `${dataPath}/${dirEntry.name}`;
            let host = undefined;
            let mac = undefined;
            for (const cleanline of (await Deno.readTextFile(filePath)).split('\n')) {
                const cleanline = line.replace(/\r/g, '');
                if (cleanline.trim() === '' || cleanline.startsWith('Starting Nmap')
                    || cleanline.startsWith('Nmap done') || cleanline.startsWith('Host is up')) {
                    continue;
                }
                if (cleanline.startsWith('Nmap scan report for ')) {
                    host = cleanline.split(' ')[4];
                    continue;
                }
                if (cleanline.startsWith('MAC Address: ')) {
                    mac = cleanline.split(' ')[2].toLowerCase();
                    console.log(`${date.toISOString()};${host};${mac}`);
                }
            }
        }
        await Deno.writeTextfile(outputFilePath, outputData);
    } catch (err) {
        console.error('Error reading the file:', err);
    }
}
await main();;