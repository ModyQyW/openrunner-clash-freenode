import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function getDate(dateTime: string) {
  return dayjs(dateTime).tz("Asia/Shanghai").format("YYYYMMDD");
}

export async function fetchLastUpdated() {
  const response = await $fetch(
    "https://api.github.com/repos/OpenRunner/clash-freenode/commits?per_page=1&page=1&path=README.md",
    {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
      },
    }
  );
  return (response[0].commit.author.date ??
    response[0].commit.committer.date) as string;
}

export function getUrl(fileType: "clash" | "v2ray", date: string) {
  const baseUrl = `https://freenode.openrunner.net/uploads`;
  const ext = fileType === "clash" ? "yaml" : "txt";
  return `${baseUrl}/${date}-${fileType}.${ext}`;
}

export async function fetchFile(fileType: "clash" | "v2ray", dateTime: string) {
  let url = getUrl(fileType, getDate(dateTime));
  console.log(`Fetching ${url}`);
  return $fetch(url, {
    responseType: "blob",
  }).catch((error) => {
    console.error(error);
    url = getUrl(
      fileType,
      dayjs(getDate(dateTime), "YYYYMMDD").subtract(1, "day").format("YYYYMMDD")
    );
    console.log(`Fetching ${url}`);
    return $fetch(url, { responseType: "blob" });
  });
}
