 








// 🔒 LOCKED DATA: USER CONFIGURATION
// Please do not overwrite this file with placeholder data in future updates.

// 自定义长图链接 (Updated to generic placeholders)
export const MY_CUSTOM_LONG_IMAGE = '/tupian/584679600.png';

// 资源链接 (Updated to generic placeholders)
export const ASSETS = {
    P1_IMG_1: "tupian/A4 - 41.png",
    P1_IMG_2: 'tupian/A4 - 46.png',
    P1_IMG_3: 'tupian/A4 - 37 (1).png',
    P1_VID_1: "https://www.w3schools.com/html/mov_bbb.mp4",
    P1_VID_2: "tupian/hwj [4K 2160p].mp4",
    PROJECT_2_LONG: 'https://picsum.photos/seed/p2_long/1920/1080',
    PROJECT_2_VIDEO: "https://www.w3schools.com/html/mov_bbb.mp4" 
};

export interface WaveItemConfig {
    url: string;
    x: number;
    y: number;
    width: number;
    rotate?: number;
    zIndex?: number;
    delay?: number;
}

export interface Group1CardConfig {
    id: string;
    img: string;
    yOffset: number;
    xOffset: number;
    width: number;
    height: number;
    borderRadius?: string;
    rotate?: number;
}

export interface CustomNewImageConfig {
    id: string;
    img: string;
    x: number;
    y: number;
    w: number;
    h: number;
    r?: number;
}

// 自由布局配置 (Fox and Rabbit)
// 🔒 DATA LOCKED: User specified values
export const CUSTOM_FOX_RABBIT_CONFIG: WaveItemConfig[] = [
    {
        url: MY_CUSTOM_LONG_IMAGE,
        x: 375,
        y: 8710,
        width: 750,
        rotate: 0,
        zIndex: 30
    }
];

// 自由布局配置 (Wave Images)
// 🔒 DATA LOCKED: User specified values
export const WAVE_IMAGES_CONFIG: WaveItemConfig[] = [
   
];

// Group 1 Cards Data
export const GROUP_1_CARDS_DATA: Group1CardConfig[] = [

];

// New Scattered Images
export const CUSTOM_NEW_IMAGES: CustomNewImageConfig[] = [
    
      
];

// 🇨🇳 CHINA OPTIMIZATION: Replaced standard CDNs with jsDelivr mirror for speed
export const TOOL_ICONS: Record<string, string> = {
    'Figma': '/tupian/material-icon-theme_figma.png',
    'PS': '/tupian/devicon_photoshop.png',
    'AI': '/tupian/Frame 1312322066.png',
    'AE': '/tupian/logos_adobe-after-effects.png',
    'Blender': '/tupian/devicon_blender.png',
    'VScode': '/tupian/material-icon-theme_vscode.png',
    'CapCut': '/tupian/vecteezy_capcut-logo-on-transparent-white-background_13948546 2.png',
    'ThreeJS': 'https://jsd.cdn.zzko.cn/gh/devicons/devicon/icons/threejs/threejs-original.svg', 
    'Jimeng': 'https://jsd.cdn.zzko.cn/gh/jayneysil520-dev/jayneysil@main/%E5%8D%B3%E6%A2%A6icon.png',
    'Pinterest': 'https://jsd.cdn.zzko.cn/gh/devicons/devicon/icons/pinterest/pinterest-original.svg',
    'LibLib': 'https://jsd.cdn.zzko.cn/gh/jayneysil520-dev/jayneysil@main/liblib.png'
};

