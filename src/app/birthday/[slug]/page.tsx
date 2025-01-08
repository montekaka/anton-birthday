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
          url: `https://assets.justcast.xyz/anton-meta.jpg`,
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
            <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-95 p-4">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className='text-lg text-gray-600 font-semibold md:text-xl'>👋🏼 Hi {name}</h3>
                <h2 className="text-xl text-gray-700 font-semibold md:text-2xl">
                  Anton turns 5!
                </h2>
                <p className='text-gray-600 text-sm'>Please join us to celebrate Anton&#39;s turning 5!</p>
              </div>
            </div>
          </div>
          {/* Description Section */}

          <div className="mt-6 bg-white border border-gray-200 p-4" role="alert" aria-labelledby="hs-discovery-label">
            <div className="flex">
              <div className="shrink-0 text-gray-800">
                <svg className="shrink-0 size-4 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 10"/></svg>
              </div>
              <div className="ms-3">
                <h3 id="hs-discovery-label" className="text-gray-800 font-semibold">
                  Event Time
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  February 2, 2025 (2pm - 4pm). We will have access to the Giant Party Hat Tent for two hours and can enjoy Kidspace Children&#39;s Museum during their operational hours for the day.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-100 border border-blue-200 text-gray-800 p-4" role="alert"  aria-labelledby="hs-actions-label">
            <div className="flex">
              <div className="shrink-0">
                <svg className="shrink-0 size-4 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              <div className="ms-3">
                <h3 id="hs-actions-label" className="font-semibold">
                  How to Check In:
                </h3>
                <div className="mt-2 text-sm text-gray-600">
                  <ol className='list-decimal'>
                    <li>Upon arrival, check in at the Admission desk.</li>
                    <li>Mention you are here for Anton’s birthday.</li>
                    <li>You will be provided with a wristband granting access to the Giant Party Hat tent.</li>
                    <li>Kidspace staff will then direct you to our party location.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* Venue Section */}
          <div className="mt-6 flex flex-col bg-white shadow-sm">
            <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5">
              <h3 className="text-lg font-bold text-gray-800">
                Location
              </h3>
            </div>
            <div className="p-4 md:p-5">
              <p className="mt-2 text-gray-500">
                Kidspace Pasadena
              </p>
              <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="https://www.google.com/maps/search/?api=1&query=480+N+Arroyo+Blvd,+Pasadena,+CA">
                480 N Arroyo Blvd, Pasadena, CA
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </a>
              <div className="mt-4 relative h-64 w-full md:h-80 lg:h-96">
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