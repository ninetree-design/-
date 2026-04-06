export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  createdAt: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
}

export interface SiteConfig {
  brandName: string;
  slogan: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  instagramUrl: string;
  kakaoUrl: string;
  smartStoreUrl: string;
  primaryColor: string;
}

export const initialPortfolio: PortfolioItem[] = [
  {
    id: "1",
    title: "모던 카페 로고 디자인",
    category: "Logo design",
    description: "미니멀리즘을 기반으로 한 카페 브랜딩 프로젝트입니다.",
    imageUrl: "https://picsum.photos/seed/logo1/800/600",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3
  },
  {
    id: "2",
    title: "IT 스타트업 반응형 웹사이트",
    category: "web",
    description: "최신 트렌드를 반영한 스타트업 웹사이트 구축 사례입니다.",
    imageUrl: "https://picsum.photos/seed/web1/800/600",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2
  },
  {
    id: "3",
    title: "유기농 코스메틱 패키징",
    category: "print",
    description: "친환경 소재를 활용한 코스메틱 패키지 디자인입니다.",
    imageUrl: "https://picsum.photos/seed/brand1/800/600",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1
  },
  {
    id: "4",
    title: "건축 사무소 포트폴리오",
    category: "web",
    description: "건축가의 철학을 담은 포트폴리오 웹사이트입니다.",
    imageUrl: "https://picsum.photos/seed/web2/800/600",
    createdAt: Date.now()
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: "1",
    title: "로고 및 브랜딩 디자인",
    description: "브랜드의 핵심 가치를 담은 독창적이고 세련된 디자인을 구현합니다.",
    price: "",
    icon: "Palette"
  },
  {
    id: "2",
    title: "웹&인쇄 디자인",
    description: "모든 기기에서 완벽하게 작동하는 맞춤형 웹사이트를 구축합니다.",
    price: "",
    icon: "Monitor"
  },
  {
    id: "3",
    title: "print",
    description: "로고부터 컬러, 폰트까지 일관된 브랜드 경험을 설계합니다.",
    price: "",
    icon: "Briefcase"
  }
];

export const initialConfig: SiteConfig = {
  brandName: "나인트리디자인",
  slogan: "창의적인 디자인으로 브랜드의 가치를 높입니다",
  aboutText: "나인트리디자인은 단순한 디자인을 넘어 브랜드의 본질을 꿰뚫는 시각적 솔루션을 제공합니다. 우리는 고객의 비즈니스가 시장에서 돋보일 수 있도록 전문성과 감각을 결합하여 최상의 결과물을 만들어냅니다.",
  contactEmail: "ninetree-design@naver.com",
  contactPhone: "010-2058-9929",
  address: "서울특별시 중구 충무로3가 49 엘크루메트로시티 613호",
  instagramUrl: "https://www.instagram.com/ninetree.design",
  kakaoUrl: "http://pf.kakao.com/_fxnxdlX",
  smartStoreUrl: "https://smartstore.naver.com/ninetree-design",
  primaryColor: "#0047AB"
};
