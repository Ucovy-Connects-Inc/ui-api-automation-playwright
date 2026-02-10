
export async function extractCandidateSelectors(elementHandle: any) {
  const attributes = await elementHandle.evaluate((el: HTMLElement) => {
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id,
      classes: Array.from(el.classList),
      text: el.innerText?.trim(),
      role: el.getAttribute('role'),
      ariaLabel: el.getAttribute('aria-label')
    };
  });

  const selectors: string[] = [];

  if (attributes.id) selectors.push(`#${attributes.id}`);
  if (attributes.classes?.length)
    selectors.push(`${attributes.tag}.${attributes.classes.join('.')}`);
  if (attributes.text)
    selectors.push(`text=${attributes.text}`);
  if (attributes.ariaLabel)
    selectors.push(`[aria-label="${attributes.ariaLabel}"]`);
  if (attributes.role)
    selectors.push(`[role="${attributes.role}"]`);

  return selectors;
}
