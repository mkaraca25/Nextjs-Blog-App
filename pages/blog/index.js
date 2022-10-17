import React, { useState } from 'react'
import sanityClient from '../../sanity'
import Link from 'next/link'
import Head from 'next/head'
import getVideoId from 'get-video-id'
import YouTube from 'react-youtube'


const Blog = ({ posts }) => {
  const [blockContent, setBlockContent] = useState()
  const fetchPostData = async (slug) => {
    const query = `*[_type == "post" && slug.current == $slug]{
      body
    }[0]`
    const singlePost = await sanityClient.fetch(query, { slug })

    const serializers = {
      types: {
        youtube: ({ node }) => {
          const { url } = node
          const { id } = getVideoId(url)
          return <YouTube videoId={id} />
        },
      },
    }
    setBlockContent(
      <SanityBlockContent
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
        blocks={singlePost.body}
        serializers={serializers}
      />
    )
  }
  return (
    <main className='blog-main'>
      <Head>
        <title>mkaraca</title>
        <meta name='description' content='Portfolio website' />
        <script type='text/javascript' src='js/winbox.bundle.js'></script>
      </Head>
      <section className='post-section'>
        <h1>
          <Link href='/'>mkaraca </Link>
          <span className='cursor'>| </span>blog
        </h1>
        <h3>Recent posts</h3>
        <div className='posts'>
          {posts &&
            posts.map((post) => (
              <article key={post.slug.current}>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    fetchPostData(post.slug.current)
                    new WinBox({
                      title: post.title,
                      background: '#ff007f',
                      x: 'center',
                      y: 'center',
                      height: '70%',
                      width: '70%',
                      mount: document.querySelector('.single-post'),
                    })
                  }}
                  className='post-body'
                >
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt}
                  ></img>
                  <span className='post-info'>
                    <h3 className='post-category'>
                      {post.categories ? post.categories[0] : 'No category'}
                    </h3>
                    <h3 className='post-title'>{post.title}</h3>
                  </span>
                </span>
              </article>
            ))}
        </div>
      </section>
      <div className='hidden'>
        <div className='single-post'>{blockContent}</div>
      </div>
    </main>
  )
}

export const getServerSideProps = async () => {
  const query = `*[ _type == "post"] | order(_createdAt desc) {
        title,
        slug,
        "categories": categories[] -> title,
        mainImage{
            asset->{
                _id,
                url
            },
            alt
        }
    }`

  const posts = await sanityClient.fetch(query)

  if (!posts.length) {
    return {
      props: {
        posts: [],
      },
    }
  } else {
    return {
      props: {
        posts,
      },
    }
  }
}

export default Blog