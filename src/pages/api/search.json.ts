import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const GET:APIRoute =async ({url}):Promise<Response>=>{

    const query: string | null = url.searchParams.get('query')

    if(query === null){
        return new Response(JSON.stringify({
            error:'query params is required'
        }),{
            status: 404,
            headers:{'Content-Type':'application/json'}
        })
    }

    const allBlogs:CollectionEntry<'blog'>[] = await getCollection('blog')

    const searchResults = allBlogs.filter(article=>{
        const titlemarch:boolean = article.data.title.toLocaleLowerCase()
        .includes(query!.toLocaleLowerCase())
    
        const bodymarch:boolean = article.body.toLocaleLowerCase()
        .includes(query!.toLocaleLowerCase())
    
        const slugmarch:boolean = article.slug.toLocaleLowerCase()
        .includes(query!.toLocaleLowerCase())
    
        return titlemarch || bodymarch || slugmarch
    })


    return new Response(JSON.stringify({
        result:searchResults
    }),{
        status: 200 ,
        headers:{'Content-Type':'application/json'}
    })

}