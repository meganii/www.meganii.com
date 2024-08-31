const now = new Date();

// 日時をフォーマットするための関数
const formatDate = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

const timestamp = formatDate(now);
const fileName = `./content/poetry/tanka/${timestamp}.md`;
const textContent = `これは${fileName}に書き込まれたテキストです。\n`;

await Deno.writeFile(fileName, new TextEncoder().encode(textContent));
