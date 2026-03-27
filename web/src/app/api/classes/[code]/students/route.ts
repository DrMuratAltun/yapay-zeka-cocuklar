import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET(_request: Request, { params }: { params: Promise<{ code: string }> }) {
  try {
    const supabase = createAdminClient();
    const { code } = await params;

    // 1. Sınıfı bul
    const { data: classData, error: classError } = await supabase
        .from('classes')
        .select('id, name')
        .eq('access_code', code)
        .single();
        
    if (classError || !classData) {
        return NextResponse.json({ error: 'Sınıf bulunamadı veya kod hatalı.' }, { status: 404 });
    }

    // 2. Sınıftaki öğrencileri Supabase Admin API ile getir (metadata üzerinden)
    // Gerçek bir senaryoda bu işlem auth.users'a view atılarak veya profiller tablosundan alınarak yapılır.
    // Burada kukla e-postaları bulmak için listUsers kullanıyoruz.
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) throw authError;

    // Sadece bu sınıf koduna sahip öğrencileri filtrele
    const students = authData.users
        .filter(u => u.user_metadata?.class_code === code)
        .map(u => ({
            id: u.id,
            name: u.user_metadata?.full_name || 'İsimsiz Öğrenci',
            email: u.email
        }));

    // İsme göre alfabetik sırala
    students.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ 
        success: true,
        className: classData.name, 
        students: students 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
