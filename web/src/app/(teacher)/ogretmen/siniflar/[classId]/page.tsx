"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function SinifDetay() {
  const params = useParams();
  const classId = params.classId as string;
  // Mock school id for UI demonstration
  const schoolId = '11111111-1111-1111-1111-111111111111'; 

  const [csvText, setCsvText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    setLoading(true);
    setResult(null);
    try {
        const rows = csvText.split('\n').map(r => r.trim()).filter(r => r);
        const dataRows = rows[0].toLowerCase().includes('ad') ? rows.slice(1) : rows;
        
        const students = dataRows.map(row => {
            const cols = row.split(','); // simple comma split
            return {
                name: cols[0]?.trim(),
                password: cols[1]?.trim() || 'gencyz123'
            };
        }).filter(s => s.name);

        const res = await fetch('/api/schools/students/csv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ classId, schoolId, students })
        });
        const data = await res.json();
        setResult(data);
    } catch (err: any) {
        alert("Yükleme asnasında hata: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8">Sınıf Öğrencileri Yönetimi</h1>

      <div className="bg-white p-6 rounded-lg shadow border mb-8">
        <h2 className="text-xl font-semibold mb-4">CSV İle Toplu Öğrenci Ekle</h2>
        <p className="text-sm text-gray-600 mb-4">Format: Ad Soyad,Parola (Örn: Ali Yılmaz,elma123)</p>
        
        <textarea 
            value={csvText}
            onChange={e => setCsvText(e.target.value)}
            className="w-full h-32 border rounded p-3 mb-4 font-mono text-sm"
            placeholder="Ali Yilmaz,123456&#10;Ayse Demir,elmaarmut"
        ></textarea>

        <button 
            onClick={handleUpload} 
            disabled={loading || !csvText}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50 transition"
        >
            {loading ? 'Yükleniyor...' : 'Öğrencileri Yükle ve Hesap Oluştur'}
        </button>

        {result && (
            <div className={`mt-4 p-4 rounded border ${result.error ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
                {result.error ? (
                    <p><strong>Hata:</strong> {result.error}</p>
                ) : (
                    <div>
                        <p className="font-bold">{result.count} öğrenci başarıyla kaydedildi!</p>
                        {result.errors?.length > 0 && <p className="text-red-600 mt-2">{result.errors.length} öğrencide hata oluştu.</p>}
                        
                        <div className="mt-4 bg-white p-2 rounded border max-h-40 overflow-auto">
                            <p className="font-bold text-sm mb-2">Kurulan Hesaplar (Çıktıyı alın):</p>
                            {result.insertedStudents?.map((s:any, i:number) => (
                                <div key={i} className="text-xs border-b py-1 border-gray-200">
                                    Ad: <span className="font-semibold">{s.name}</span> | Parola: <span className="font-semibold">{s.password}</span> | Sistem Maili: {s.email}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
}
