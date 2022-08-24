import * as htmlToImage from 'html-to-image'

export const getImages = async (elements) => {
  const images = []
  for (const element of elements) {
    const image = await htmlToImage.toPng(element)
    images.push(image)
  }

  return images
}
