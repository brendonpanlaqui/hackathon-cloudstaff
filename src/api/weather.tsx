export async function getWeather(location) {
  const key = import.meta.env.VITE_WEATHERSTACK_KEY;
  const res = await fetch(
    `http://api.weatherstack.com/current?access_key=${key}&query=${location}`
  );
  return await res.json();
}
