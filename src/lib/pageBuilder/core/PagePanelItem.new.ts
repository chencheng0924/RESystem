// new Panel test
export class PagePanelItem {
  title: string;
  linkTitle: string;
  linkUrl: string;
  className?: string = '';

  constructor(init?: Partial<PagePanelItem>) {
    Object.assign(this, init)
  }

  setTitle(title: string) {
    this.title = title
    return this
  }

  setLinkTitle(linkTitle: string) {
    this.linkTitle = linkTitle
    return this
  }

  setLinkUrl(linkUrl: string) {
    this.linkUrl = linkUrl
    return this
  }

  setClassName(val: string) {
    this.className = val
    return this
  }
}