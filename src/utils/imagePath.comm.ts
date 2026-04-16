// function getImage(fileName) {
//   try {
//     const modules = import.meta.glob('@/assets/images/**/*.{png,svg}', { eager: true })
//     const moduleKeys = Object.keys(modules)
//     const fileSrc = moduleKeys.find(key => key.includes(fileName))

//     return fileSrc ? modules[fileSrc].default : ''
//   } catch (err) {
//     console.log(err)
//   }
// }

// const imageSrc = ref('')
// imageSrc.value = getImage(`${whatever}.png`)


// function useAsset(path: string): string {
//     const assets = import.meta.glob('~/assets/**/*', {
//       eager: true,
//       import: 'default',
//     })
//     // @ts-expect-error: wrong type info
//     return assets['/assets/' + path]
//   }