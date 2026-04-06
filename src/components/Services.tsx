import React from 'react';
import { motion } from 'motion/react';
import { Palette, Monitor, Briefcase, CheckCircle2 } from 'lucide-react';
import { initialServices, ServiceItem } from '@/src/constants';
import { useConfig } from '@/src/hooks/useConfig';

export default function Services() {
  const config = useConfig();
  const [services, setServices] = React.useState<ServiceItem[]>(initialServices);

  React.useEffect(() => {
    const saved = localStorage.getItem('ninetree_services');
    if (saved) {
      try {
        setServices(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse services', e);
      }
    }
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {config.brandName}은 브랜드의 시작부터 성장까지 함께하는 통합 디자인 솔루션을 제공합니다.
          </p>
        </div>

        {/* Detailed Services */}
        <div className="space-y-24">
          {services.map((service, index) => {
            const checklists = [
              ["1:1 맞춤형 컨설팅 및 기획", "창의적 디자인", "친절한 상담"],
              ["1:1 맞춤형 컨설팅 및 기획", "창의적 디자인", "원본파일 및 가이드 북 제공", "친절한 상담"],
              ["빠른 인쇄 및 배송", "깔끔하고 정확한 인쇄물"]
            ];
            const currentChecklist = checklists[index] || [];

            return (
              <div 
                key={service.id} 
                className={`flex flex-col lg:items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                <div className="flex-1">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                    {index === 0 && <Palette className="w-8 h-8 text-blue-600" />}
                    {index === 1 && <Monitor className="w-8 h-8 text-blue-600" />}
                    {index === 2 && <Briefcase className="w-8 h-8 text-blue-600" />}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{service.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {service.description} {config.brandName}만의 축적된 노하우와 최신 트렌드를 반영하여 최상의 결과물을 보장합니다.
                  </p>
                  <div className="space-y-4 mb-8">
                    {currentChecklist.map((item, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  {service.price && (
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 inline-block">
                      <span className="text-sm text-gray-500 block mb-1">시작 가격</span>
                      <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <img
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1499951360447-b19be8fe80f5' : index === 1 ? '1561070791-2526d30994b5' : '1434626881859-194d67b2b86f'}?auto=format&fit=crop&q=80&w=1000`}
                    alt={service.title}
                    className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="mt-32 py-20 bg-gray-900 rounded-3xl px-8 md:px-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-16">작업 프로세스</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: '상담 및 기획', desc: '요구사항 분석 및 컨셉 설정' },
              { step: '02', title: '디자인 시안', desc: '전문 디자이너의 시안 제작' },
              { step: '03', title: '피드백 및 수정', desc: '고객 의견 반영 및 디테일 조정' },
              { step: '04', title: '최종 납품', desc: '' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-black text-white/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
