import type {
  KirbyBlock,
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'

export const ROOT_SLUGS = {
  '2024': 'sb-toggle-2024',
  '2025': 'sb-toggle-2025',
}

export function getYear(year: string): KirbyQuerySchema {
  // console.log('Fetching year:', ROOT_SLUGS[year])
  return {
    query: `site.page("${ROOT_SLUGS[year]}")`,
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

export function getPage({
  student,
  year,
}: {
  student: string
  year: string
}): KirbyQuerySchema {
  return {
    query: `page("${ROOT_SLUGS[year]}/${student}")`,
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
