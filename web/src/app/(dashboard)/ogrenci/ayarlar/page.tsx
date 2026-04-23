"use client";

import { useRouter } from "next/navigation";

export default function AyarlarPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Ayarlar</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hesap tercihlerini yönet
        </p>
      </header>

      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 space-y-3">
        <h2 className="text-lg font-bold">Hesap</h2>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl bg-rose-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-rose-600"
        >
          Çıkış Yap
        </button>
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 space-y-2">
        <h2 className="text-lg font-bold">Görünüm</h2>
        <p className="text-sm text-muted-foreground">
          Tema ayarları yakında geliyor.
        </p>
      </section>
    </div>
  );
}
