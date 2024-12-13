import type {
  KirbyBlock,
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'

export function getSite(): KirbyQuerySchema {
  return {
    query: 'site',
    select: {
      title: true,
      children: {
        query: 'site.children',
        select: {
          title: true,
          url: true,
          slug: true,
          webfolders: 'page.webfolders._toWebFolders',
        },
      },
    },
  }
}

// // Fetch request
// get().then(([data, error]) => {
//   if (error) {
//     document.body.innerHTML = error
//     return
//   }

//   const links = []

//   const { children } = data.result

//   children.forEach((page) => {
//     page.webfolders.forEach((file) => {
//       // console.log(page.title, file);
//       links.push(file.url)
//     })
//   })

//   shuffle(links)
//   framify(links)
// })

export function getPage(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      title: true,
      url: true,
      webfolders: 'page.webfolders._toWebFolders',
    },
  }
}
