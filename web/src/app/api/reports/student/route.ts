import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
} from 'docx'

const bolumBasliklari: Record<number, string> = {
  1: 'Yapay Zeka Nedir?',
  2: 'Gunluk Hayatta YZ',
  3: 'Verinin Gucu',
  4: 'Makineler Nasil Ogrenir?',
  5: 'Uretken Yapay Zeka',
  6: 'Blok Tabanli YZ Kodlama',
  7: 'Gercek Hayat Problemleri',
  8: 'Dijital Icerik Uretimi',
  9: 'YZ ve Etik',
  10: 'Gelecegi Tasarla',
}

// GET /api/reports/student?classId=xxx&studentId=yyy
// studentId yoksa tüm sınıf raporu üretir
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const adminClient = createAdminClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const classId = req.nextUrl.searchParams.get('classId')
  const studentId = req.nextUrl.searchParams.get('studentId')

  if (!classId) {
    return NextResponse.json({ error: 'classId zorunlu' }, { status: 400 })
  }

  // Yetki kontrolü
  const { data: myRole } = await supabase
    .from('school_users')
    .select('role')
    .eq('user_id', user.id)
    .in('role', ['super_admin', 'school_admin', 'teacher'])
    .limit(1)
    .maybeSingle()

  if (!myRole) return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })

  // Sınıf bilgisi
  const { data: classInfo } = await adminClient
    .from('classes')
    .select('name, access_code, module_order')
    .eq('id', classId)
    .single()

  if (!classInfo) return NextResponse.json({ error: 'Sinif bulunamadi' }, { status: 404 })

  // Öğrencileri çek
  const studentQuery = adminClient
    .from('class_students')
    .select('user_id, nickname')
    .eq('class_id', classId)

  if (studentId) {
    studentQuery.eq('user_id', studentId)
  }

  const { data: students } = await studentQuery

  if (!students || students.length === 0) {
    return NextResponse.json({ error: 'Ogrenci bulunamadi' }, { status: 404 })
  }

  // Atanmış modülleri çek
  const { data: modules } = await adminClient
    .from('class_modules')
    .select('bolum_no, min_quiz_score')
    .eq('class_id', classId)
    .order('sort_order')

  const assignedModules = modules ?? []

  // Quiz sonuçlarını çek
  const { data: allResults } = await adminClient
    .from('student_quiz_results')
    .select('student_id, bolum_no, score, passed')
    .eq('class_id', classId)

  const results = allResults ?? []

  const today = new Date().toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const noBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  } as const

  const thinBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
    left: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
    right: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
  } as const

  // Her öğrenci için bölüm oluştur
  const sections = students.map((student) => {
    const studentResults = results.filter((r) => r.student_id === student.user_id)
    const passedCount = studentResults.filter((r) => r.passed).length
    const scores = studentResults.map((r) => r.score)
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

    // Tablo satırları
    const tableRows = [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Bolum', bold: true, size: 20 })] })],
            borders: thinBorder,
            width: { size: 4500, type: WidthType.DXA },
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Puan', bold: true, size: 20 })], alignment: AlignmentType.CENTER })],
            borders: thinBorder,
            width: { size: 1500, type: WidthType.DXA },
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Durum', bold: true, size: 20 })], alignment: AlignmentType.CENTER })],
            borders: thinBorder,
            width: { size: 2000, type: WidthType.DXA },
          }),
        ],
      }),
      ...assignedModules.map((mod) => {
        const result = studentResults.find((r) => r.bolum_no === mod.bolum_no)
        return new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: `Bolum ${mod.bolum_no}: ${bolumBasliklari[mod.bolum_no] ?? ''}`, size: 20 })] })],
              borders: thinBorder,
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: result ? `${result.score}%` : '-', size: 20 })], alignment: AlignmentType.CENTER })],
              borders: thinBorder,
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({
                  text: result ? (result.passed ? 'Gecti' : 'Kaldi') : 'Tamamlanmadi',
                  size: 20,
                  color: result ? (result.passed ? '16A34A' : 'DC2626') : '9CA3AF',
                })],
                alignment: AlignmentType.CENTER,
              })],
              borders: thinBorder,
            }),
          ],
        })
      }),
    ]

    return [
      new Paragraph({
        text: 'GencYZ - Veli Bilgilendirme Raporu',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Tarih: ', bold: true, size: 22 }),
          new TextRun({ text: today, size: 22 }),
        ],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Sinif: ', bold: true, size: 22 }),
          new TextRun({ text: `${classInfo.name} (${classInfo.access_code})`, size: 22 }),
        ],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Ogrenci: ', bold: true, size: 22 }),
          new TextRun({ text: student.nickname, size: 22 }),
        ],
        spacing: { after: 300 },
      }),

      // Özet kutusu
      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: `Tamamlanan Modul: ${passedCount}/${assignedModules.length}`, size: 22 })] })],
                borders: noBorder,
              }),
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: `Ortalama Puan: ${avgScore > 0 ? `${avgScore}%` : '-'}`, size: 22 })] })],
                borders: noBorder,
              }),
            ],
          }),
        ],
        width: { size: 100, type: WidthType.PERCENTAGE },
      }),

      new Paragraph({ text: '', spacing: { after: 200 } }),

      new Paragraph({
        text: 'Modul Bazli Sonuclar',
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 200 },
      }),

      new Table({
        rows: tableRows,
        width: { size: 100, type: WidthType.PERCENTAGE },
      }),

      new Paragraph({ text: '', spacing: { after: 300 } }),

      new Paragraph({
        children: [
          new TextRun({
            text: 'Bu rapor GencYZ (gencyz.com) platformu tarafindan otomatik olusturulmustur.',
            size: 18,
            italics: true,
            color: '999999',
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
    ]
  })

  const doc = new Document({
    sections: sections.map((children) => ({
      children,
    })),
  })

  const buffer = await Packer.toBuffer(doc)
  const uint8 = new Uint8Array(buffer)
  const filename = studentId
    ? `rapor-${students[0]?.nickname ?? 'ogrenci'}.docx`
    : `rapor-${classInfo.name}.docx`

  return new NextResponse(uint8, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
    },
  })
}
