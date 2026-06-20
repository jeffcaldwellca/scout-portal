import { describe, it, expect } from 'vitest';
import { FEATURES } from './features';
import { FAQ_ITEMS } from './faq';

describe('content data', () => {
  it('has at least 6 features each with title, blurb, icon', () => {
    expect(FEATURES.length).toBeGreaterThanOrEqual(6);
    for (const f of FEATURES) {
      expect(f.title.length).toBeGreaterThan(0);
      expect(f.blurb.length).toBeGreaterThan(0);
      expect(f.icon.length).toBeGreaterThan(0);
    }
  });
  it('has at least 6 FAQ items each with a question and answer', () => {
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(6);
    for (const it of FAQ_ITEMS) {
      expect(it.q.endsWith('?')).toBe(true);
      expect(it.a.length).toBeGreaterThan(0);
    }
  });
});
