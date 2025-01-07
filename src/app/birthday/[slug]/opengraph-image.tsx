import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Birthday Invitation'
export const size = {
  width: 500,
  height: 800,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const name = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '500px',
          height: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'hidden',
        }}
      >
        <img
          src="https://assets.justcast.xyz/anton-meta.jpg"
          alt="Birthday Background"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '800px',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 140,
            left: 10,
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            fontSize: 28,
            fontWeight: 'bold',
            color: '#1a365d',
            padding: '12px 24px',
            zIndex: 10,
          }}
        >
          <div>👋🏼 Hi</div>
          <div>{name}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(
            new URL('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap')
          ).then((res) => res.arrayBuffer()),
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
