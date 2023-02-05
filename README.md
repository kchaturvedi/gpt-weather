## DEMO -> [https://gpt-weather-e47v.vercel.app](https://gpt-weather-e47v.vercel.app)

This is a Next.js app integrating WeatherAPI and GPT-3 to generate a simple weather forecast for your location.

Using Vercel Edge Functions, your IP address is used to derive your approximate location. This location is used to fetch the weather conditions. Finally, that information is fed into a prompt for GPT-3 to generate a friendly weather report.

## Try it yourself

Add your API keys for WeatherAPI.com and OpenAI.com in a .env.local file.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
