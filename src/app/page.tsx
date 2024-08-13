'use client'
import { toast, Toaster } from 'sonner'
import useSWR from 'swr'

export default function Home() {
  const { data, error, isLoading } = useSWR('hello', getDummy, {
    onError: (error) => {
      // toast(error.message || "An error occurred")
    },
    revalidateOnFocus: false
  });

  if (error) {
    toast(error.message)
  }

  if (isLoading) {
    return <>Loading....</>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(data)}
    </main>
  );
}

async function getDummy() {
  const res = await fetch("/api/home", { cache: "no-cache" });
  if (res.ok) {
    return res.json();
  } else {
    console.log(res.statusText,">>>statustext")
    throw new Error("Error fetching data");
  }
}
