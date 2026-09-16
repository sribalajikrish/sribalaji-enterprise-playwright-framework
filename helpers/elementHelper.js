export async function clickElement(locator) {
  await locator.click();
}

export async function fillElement(locator, value) {
  await locator.fill(value);
}