export default defineEventHandler(async () => {
  return await $fetch(
    `https://freenode.openrunner.net/uploads/${getDateTime()}-clash.yaml`,
    { responseType: "blob" }
  );
});
