import { datetime } from "https://deno.land/x/ptera@v1.0.2/mod.ts";
import { parse } from "https://deno.land/std@0.100.0/flags/mod.ts";

const options = parse(Deno.args);
const dt  = datetime().toZonedTime("Asia/Tokyo");

const title = options["title"];
console.log(`Title: ${title}`);
const body = options["body"] || "";
console.log(`Body: ${body}`);

const frontmatter = `---
title: ${title}
date: ${dt.format("YYYY-MM-ddTHH:mm:ssZ")}
lastmod: ${dt.format("YYYY-MM-ddTHH:mm:ssZ")}
---
${body}
`;
const fileName = `./content/poetry/tanka/${dt.format("YYYYMMddHHmmss")}.md`;
await Deno.writeFile(fileName, new TextEncoder().encode(frontmatter));
