'use server'

import { revalidatePath } from "next/cache";

type ActionState = {
  slug?: string;
  guest_number?: string;
}

export async function updateGuestNumber(_prevState: ActionState, formData: FormData) {
  const slug = formData.get("slug") as string;
  const guest_number = formData.get("guest_number") as string;

  try {
    await fetch(`https://script.google.com/macros/s/AKfycby1HR2v71ccdjYGodXALtF9qroqXJASpdGiAr3vzb7TNTVCx8-glaXISWpdkLl0dVQ4/exec?slug=${slug}&guest_number=${guest_number}`, {
      method: "POST",
    })
  } catch {
    return "An error occurred."
  }

  revalidatePath(`birthday/s/${slug}`)

  return "success"
}