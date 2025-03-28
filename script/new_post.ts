import { datetime } from "https://deno.land/x/ptera@v1.0.2/mod.ts";
import { parseArgs } from "jsr:@std/cli@1.0.15/parse-args";

const flags = parseArgs(Deno.args, {
    string: ["title", "body", "date"]
});

const title = flags.title;
console.log(`Title: ${title}`);
const body = flags.body || "";
console.log(`Body: ${body}`);

const dt = (() => {
    if (flags.date) {
        const d = datetime().toZonedTime("Asia/Tokyo");
        return d.parse(flags.date, "YYYYMMdd")
            .add({ hour: d.hour, minute: d.minute, second: d.second });
    } else {
        return datetime().toZonedTime("Asia/Tokyo");
    }
})();

const frontmatter = `---
title: "${title}"
date: ${dt.format("YYYY-MM-ddTHH:mm:ssZ")}
lastmod: ${dt.format("YYYY-MM-ddTHH:mm:ssZ")}
---
${body}
`;
const fileName = `./content/poetry/tanka/${dt.format("YYYYMMddHHmmss")}.md`;
await Deno.writeFile(fileName, new TextEncoder().encode(frontmatter));
