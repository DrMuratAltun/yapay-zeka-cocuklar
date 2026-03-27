"use client";

import { useEffect, useState } from 'react';

export default function SuperAdminOkullar() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', quota_students: 110, quota_teachers: 5 });

  const fetchSchools = async () => {
    setLoading(true);
    const res = await fetch('/api/schools');
    const data = await res.json();
    if (res.ok) setSchools(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/schools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
        setFormData({ name: '', quota_students: 110, quota_teachers: 5 });
        fetchSchools();
    } else {
        const err = await res.json();
        alert('Hata: ' + err.error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8 text-black">Sistem Yöneticisi: Okul ve Kota Yönetimi</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md border mb-8 text-black">
        <h2 className="text-xl font-semibold mb-4 text-black">Yeni Özel Okul Tanımla</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Okul Adı</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded p-2" placeholder="Örn: ABC Koleji" />
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium mb-1">Öğrenci Kotası</label>
            <input required type="number" value={formData.quota_students} onChange={e => setFormData({...formData, quota_students: Number(e.target.value)})} className="w-full border rounded p-2" />
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium mb-1">Öğretmen Kotası</label>
            <input required type="number" value={formData.quota_teachers} onChange={e => setFormData({...formData, quota_teachers: Number(e.target.value)})} className="w-full border rounded p-2" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition h-[42px]">
            Oluştur
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-700">Okul Adı</th>
              <th className="p-4 font-semibold text-slate-700">Öğrenci Kotası</th>
              <th className="p-4 font-semibold text-slate-700">Öğretmen Kotası</th>
              <th className="p-4 font-semibold text-slate-700">Durum</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-4 text-center">Okullar yükleniyor...</td></tr>
            ) : schools.map(school => (
              <tr key={school.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4 font-medium">{school.name}</td>
                <td className="p-4">{school.quota_students} Öğrenci</td>
                <td className="p-4">{school.quota_teachers} Öğretmen</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${school.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {school.status === 'active' ? 'Aktif' : 'Askıda'}
                  </span>
                </td>
              </tr>
            ))}
            {!loading && schools.length === 0 && (
              <tr><td colSpan={4} className="p-4 text-center text-gray-500">Sistemde B2B satışı yapılmış okul bulunmamaktadır.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
