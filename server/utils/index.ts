import { tz } from "@date-fns/tz";
import { format, formatISO, parse, parseISO, sub } from "date-fns";

const timezone = tz("Asia/Shanghai");

export function getDate(dateTime: string, iso8601 = true) {
  return iso8601 ? parseISO(dateTime) : parse(dateTime, "yyyyMMdd", new Date());
}

export function formatDate(date: Date, iso8601 = true) {
  return iso8601
    ? formatISO(date, { in: timezone })
    : format(date, "yyyyMMdd", { in: timezone });
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
  const baseUrl = "https://freenode.openrunner.net/uploads";
  const ext = fileType === "clash" ? "yaml" : "txt";
  return `${baseUrl}/${date}-${fileType}.${ext}`;
}

export async function fetchFile(
  fileType: "clash" | "v2ray",
  dateTime: string
): Promise<Blob> {
  const url = getUrl(fileType, formatDate(getDate(dateTime), false));
  console.log(`Fetching ${url}`);
  try {
    const response = await $fetch<Blob>(url, {
      responseType: "blob",
    });
    const isBlob = response instanceof Blob;
    if (!isBlob || response.size >= 1) return response;
    // No nodes => request prev day
    if (response.size < 1)
      return fetchFile(
        fileType,
        formatDate(sub(getDate(dateTime), { days: 1 }))
      );
  } catch {
    // Not exists => request prev day
    return fetchFile(fileType, formatDate(sub(getDate(dateTime), { days: 1 })));
  }
}
