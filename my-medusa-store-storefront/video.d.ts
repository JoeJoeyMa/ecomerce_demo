/// <reference types="next-video/video-types/global" />

// global.d.ts
interface Window {
    chatwootSettings?: {
      position: string;
      type: string;
      launcherTitle: string;
      // 根据需要添加更多属性
    };
    chatwootSDK?: any; // 根据需要定义 chatwootSDK 的类型
  }
  
