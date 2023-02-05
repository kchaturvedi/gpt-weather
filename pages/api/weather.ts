import { NextResponse } from 'next/server'

export const config = { runtime: 'edge' }

const handler = async (req: Request) => {
  const { headers } = req
  const ip = headers.get('x-forwarded-for')
  const ipRes = await fetch(`https://api.weatherapi.com/v1/ip.json?q=${ip}&key=${process.env.OPEN_WEATHER_KEY}`)
  const location = await ipRes.json()
  const { lat, lon } = location
  // const forecastRes = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${lat},${lon}&key=${process.env.OPEN_WEATHER_KEY}`)
  const forecastRes = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=london&key=${process.env.OPEN_WEATHER_KEY}`)
  const forecast = await forecastRes.json()

  const { condition, wind_kph, wind_dir, temp_c, feelslike_c, cloud, humidity, uv, gust_kph, precip_mm } = forecast.current

  const prompt = `Write a concise but friendly weather report using the following weather conditions. Greet the user in regional vernacular when possible, emulating the accent of the country. Be sure to mention the location of the weather report. Denote all temperatures in celsius and wind and gust speeds in kph. Sentiment should be optimistic, especially when conditions are cloudy, windy, or if there is a lot of percipitation. Current conditions in ${forecast.location.name}, ${forecast.location.region}: ${condition.text}, winds ${wind_kph} from ${wind_dir}, with gusts upto ${gust_kph}. Temperature is ${temp_c}, feels like ${feelslike_c}, with ${humidity}% humidity. End with a weather-related pun or inspirational quote that matches the weather conditions.`

  const payload = {
    model: 'text-davinci-003',
    prompt,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS ? parseInt(process.env.AI_MAX_TOKENS) : 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  }

  const response = await fetch('https://api.openai.com/v1/completions', {
    headers: requestHeaders,
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (data.error) {
    console.error('OpenAI API error: ', data.error)
    return NextResponse.json({
      text: `ERROR with API integration. ${data.error.message}`,
    })
  }

  return NextResponse.json({ text: data.choices[0].text })
}

export default handler
