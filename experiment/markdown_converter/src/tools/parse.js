export function parseMarkdown(markdown) {
    const splitMarkdown = markdown.split("\n");
    return splitMarkdown.map(element => element + "<br/>");
}
