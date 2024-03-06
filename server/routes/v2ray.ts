export default defineEventHandler(async () => {
  return await $fetch(
    `https://freenode.openrunner.net/uploads/${getDateTime()}-v2ray.txt`,
    { responseType: "blob" }
  );
});
