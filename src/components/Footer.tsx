import { Instagram, MessageCircle, ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '@/src/hooks/useConfig';

export default function Footer() {
  const config = useConfig();
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-white mb-6">
              <span className="text-xl font-bold">{config.brandName}</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              {config.slogan}
            </p>
            <div className="flex space-x-4">
              <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors" title="인스타그램">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={config.kakaoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors" title="카카오톡">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href={config.smartStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors" title="스마트스토어">
                <ShoppingBag className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">포트폴리오</Link></li>
              <li><Link to="/services" className="hover:text-blue-500 transition-colors">서비스 안내</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition-colors">문의하기</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>{config.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>{config.contactPhone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>{config.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Nine Tree Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
