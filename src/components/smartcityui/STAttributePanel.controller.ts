export class UseSTAttributePanelStyle {
  public accordionPanel: object
  public accordionHeader: object
  public accordionContentPt: object

  constructor() {
    this.accordionPanel = {
      root: ({ context, props }) => ({
        class: [
          '!border-b-[1px] !border-b-foneBorder !rounded-[4px]'
        ]
      })
    }
    this.accordionHeader = {
      root: ({ context, props }) => ({
        class: [
          '!rounded-[4px] !border-none px-0 flex-row-reverse !px-[12px] hover:!bg-foneBgHover !text-fonePrimaryMain !py-[8px]'
        ]
      }),
      toggleicon: ({ context, props }) => ({
        class: [
          '!rotate-180 mr-[12px]'
        ]
      })
    }
    this.accordionContentPt = {
      root: ({ context, props }) => ({
        class: [
          '!rounded-none !border-none'
        ]
      }),
      content: ({ context, props }) => ({
        class: [
          '!rounded-none !border-none !pt-[12px] !px-0 '
        ]
      })
    }
  }
}