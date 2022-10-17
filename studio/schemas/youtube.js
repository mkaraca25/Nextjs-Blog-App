import React from 'react'

import getVideoId from 'get-video-id'
import YouTube from 'react-youtube'

const Preview = ({ value }) => {
  const { url } = value
  if (!url) return <h1>NO URL</h1>
  const { id } = getVideoId(url)
  console.log(id)
  return <YouTube videoId={id} />
}

export default {
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    component: Preview,
  },
}