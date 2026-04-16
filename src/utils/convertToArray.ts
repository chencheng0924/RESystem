export function convertToArray (input: string)  {
  // 移除字串前後的空白
  input = input.trim();
  
  // 找到第一個空格的位置
  const firstSpaceIndex = input.indexOf(' ');
  
  if (firstSpaceIndex === -1) {
    // 如果沒有空格,整個字串就是第一個元素
    return [input, '', ''];
  }
  
  // 提取第一個元素 (指令)
  const command = input.slice(0, firstSpaceIndex);
  
  // 提取剩餘的部分
  const rest = input.slice(firstSpaceIndex + 1).trim();
  
  // 查找 msg= 的位置
  const msgIndex = rest.indexOf('msg=');
  
  if (msgIndex !== -1) {
    // 如果找到 msg=，將剩餘部分分為兩個元素
    const subCommand = rest.slice(0, msgIndex).trim();
    const params = rest.slice(msgIndex);
    return [command, subCommand, params];
  } else {
    const firstWord = rest.split(' ')[0];
    const parts = rest.split(' ');
    const result = parts.slice(1).join(' ');  
    return [command, firstWord, result];
  }
}
