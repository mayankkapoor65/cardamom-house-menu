import { Suspense } from "react";
import { MenuPageClient } from "@/components/MenuPageClient";

function MenuLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-8 text-stone-500">
      <div className="w-8 h-8 rounded-full border-2 border-brand/20 border-t-brand animate-spin mb-4" />
      <p className="font-serif italic text-sm text-stone-600">
        Loading Cardamom House menu...
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<MenuLoadingFallback />}>
      <MenuPageClient />
    </Suspense>
  );
}
