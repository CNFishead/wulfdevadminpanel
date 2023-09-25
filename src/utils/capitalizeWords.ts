/**
 * @description - Capitalize the first letter of each word in a string
 * @param {string} words - string of words
 * @returns {string} - string of words with first letter of each word capitalized
 *
 * @author Austin Howard
 * @version 1.0.0
 * @since 1.0.0
 *
 */
export default (words: string) => {
  if (typeof words !== 'string') return '';
  // Split string into array of words
  const camelCaseWords = words.split(/(?=[A-Z])/);
  const spaceSeparatedWords = words.split(' ');

  // Check if the array of words is camelCase
  if (camelCaseWords.length > 0) {
    // Capitalize first letter of each word
    return camelCaseWords
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }
  // else if the array of words is space separated
  if (spaceSeparatedWords.length > 0) {
    // Capitalize first letter of each word
    return spaceSeparatedWords
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }
};
