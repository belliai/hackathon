/**
 * Converts a string to a slug by removing accents, non-alphanumeric characters,
 * and replacing spaces with hyphens.
 * 
 * @param str - The string to be slugified.
 * @returns The slugified string.
 */
export function slugify(str: string) {
    return String(str)
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}