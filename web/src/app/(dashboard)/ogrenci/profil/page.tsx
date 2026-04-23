"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [className, setClassName] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setEmail(data.user.email ?? null);
      const { data: s } = await supabase
        .from("class_students")
        .select("nickname, classes(name)")
        .eq("student_id", data.user.id)
        .limit(1)
        .maybeSingle();
      if (s?.nickname) setNickname(s.nickname as string);
      const cls = s?.classes as { name?: string } | { name?: string }[] | null;
      if (Array.isArray(cls) && cls.length > 0 && cls[0].name) setClassName(cls[0].name);
      else if (cls && !Array.isArray(cls) && cls.name) setClassName(cls.name);
    });
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Profilim</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hesap bilgilerini görüntüle.
        </p>
      </header>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-3xl">
            🧑‍🎓
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              {nickname ?? "Öğrenci"}
            </p>
            {email && <p className="text-sm text-muted-foreground">{email}</p>}
          </div>
        </div>
        {className && (
          <div className="rounded-xl bg-[var(--color-bg-secondary)] p-3 text-sm">
            <span className="font-semibold">Sınıf:</span> {className}
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Profil düzenleme yakında geliyor.
        </p>
      </div>
    </div>
  );
}
