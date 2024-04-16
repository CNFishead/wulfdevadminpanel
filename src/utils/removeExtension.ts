/**
 * @description takes in a string, and removes the extension from the string while maintaining the rest of the string
 *              if the string does not have an extension then it returns the string as is
 * @param {String} string - the string to check
 * @returns {String} - returns the string without the extension
 * @throws {Error} - throws an error if the string is not a string
 * @throws {Error} - throws an error if the string is empty
 * 
 * @example removeExtension('test.mp4') // returns 'test'
 * @example removeExtension('test') // returns 'test'
 * @example removeExtension('test.') // returns 'test.'
 * @example removeExtension('test.mp4.mp4') // returns 'test.mp4'
 * @example removeExtension('test1.2.mp4') // returns 'test1.2'
 * 
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 */
export default (string: string) => {
  if (typeof string !== 'string') throw new Error('string must be a string');
  if (string === '') throw new Error('string cannot be empty');
  const regex = /\.(mp4|mov|avi|wmv|flv|webm|mkv|mpg|mpeg|3gp)$/;
  return regex.test(string) ? string.split('.').slice(0, -1).join('.') : string;
};