"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { restoreLocalPath } from "@/lib/navigation.mjs";

const PATH_QUERY = "ghp-path";

export default function GitHubPagesPathRestore() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const savedPath = url.searchParams.get(PATH_QUERY);

    const destination = restoreLocalPath(savedPath, url.origin);
    if (destination) router.replace(destination);
  }, [router]);

  return null;
}
