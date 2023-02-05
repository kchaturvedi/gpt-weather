import Head from 'next/head'
import { useEffect, useState } from 'react'

const Index = ({}) => {
  const [isLoading, setLoading] = useState(false)
  const [weather, setWeather] = useState('')

  useEffect(() => {
    getWeatherReport()
  }, [])

  const getWeatherReport = async () => {
    setLoading(true)
    const response = await fetch('/api/weather')
    const data = await response.json()
    setWeather(data.text)
    setLoading(false)
  }

  return (
    <div>
      <Head>
        <title>GPT Weather</title>
      </Head>
      <div className='flex flex-col items-center justify-center max-w-4xl py-2'>
        <h1 className='text-3xl font-bold'>GPT Weather</h1>
        <p>{isLoading ? 'Loading...' : weather}</p>
      </div>
    </div>
  )
}

export default Index
