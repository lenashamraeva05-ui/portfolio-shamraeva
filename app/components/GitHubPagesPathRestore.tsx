"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PATH_QUERY = "ghp-path";

export default function GitHubPagesPathRestore() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const savedPath = url.searchParams.get(PATH_QUERY);

    if (!savedPath || !savedPath.startsWith("/")) return;

    router.replace(savedPath);
  }, [router]);

  return null;
}
