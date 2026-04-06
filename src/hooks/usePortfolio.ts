
import React from 'react';
import { PortfolioItem } from '../constants';
import { getStoredPortfolio, resolvePortfolioImages } from '../lib/portfolioService';

export function usePortfolio() {
  const [portfolio, setPortfolio] = React.useState<PortfolioItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  const loadPortfolio = React.useCallback(async () => {
    setLoading(true);
    const stored = getStoredPortfolio();
    // Sort by newest
    const sorted = [...stored].sort((a, b) => b.createdAt - a.createdAt);
    const resolved = await resolvePortfolioImages(sorted);
    setPortfolio(resolved);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  return { portfolio, loading, refresh: loadPortfolio };
}
