export function cleanMarkdown(text) {
  // 移除Markdown的标题标记（#）
  text = text.replace(/^#{1,6}\s?/gm, '');
  
  // 移除粗体和斜体标记（*）
  text = text.replace(/\*+/g, '');
  
  // 移除内联代码标记（`）
  text = text.replace(/`/g, '');
  
  // 移除有序列表的数字标记
  text = text.replace(/^\d+\.\s/gm, '');
  
  // 移除无序列表的标记（-、*、+）
  text = text.replace(/^[-*+]\s/gm, '');
  
  // 移除水平线
  text = text.replace(/^([-*_])\1{2,}$/gm, '');
  
  // 移除链接语法，只保留链接文本
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  
  // 移除图片语法，只保留alt文本
  text = text.replace(/!\[([^\]]+)\]\([^\)]+\)/g, '$1');
  
  // 清理每行开头和结尾的多余空白，但保留换行
  // text = text.split('\n').map(line => line.trim()).join('\n');
  
  return text;
}