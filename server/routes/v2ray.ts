export default defineEventHandler(async () => {
  const lastUpdated = await fetchLastUpdated();
  return await fetchFile("v2ray", lastUpdated);
});
