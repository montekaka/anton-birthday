'use server'

import { revalidatePath } from "next/cache";

export type UpdateRSVPActionState = {
  slug?: string;
  guest_number?: string;
  error?: string;
}

export async function updateGuestNumber(_prevState: UpdateRSVPActionState, formData: FormData): Promise<UpdateRSVPActionState> {
  const slug = formData.get("slug") as string;
  const guest_number = formData.get("guest_number") as string;

  try {
    await fetch(`https://script.google.com/macros/s/AKfycbw99YtzrxKfMdB3h3Ixff6SgHyUyg-sJLGrsa6ehMs5-_BmGUPiFcStxV5rdmCqMvtZ/exec?slug=${slug}&guest_number=${guest_number}`, {
      method: "POST",
    })

    revalidatePath(`birthday/${slug}`)

    return {
      slug,
      guest_number,
    }
  } catch {
    return {
      slug,
      guest_number,
      error: "An error occurred."
    }
  }
}