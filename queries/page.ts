import type {
  KirbyBlock,
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'

const ROOT_SLUG = 'sb-toggle-2024'

export function getSite(): KirbyQuerySchema {
  return {
    query: `site.page("${ROOT_SLUG}")`,
    select: {
      title: true,
      children: {
        query: 'page.children',
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

export function getPage(pageSlug: string): KirbyQuerySchema {
  return {
    query: `page("${ROOT_SLUG}/${pageSlug}")`,
    select: {
      title: true,
      url: true,
      webfolders: 'page.webfolders._toWebFolders',
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
