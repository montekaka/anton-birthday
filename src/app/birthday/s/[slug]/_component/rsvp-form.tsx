'use client'

import { updateGuestNumber } from '../_actions/actions'
import { useActionState } from 'react'

type Params = {
  slug: string,
  name: string,
  needRsvp: boolean
}

export default function RsvpForm(params: Params) {
  const { slug, needRsvp, name } = params;
  const [state, formAction, isPending] = useActionState(updateGuestNumber, null)

  if(needRsvp) {
    return (
      <div className='p-4 shadow-md'>
        <p className='text-gray-700'>Can you make it, {name}?</p>
        <form action={formAction} className='w-full flex items-center border-b border-teal-500 py-2'>
          <label htmlFor="guest_number"  className="sr-only">Total attending</label>
          <select
            id="guest_number"
            name="guest_number"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            required
          >
            <option value="">Total attending</option>
            {Array.from({ length: 19 }, (_, i) => i + 2).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <input
            type="hidden"
            id="slug"
            name="slug"
            onChange={() => {}}
            value={slug}
          />

          <button
            type='submit'
            disabled={isPending}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Confirm
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className='p-4 shadow-md flex flex-col md:flex-row justify-between items-center'>
      <p className="text-gray-700">You are attending 🥳</p>
    </div>
  )
}