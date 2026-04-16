
export function getWebviewImage(path: string): any {
    const dir = localStorage.getItem('theme')
    return new URL(`../assets/webview/${dir}/${path}`, import.meta.url).href


    // const dir = localStorage.getItem('theme')
    // const assets = import.meta.glob('@/assets/webview/**/*.{png,svg}', {
    //     eager: true,
    //     import: 'default',
    // })
    // return Object.values(assets).find((key:any) => key.includes(path) && key.includes(dir))
}
