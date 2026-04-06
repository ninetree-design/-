import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { PortfolioItem } from '@/src/constants';
import { usePortfolio } from '@/src/hooks/usePortfolio';
import { useConfig } from '@/src/hooks/useConfig';

export default function Portfolio() {
  const config = useConfig();
  const [filter, setFilter] = React.useState('All');
  const [selectedItem, setSelectedItem] = React.useState<PortfolioItem | null>(null);
  const { portfolio, loading } = usePortfolio();
  const categories = ['All', 'Logo design', 'print', 'web', 'etc'];

  const filteredItems = filter === 'All' 
    ? portfolio 
    : portfolio.filter(item => item.category === filter);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Portfolio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            {config.brandName}이 진행한 다양한 프로젝트 사례입니다. 각 브랜드의 가치를 극대화하기 위한 고민의 결과물을 확인해보세요.
          </motion.p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="px-6 py-2 bg-white text-gray-900 rounded-full text-sm font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    상세보기
                  </button>
                </div>
              </div>
              <div className="px-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{item.category}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-blue-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="w-full h-full overflow-auto rounded-xl">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6 text-center">
                <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">{selectedItem.category}</span>
                <h2 className="text-white text-2xl font-bold mt-2">{selectedItem.title}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
