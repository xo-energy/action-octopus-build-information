jest.unmock("../src/util");

const { memoizeAsync } = require("../src/util");

test("exports function: memoizeAsync", () => {
  expect(memoizeAsync).toBeInstanceOf(Function);
});

describe("with no arguments", () => {
  test("wraps function", () => {
    expect(memoizeAsync(async () => true)).toBeInstanceOf(Function);
  });
  test("returns result", async () => {
    expect(await memoizeAsync(async () => true)()).toBe(true);
  });

  test("caches result", async () => {
    let i = 0;
    // eslint-disable-next-line no-return-assign
    const wrapper = memoizeAsync(async () => (i += 1));
    expect(await wrapper()).toBe(1);
    expect(await wrapper()).toBe(1);
  });
});

describe("with 1 argument", () => {
  const wrapper = memoizeAsync(async (key) => ({ key }));

  test("wraps function", () => {
    expect(wrapper).toBeInstanceOf(Function);
  });
  test("returns result", async () => {
    expect(await wrapper("key")).toStrictEqual({ key: "key" });
  });
  test("different keys have different results", async () => {
    expect(await wrapper("same")).not.toEqual(await wrapper("other"));
  });
  test("caches result with same key", async () => {
    expect(await wrapper("same")).toBe(await wrapper("same"));
  });
  test("caches result with multiple keys", async () => {
    expect(await wrapper("same")).toBe(await wrapper("same"));
    expect(await wrapper("other")).toBe(await wrapper("other"));
  });
});

describe("with 2 arguments", () => {
  const wrapper = memoizeAsync(async (key, value) => ({ [key]: value }));

  test("wraps function", () => {
    expect(wrapper).toBeInstanceOf(Function);
  });
  test("returns result", async () => {
    expect(await wrapper("sky", "blue")).toStrictEqual({ sky: "blue" });
  });
  test("different keys have different results", async () => {
    expect(await wrapper("sky", "blue")).not.toEqual(await wrapper("grass", "green"));
  });
  test("caches result with same key", async () => {
    expect(await wrapper("sky", "blue")).toBe(await wrapper("sky", "green"));
  });
  test("caches result with multiple keys", async () => {
    expect(await wrapper("sky", "blue")).toBe(await wrapper("sky", "blue"));
    expect(await wrapper("grass", "green")).toBe(await wrapper("grass", "green"));
  });
});
