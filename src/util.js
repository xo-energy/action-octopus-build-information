/**
 * Wraps an async function with a simple cache keyed by its first argument.
 * @param {function} func the async function to memoize
 * @returns {function} the async memoized wrapper
 */
function memoizeAsync(func) {
  const wrapper = async function (...args) {
    let [key] = args;
    let value;

    if (!key) key = false;
    if (!wrapper.cache.has(key)) {
      value = await func.apply(this, args);
      wrapper.cache.set(key, value);
    } else {
      value = wrapper.cache.get(key);
    }

    return value;
  };
  wrapper.cache = new Map();
  return wrapper;
}

export { memoizeAsync };
