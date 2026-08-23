'use client';

import React, { useState, useEffect } from 'react';

interface Deal {
  $id: string;
  code: string;
  product: string;
  party: string;
  volume: string;
  stage: string;
  fileId?: string;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'marketplace' | 'pipeline'>('marketplace');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [role, setRole] = useState<'broker' | 'supervisor'>('broker');
  const [tradeflowId, setTradeflowId] = useState('TFS1000');

  useEffect(() => {
    setMounted(true);
    // Örnek statik veri ile istemci hatasını tamamen önlüyoruz
    setDeals([
      {
        $id: '1',
        code: 'TFS1000-01',
        product: 'EN590 10 PPM',
        party: 'Global Energy Inc.',
        volume: '50,000 MT',
        stage: 'GELEN TEKLİF'
      }
    ]);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f5f5f7] dark:bg-black text-gray-500 text-sm font-semibold">
        TradeFlow Yükleniyor...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f5f5f7] dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7]">
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1c1c1e] flex flex-col shrink-0 p-4">
        <h1 className="font-bold text-lg text-blue-600 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-handshake"></i> TradeFlow
        </h1>
        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activeTab === 'marketplace' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <i className="fa-solid fa-layer-group"></i> İlan Havuzu
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
              activeTab === 'pipeline' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <i className="fa-solid fa-list-check"></i> İş Akışı & Teklifler
          </button>
        </nav>
        <div className="text-[10px] text-gray-400">ID: {tradeflowId}</div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1c1c1e] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-bold mb-2">Hoş Geldiniz, Gülali Kaya</h2>
            <p className="text-xs text-gray-500">Makonbi Danışmanlık A.Ş. Emtia Ticaret & İş Akışı Portalı</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deals.map((deal) => (
              <div key={deal.$id} className="bg-white dark:bg-[#1c1c1e] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <span className="text-xs font-mono font-bold text-blue-600">{deal.code}</span>
                <h3 className="text-base font-bold mt-1">{deal.product}</h3>
                <p className="text-xs text-gray-500 mt-1"><i className="fa-solid fa-building mr-1"></i> {deal.party}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-md">{deal.stage}</span>
                  <button 
                    onClick={() => { setSelectedDeal(deal); setIsDrawerOpen(true); }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    İncele
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isDrawerOpen && selectedDeal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-[#1c1c1e] h-full p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">{selectedDeal.product}</h3>
                <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-red-500 font-bold">
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-2 font-mono">Kod: {selectedDeal.code}</p>
              <p className="text-xs text-gray-500 mb-2">Firma: {selectedDeal.party}</p>
              <p className="text-xs text-gray-500">Miktar: {selectedDeal.volume}</p>
            </div>
            <button 
              onClick={() => setIsEditorOpen(true)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-file-lines"></i> LOI / FCO Belgesi Düzenle
            </button>
          </div>
        </div>
      )}

      {isEditorOpen && selectedDeal && (
        <div className="fixed inset-0 bg-gray-900/95 z-[300] flex flex-col p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white text-base">Evrak Düzenleyici ({selectedDeal.code})</h3>
            <button onClick={() => setIsEditorOpen(false)} className="text-white hover:text-red-400">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          <div className="flex-1 bg-white text-black p-10 rounded-xl overflow-y-auto font-serif shadow-2xl max-w-3xl mx-auto w-full">
            <h1 className="text-center font-bold text-xl mb-4 uppercase">LETTER OF INTENT (LOI)</h1>
            <p className="mb-4"><strong>Commodity:</strong> {selectedDeal.product}</p>
            <p className="mb-4"><strong>Quantity:</strong> {selectedDeal.volume}</p>
            <p className="mb-4"><strong>Target Party:</strong> {selectedDeal.party}</p>
            <p className="text-sm mt-10">We confirm our capability and readiness to execute the transaction subject to terms.</p>
          </div>
        </div>
      )}
    </div>
  );
}
