import type { NextApiRequest } from 'next'

export const config = { runtime: 'edge' }

const handler = async (req: NextApiRequest) => {
  const { headers } = req
  const response = await fetch(`https://api.weatherapi.com/v1/ip.json?q=30024&key=${process.env.OPEN_WEATHER_KEY}`)
  const conditions = await response.json()
  console.log(conditions)
  const data = JSON.stringify({ conditions })
  return new Response(data, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
}

export default handler
