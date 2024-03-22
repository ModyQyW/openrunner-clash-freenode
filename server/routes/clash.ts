export default defineEventHandler(async () => {
  const lastUpdated = await fetchLastUpdated();
  return await fetchFile("clash", lastUpdated);
});
