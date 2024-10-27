import { useEffect } from 'react';

// 定义属性接口
interface DynamicStylesProps {
  styles: string;
}

// 应用属性类型
const DynamicStyles: React.FC<DynamicStylesProps> = ({ styles }) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = styles;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [styles]);

  return null;
};

export default DynamicStyles;
