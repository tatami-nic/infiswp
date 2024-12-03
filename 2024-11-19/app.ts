import { assert } from "@std/assert"; 
const dataPath = './nmap-datenfiles';

function parseDate(dateStr) {
    const p = dateStr.split('_');
    return new Date(`${p[0]}:${p[1]}:${p[2]}+${p[3]}:${p[4]}`);
}

async function main() {
    const csvFilePath = './output.csv'; // CSV output path

    try {
        // Open the CSV file for writing
        const file = await Deno.create(csvFilePath);
        const encoder = new TextEncoder();
        
        // Write the header row directly to the CSV file
        await file.write(encoder.encode("date,host,mac\n"));

        for await (const dirEntry of Deno.readDir(dataPath)) {
            if (!dirEntry.isFile) continue;

            let date;
            try {
                date = parseDate(dirEntry.name);
            } catch (err) {
                console.error('Error parsing date:', dirEntry.name, err.message);
                continue;
            }

            const filePath = `${dataPath}/${dirEntry.name}`;
            const lines = (await Deno.readTextFile(filePath)).split('\n');

            for (const line of lines) {
                if (line.trim() === '' || line.startsWith('Starting Nmap') ||
                    line.startsWith('Nmap done') || line.startsWith('Host is up')) {
                    continue;
                }
                if (line.startsWith('Nmap scan report for ')) {
                    var host = line.split(' ')[4].replace(/\r/g, '');
                }
                if (line.startsWith('MAC Address: ')) {
                    const mac = line.split(' ')[2].toLowerCase();
                    const row = `${date.toISOString()},${host},${mac}\n`;

                    // Write each row directly to the file
                    await file.write(encoder.encode(row));
                }
            }
        }

        // Close the file when done
        file.close();
        console.log(`CSV file written to ${csvFilePath}`);
    } catch (err) {
        console.error('Error processing files:', err);
    }
}

await main();
