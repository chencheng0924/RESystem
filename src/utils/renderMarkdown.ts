import MarkdownIt from 'markdown-it';

export function renderMarkdown(text: string){
  const markDown = new MarkdownIt({
    breaks: true, 
    xhtmlOut: true  
  });
  const returntext = markDown.render(text)
  return returntext
}