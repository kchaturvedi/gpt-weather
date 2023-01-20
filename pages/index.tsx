import Head from 'next/head'

const Index = ({}) => {
  return (
    <div>
      <Head>
        <title>GPT Weather</title>
      </Head>
      <div className='flex flex-col items-center justify-center max-w-4xl py-2'>
        <h1 className='text-3xl font-bold'>GPT Weather</h1>
      </div>
    </div>
  )
}

export default Index
