function test(...args: any[]) {
  console.log(args);
}

test('10', 2);
test(10, false, "200");
test();