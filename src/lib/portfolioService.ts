
import { PortfolioItem, initialPortfolio } from '../constants';
import { getImageUrl, deleteImage } from './storage';

const STORAGE_KEY = 'ninetree_portfolio';

export function getStoredPortfolio(): PortfolioItem[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored portfolio', e);
      return initialPortfolio;
    }
  }
  return initialPortfolio;
}

export function savePortfolio(items: PortfolioItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/**
 * Resolves virtual image URLs (IDs) to actual blob URLs.
 * This should be used in components that display portfolio images.
 */
export async function resolvePortfolioImages(items: PortfolioItem[]): Promise<PortfolioItem[]> {
  return Promise.all(
    items.map(async (item) => ({
      ...item,
      imageUrl: await getImageUrl(item.imageUrl)
    }))
  );
}

export async function removePortfolioItem(id: string, portfolio: PortfolioItem[]): Promise<PortfolioItem[]> {
  const item = portfolio.find(p => p.id === id);
  if (item && !item.imageUrl.startsWith('http')) {
    await deleteImage(item.imageUrl);
  }
  const newPortfolio = portfolio.filter(p => p.id !== id);
  savePortfolio(newPortfolio);
  return newPortfolio;
}
