"use server"

import axios from "axios";

export async function getAllUsers() {
  const clerkBaseUrl = "https://api.clerk.com/v1";

  const res = await axios.get(clerkBaseUrl + "/users", {
    headers: {
      "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  })

  return res.data
}
