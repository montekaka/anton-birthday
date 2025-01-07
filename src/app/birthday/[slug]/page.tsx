import Image from 'next/image';
import RsvpForm from './_component/rsvp-form'
import Balloons from './_component/balloons'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug
  const res = await fetch(`https://script.google.com/macros/s/AKfycbw99YtzrxKfMdB3h3Ixff6SgHyUyg-sJLGrsa6ehMs5-_BmGUPiFcStxV5rdmCqMvtZ/exec?slug=${slug}`)
  const invites = await res.json()
  const { data } = invites
  const invite = data[0];

  if(data.length === 0) {
    return {
      title: 'Anton turns 5!',
      description: 'Join us for a fun-filled birthday celebration!',
    }
  }

  return {
    title: `👋🏼 ${invite.name}, Anton turns 5!`,
    description: `Join us for a fun-filled celebration of Anton's birthday at Kidspace Pasadena!`,
    openGraph: {
      title: `👋🏼 ${invite.name}, Anton turns 5!`,
      description: `Join us for a fun-filled celebration of Anton's birthday at Kidspace Pasadena!`,
      url: `https://antonchen.xyz/birthday/${slug}`,
      siteName: `Anton's Birthday Bash`,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `https://antonchen.xyz/birthday/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${data.name}'s Birthday Bash Invitation`,
        },
      ],
    },
  }
}

export default async function Page({
    params,
}: Props) {
  const slug = (await params).slug
  const res = await fetch(`https://script.google.com/macros/s/AKfycbw99YtzrxKfMdB3h3Ixff6SgHyUyg-sJLGrsa6ehMs5-_BmGUPiFcStxV5rdmCqMvtZ/exec?slug=${slug}`)
  const invites = await res.json()
  const { data } = invites
  const invite = data[0]

  if(data.length === 0) {
    return null
  }

  if(invite) {

    const {name, guest_count} = invite;
    const needRsvp = guest_count === "";

    return (
      <div className="bg-amber-100 min-h-screen">
        <Balloons/>
        <div className='main relative z-10'>
        {/* Header Section */}
          <div className="relative h-80 w-full md:h-[24rem] lg:h-[32rem]">
            <Image
              src="/anton.webp" // Replace with your image
              alt="Picture of Anton"
              style={{objectFit: "cover"}}
              fill={true}
              className="rounded-lg"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-95 p-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className='text-lg text-gray-600 font-semibold md:text-xl'>👋🏼 Hi {name}</h3>
              <h2 className="text-xl text-gray-700 font-semibold md:text-2xl">
                Anton turns 5!
              </h2>
              <p className='text-gray-600 text-sm'>Please join us to celebrate Anton&#39;s turning 5!</p>
            </div>
          </div>
          {/* Description Section */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-600">Event Time</h3>
            <p className="text text-gray-700 md:text-base">February 2, 2025 (2pm - 4pm)</p>
            <p className="text-sm text-gray-600 md:text-base">
              We will have access to the Giant Party Hat Tent for two hours and can enjoy Kidspace Children&#39;s Museum during their operational hours for the day.
            </p>
          </div>

          {/* Venue Section */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-600">Venue & Location</h3>
            <p className="text-gray-700 md:text-base">Kidspace Pasadena</p>
            <a
                href="https://www.google.com/maps/search/?api=1&query=480+N+Arroyo+Blvd,+Pasadena,+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-700 hover:text-primary/80 mt-1"
              >
                480 N Arroyo Blvd, Pasadena, CA
              </a>
            <div className="relative h-64 w-full md:h-80 lg:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.1532108320317!2d-118.16603812357644!3d34.15516197283394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c37100f40b99%3A0x84cf9a51b0b5e70f!2sKidspace%20Children&#39;s%20Museum!5e0!3m2!1sen!2sus!4v1683594184259!5m2!1sen!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kidspace Pasadena Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-4 sticky bottom-0 bg-white bg-opacity-80">
            <RsvpForm slug={slug} needRsvp={needRsvp} name={name}/>
          </div>
        </div>
      </div>
    );
  }

  return null
}