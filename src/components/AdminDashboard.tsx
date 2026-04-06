import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Layout, Briefcase, Save, Plus, Trash2, Upload, X, Edit2, Image as ImageIcon } from 'lucide-react';
import { initialConfig, initialServices, PortfolioItem, ServiceItem, SiteConfig } from '@/src/constants';
import { saveImage, deleteImage, getImageUrl } from '@/src/lib/storage';
import { getStoredPortfolio, savePortfolio } from '@/src/lib/portfolioService';
import { useConfigContext } from '@/src/context/ConfigContext';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/800x600?text=No+Image';

export default function AdminDashboard() {
  const { config, updateConfig } = useConfigContext();
  const [activeTab, setActiveTab] = React.useState('general');
  const [settings, setSettings] = React.useState<SiteConfig>(config);
  const [portfolio, setPortfolio] = React.useState<PortfolioItem[]>([]);
  const [services, setServices] = React.useState<ServiceItem[]>(initialServices);
  const [isAddingProject, setIsAddingProject] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<PortfolioItem | null>(null);
  const [resolvedImages, setResolvedImages] = React.useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = React.useState<Partial<PortfolioItem>>({
    title: '',
    category: 'Logo design',
    description: '',
    imageUrl: ''
  });

  React.useEffect(() => {
    const storedPortfolio = getStoredPortfolio();
    setPortfolio(storedPortfolio);
    
    // Sync local settings state with context config
    setSettings(config);

    // Load services from localStorage if exists
    const storedServices = localStorage.getItem('ninetree_services');
    if (storedServices) setServices(JSON.parse(storedServices));
  }, [config]);

  // Resolve virtual URLs to blob URLs for display
  React.useEffect(() => {
    const resolve = async () => {
      const newResolved: Record<string, string> = {};
      for (const item of portfolio) {
        if (item.imageUrl.startsWith('img-')) {
          newResolved[item.imageUrl] = await getImageUrl(item.imageUrl);
        } else {
          newResolved[item.imageUrl] = item.imageUrl || PLACEHOLDER_IMAGE;
        }
      }
      setResolvedImages(newResolved);
    };
    resolve();
  }, [portfolio]);

  const handleSave = () => {
    updateConfig(settings);
    localStorage.setItem('ninetree_services', JSON.stringify(services));
    savePortfolio(portfolio);
    alert('저장되었습니다');
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageId = await saveImage(file);
      setFormData(prev => ({ ...prev, imageUrl: imageId }));
      // Also update resolved images for preview
      const url = await getImageUrl(imageId);
      setResolvedImages(prev => ({ ...prev, [imageId]: url }));
    } catch (error) {
      console.error('Image upload failed', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const handleAddOrUpdateProject = () => {
    if (!formData.title) return alert('제목을 입력해주세요.');

    if (editingProject) {
      const updatedPortfolio = portfolio.map(p => 
        p.id === editingProject.id ? { ...p, ...formData } : p
      );
      setPortfolio(updatedPortfolio);
      setEditingProject(null);
    } else {
      const newProject: PortfolioItem = {
        id: Date.now().toString(),
        title: formData.title || '',
        category: formData.category || 'Logo design',
        description: formData.description || '',
        imageUrl: formData.imageUrl || '',
        createdAt: Date.now()
      };
      setPortfolio([newProject, ...portfolio]);
      setIsAddingProject(false);
    }
    setFormData({ title: '', category: 'Logo design', description: '', imageUrl: '' });
  };

  const deletePortfolio = async (id: string) => {
    if (!confirm('정말 이 프로젝트를 삭제하시겠습니까?')) return;
    
    const item = portfolio.find(p => p.id === id);
    if (item && item.imageUrl.startsWith('img-')) {
      await deleteImage(item.imageUrl);
    }
    setPortfolio(portfolio.filter(item => item.id !== id));
  };

  const handleImageChange = async (id: string, file: File) => {
    const imageId = await saveImage(file);
    const updatedPortfolio = portfolio.map(p => 
      p.id === id ? { ...p, imageUrl: imageId } : p
    );
    setPortfolio(updatedPortfolio);
  };

  const removeImage = async (id: string) => {
    const item = portfolio.find(p => p.id === id);
    if (item && item.imageUrl.startsWith('img-')) {
      await deleteImage(item.imageUrl);
    }
    const updatedPortfolio = portfolio.map(p => 
      p.id === id ? { ...p, imageUrl: '' } : p
    );
    setPortfolio(updatedPortfolio);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900">관리자 패널</h2>
          <p className="text-xs text-gray-500 mt-1">Nine Tree Design Admin</p>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'general' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>일반 설정</span>
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'portfolio' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Layout className="w-5 h-5" />
            <span>포트폴리오 관리</span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'services' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>서비스 관리</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === 'general' && '일반 설정'}
              {activeTab === 'portfolio' && '포트폴리오 관리'}
              {activeTab === 'services' && '서비스 관리'}
            </h1>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold"
            >
              <Save className="w-4 h-4" />
              <span>저장하기</span>
            </button>
          </div>

          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">브랜드명</label>
                  <input
                    type="text"
                    value={settings.brandName}
                    onChange={(e) => setSettings({...settings, brandName: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">슬로건</label>
                  <input
                    type="text"
                    value={settings.slogan}
                    onChange={(e) => setSettings({...settings, slogan: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">연락처 이메일</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">연락처 전화번호</label>
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">회사 소개 텍스트</label>
                <textarea
                  rows={4}
                  value={settings.aboutText}
                  onChange={(e) => setSettings({...settings, aboutText: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* Portfolio Management */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setIsAddingProject(true);
                    setEditingProject(null);
                    setFormData({ title: '', category: 'Logo design', description: '', imageUrl: '' });
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>새 프로젝트 추가</span>
                </button>
              </div>

              {/* Add/Edit Form */}
              <AnimatePresence>
                {(isAddingProject || editingProject) && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-900">
                        {editingProject ? '프로젝트 수정' : '새 프로젝트 추가'}
                      </h3>
                      <button onClick={() => { setIsAddingProject(false); setEditingProject(null); }} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
                            placeholder="프로젝트 제목"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">카테고리</label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
                          >
                            <option value="Logo design">Logo design</option>
                            <option value="web">web</option>
                            <option value="print">print</option>
                            <option value="etc">etc</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">설명</label>
                          <textarea
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                            placeholder="프로젝트 상세 설명"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">대표 이미지</label>
                        <div 
                          className="relative aspect-[4/3] border-2 border-dashed border-gray-200 rounded-xl overflow-hidden group cursor-pointer hover:border-blue-400 transition-colors"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file) handleImageUpload(file);
                          }}
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          {formData.imageUrl ? (
                            <img src={resolvedImages[formData.imageUrl] || formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                              <Upload className="w-8 h-8 mb-2" />
                              <span className="text-xs font-medium">이미지 업로드 (Drag & Drop)</span>
                            </div>
                          )}
                          <input 
                            id="file-upload"
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
                        className="px-6 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={handleAddOrUpdateProject}
                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {editingProject ? '수정 완료' : '프로젝트 추가'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 gap-6">
                {portfolio.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="relative w-full md:w-32 aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 group">
                      <img 
                        src={resolvedImages[item.imageUrl] || item.imageUrl || PLACEHOLDER_IMAGE} 
                        alt="" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) handleImageChange(item.id, file);
                            };
                            input.click();
                          }}
                          className="p-2 bg-white rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
                          title="이미지 변경"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => removeImage(item.id)}
                          className="p-2 bg-white rounded-full hover:bg-red-50 text-red-600 transition-colors"
                          title="이미지 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider px-2 py-0.5 bg-blue-50 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingProject(item);
                          setFormData({
                            title: item.title,
                            category: item.category,
                            description: item.description,
                            imageUrl: item.imageUrl
                          });
                          setIsAddingProject(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="수정"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deletePortfolio(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Management */}
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => {
                        const newServices = services.map(s => s.id === service.id ? {...s, title: e.target.value} : s);
                        setServices(newServices);
                      }}
                      className="text-xl font-bold text-gray-900 bg-transparent border-b border-transparent focus:border-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      value={service.price}
                      onChange={(e) => {
                        const newServices = services.map(s => s.id === service.id ? {...s, price: e.target.value} : s);
                        setServices(newServices);
                      }}
                      className="text-blue-600 font-bold text-right bg-transparent border-b border-transparent focus:border-blue-500 outline-none"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={service.description}
                    onChange={(e) => {
                      const newServices = services.map(s => s.id === service.id ? {...s, description: e.target.value} : s);
                      setServices(newServices);
                    }}
                    className="w-full text-gray-600 text-sm bg-transparent border-b border-transparent focus:border-blue-500 outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
