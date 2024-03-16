export default function limit(text, maxLength = 50) {
    if (text.length <= maxLength) {
        return text;
    } else {
        const lastSpaceIndex = text.lastIndexOf(" ", maxLength);
        const truncatedText = lastSpaceIndex !== -1 ? text.substring(0, lastSpaceIndex) : text.substring(0, maxLength);
        return `${truncatedText}...`;
    }
}