// Project Data
export const PROJECTS_DATA = [
  { 
      id: 1, 
      title: 'TEATIME', 
      label: '3D MODEL', 
      year: '2025.11', 
      client: 'CLIENT', 
      color: '#366A54', 
      img: '/tupian/untitled777.png', 
      previewBgImg: '/tupian/untitled777.png', 
      desc: 'More than just a time for tea and coffee, a space where knowledge and inspiration meet.',
      tools: [ 'PS', 'Figma', 'Blender'],
      previewTextColor: {
        year: '#E6E6E6',
        label: '#E6E6E6',
        title: '#FFFFFF',
        description: '#D9D9D9',
        tools: '#E6E6E6',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery', 
      scrollVideoUrl: ASSETS.P1_VID_1,
      scrollVideoUrl2: ASSETS.P1_VID_2,
      sequenceConfig1: {
          baseUrl: '/tupian/untitled7773.png', 
          suffix: '.png',
          digits: 3,       
          frameCount: 56,
          startIndex: 1
      },
      
  },
  { 
      id: 2, 
      title: 'TEATIME', 
      label: 'UI&UX', 
      year: '2025.02', 
      color: '#FFA500', 
      img: '/tupian/584679600.png', 
      desc: 'More than just a time for tea and coffee, a space where knowledge and inspiration meet',
      tools: [ 'AE', 'Blender'],
      previewTextColor: {
        year: '#404040',
        label: '#404040',
        title: '#000000',
        description: '#404040',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery',
      scrollVideoUrl: 'tupian/티타임 영상 (1).mp4',
      project2Config: {
        phoneImage: {
            url: 'https://picsum.photos/seed/phone/300/600',
            x: 607, 
            y: 660, 
            width: 280
        },
        cards: [
            { id: 1, url: 'https://picsum.photos/seed/p2c1/400/300', y: 0 },
            { id: 2, url: 'https://picsum.photos/seed/p2c2/400/300', y: -348 },
            { id: 3, url: 'https://picsum.photos/seed/p2c3/400/300', y: -620 },
            { id: 4, url: 'https://picsum.photos/seed/p2c4/400/300', y: -1080 },
            { id: 5, url: 'https://picsum.photos/seed/p2c5/400/300', y: -1800 },
            { id: 6, url: 'https://picsum.photos/seed/p2c6/400/300', y: -2580 },
            { id: 7, url: 'https://picsum.photos/seed/p2c7/400/300', y: -3430 },
            { id: 8, url: 'https://picsum.photos/seed/p2c8/400/300', y: -3770 },
        ],
        extraContent: [
            { 
                type: 'image', 
                y: 445, 
                url: 'https://picsum.photos/seed/extra1/200/200',
                width: 245, 
                zIndex: 25,
                x: 380,      
                rotate: 12 
            },
            { 
                type: 'image', 
                y: 400, 
                url: 'https://picsum.photos/seed/extra2/200/200',
                width: 125,
                zIndex: 26,
                x: 80,      
                rotate: -2 
            }
        ],
        videoInteraction: {
            y: 400, 
            videoUrl: 'tupian/티타임 영상 (1).mp4'
        }
      },
      detailImages: [], 
  },
  { 
      id: 3, title: 'EORDEARM', label: 'information visualization', year: '2025', color: '#4DA6FF', 
      shadowColor: '#4DA6FF',
      img: 'tupian/Frame 1312322063.png', 
      desc: 'Taking out warm moments from lingering memories and conveying them to someone.',
      tools: ['PS', 'AI', 'FIGMA'],
      previewTextColor: {
        year: '#404040',
        label: '#404040',
        title: '#000000',
        description: '#404040',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery',
      detailImages: ['tupian/Frame 1312322063.png'],
      detailText: { main: 'Project', sub: 'VISUAL DESIGN', signature: 'Design' }
  },
  { 
      id: 4, 
      title: 'EXIT', 
      label: '3D DESIGN', 
      year: '2025', 
      color: '#EA2F2F', 
      img: 'tupian/0056 2 (2).png', 
      desc: 'Default description for project 4.',
      tools: ['Blender', 'CapCut', 'AE'],
      previewTextColor: {
        year: '#404040',
        label: '#404040',
        title: '#000000',
        description: '#404040',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery',
      detailImages: [
          'tupian/0056 2 (2).png',
          'tupian/1.png'
      ],
      extraContent: [
          {
              type: 'video',
              url: 'tupian/hwj [4K 2160p].mp4',
              y: 16600, 
              width: 800, 
              scale: 1,
              x: 0 
          }
      ]
  },
  { 
      id: 5, 
      title: 'EXIT', 
      label: '3D DESIGN', 
      year: '2025', 
      color: '#E0221E', 
      img: 'tupian/1.png', 
      desc: 'Default description for project 5.',
      tools: ['AI', 'Figma'],
      previewTextColor: {
        year: '#E6E6E6',
        label: '#E6E6E6',
        title: '#FFFFFF',
        description: '#E6E6E6',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery',
      detailImages: [
          'tupian/0056 2 (2).png'
      ]
  },
  { 
      id: 6, 
      title: 'EXIT', 
      label: '3D DESIGN', 
      year: '2021-2025', 
      color: '#AA88EE', 
      img: 'tupian/1.png', 
      desc: 'Default description for project 6.',
      tools: ['C4D', 'AE', 'Blender'],
      previewTextColor: {
        year: '#000000',
        label: '#999999',
        title: '#000000',
        description: '#444444',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'horizontal-scroll',
      horizontalData: [
          {
              id: 1,
              img: 'tupian/0056 2 (2).png', 
              video: 'tupian/hwj [4K 2160p].mp4',
              title: 'Motion 1',
              width: 320, 
              height: 569, 
              flippedWidth: 484, 
              flippedHeight: 682.4, 
              y: 0, 
              scale: 1,
              introConfig: {
                  text: '01\nMOTION 1\n\nDefault description.',
                  x: -210, 
                  y: 100, 
                  rotate: 0,
                  fontSize: '14px',
                  width: '200px',
                  align: 'right'
              }
          },
          {
              id: 2,
              img: 'tupian/Frame 1312322064.png', 
              video: 'tupian/티타임 영상 (1).mp4',
              title: 'Motion 2',
              width: 320,
              height: 569,
              flippedWidth: 800, 
              flippedHeight: 450,
              y: 120, 
              scale: 1,
              introConfig: {
                  text: '02\nMOTION 2\n\nDefault description.',
                  x: -200, 
                  y: 200,
                  rotate: -5,
                  fontSize: '16px',
                  width: '180px',
                  align: 'right'
              }
          },
         
      ]
  },
  { 
      id: 7, 
      title: 'Default Project Title 7', 
      label: 'Personal Gallery', 
      year: '2021-2025', 
      color: '#4ECDC4', 
      img: 'tupian/default (4) 1.png', 
      desc: 'Default description for project 7.', 
      tools: ['Blender', 'PS', 'AI'], 
      previewTextColor: {
        year: '#E6E6E6',
        label: '#E6E6E6',
        title: '#FFFFFF',
        description: '#E6E6E6',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery',
      detailImages: [
          'tupian/default (4) 1.png',
          'tupian/default (4) 1.png',
          'tupian/default (4) 1.png'
      ]
  },
  { 
      id: 8, title: 'Default Project Title 8', label: 'Personal Growth', year: '2021-2026', color: '#7BC5FF', 
      img: 'tupian/A4 - 22 (1).png', 
      desc: 'Default description for project 8.',
      tools: ['Figma', 'PS'], 
      previewTextColor: {
        year: '#000000',
        label: '#999999',
        title: '#000000',
        description: '#444444',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery',
      detailImages: [
          'tupian/A4 - 22 (1).png',
      ]
  }
];
