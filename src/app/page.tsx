'use client';

import React, { useState, useEffect } from 'react';

interface Deal {
  $id: string;
  code: string;
  product: string;
  party: string;
  volume: string;
  stage: string;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'marketplace' | 'pipeline'>('marketplace');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDeals([
      {
        $id: '1',
        code: 'TFS1000-01',
        product: 'EN590 10 PPM',
        party: 'Global Energy Inc.',
        volume: '50,000 MT',
        stage: 'GELEN TEKLİF'
      },
      {
        $id: '2',
        code: 'TFS1000-02',
        product: 'Granular Sulfur',
        party: 'Petrotrans AG',
        volume: '25,000 MT',
        stage: 'LOI AŞAMASINDA'
      }
    ]);
  }, []);

  if (!mounted) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
        TradeFlow Yükleniyor...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans overflow-hidden">
      {/* Sol Menü */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col shrink-0 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
            TF
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight">TradeFlow</h1>
            <p className="text-[10px] text-gray-400 font-mono">Makonbi Danışmanlık</p>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'marketplace' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="w-5 text-center">📊</span> İlan Havuzu
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'pipeline' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="w-5 text-center">📑</span> İş Akışı & Teklifler
          </button>
        </nav>

        <div className="pt-4 border-t border-gray-100">
          <div className="text-[11px] font-medium text-gray-500">Gülali Kaya</div>
          <div className="text-[10px] text-gray-400">Genel Müdür</div>
        </div>
      </aside>

      {/* Ana İçerik */}
      <main className="flex-1 overflow-y-auto p-8 bg-[#f5f5f7]">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Hoş Geldiniz, Gülali Kaya</h2>
              <p className="text-xs text-gray-500 mt-1">Emtia Ticaret, Transit Brokerlik & Sözleşme Yönetim Portalı</p>
            </div>
            <div className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-xl border border-blue-100 font-mono">
              SISTEM AKTİF
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {deals.map((deal) => (
              <div key={deal.$id} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{deal.code}</span>
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-lg border border-amber-100">{deal.stage}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mt-3">{deal.product}</h3>
                  <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5">
                    <span>🏢</span> {deal.party}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5 font-mono">
                    <span>📦</span> {deal.volume}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => { setSelectedDeal(deal); setIsDrawerOpen(true); }}
                    className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                  >
                    Detaylar & Evraklar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detay Paneli (Drawer) */}
      {isDrawerOpen && selectedDeal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end animate-fadeIn">
          <div className="w-full max-w-md bg-white h-full p-8 shadow-2xl flex flex-col justify-between border-l border-gray-200">
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="font-bold text-lg text-gray-900">{selectedDeal.product}</h3>
                <button onClick={() => setIsDrawerOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold transition-colors">
                  ✕
                </button>
              </div>
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block mb-1">Referans Kod</span>
                  <strong className="font-mono text-sm">{selectedDeal.code}</strong>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block mb-1">Karşı Taraf / Muhatap</span>
                  <strong className="text-sm">{selectedDeal.party}</strong>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block mb-1">Hacim / Miktar</span>
                  <strong className="text-sm font-mono">{selectedDeal.volume}</strong>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setIsEditorOpen(true)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                <span>📄</span> LOI / FCO Belgesi Düzenle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evrak Düzenleyici Modal */}
      {isEditorOpen && selectedDeal && (
        <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-md z-[100] flex flex-col p-6 animate-fadeIn">
          <div className="max-w-3xl mx-auto w-full flex justify-between items-center mb-4">
            <h3 className="font-bold text-white text-sm tracking-wide">TİCARİ EVRAK EDİTÖRÜ ({selectedDeal.code})</h3>
            <button onClick={() => setIsEditorOpen(false)} className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors">
              Kapat ✕
            </button>
          </div>
          <div className="flex-1 bg-white text-gray-900 p-12 rounded-2xl overflow-y-auto font-serif shadow-2xl max-w-3xl mx-auto w-full">
            <div className="text-center border-b pb-6 mb-8">
              <h1 className="font-bold text-xl uppercase tracking-wider text-gray-900">LETTER OF INTENT (LOI)</h1>
              <p className="text-xs text-gray-400 mt-1 font-mono">MAKONBI DANIŞMANLIK A.Ş. TRADEFLOW SYSTEM</p>
            </div>
            
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div><strong>Commodity:</strong> {selectedDeal.product}</div>
                <div><strong>Quantity:</strong> {selectedDeal.volume}</div>
                <div><strong>Target Party:</strong> {selectedDeal.party}</div>
                <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
              </div>

              <div className="pt-4 space-y-3">
                <p>Dear Sirs,</p>
                <p>We, <strong>Makonbi Danışmanlık A.Ş.</strong> acting as broker/buyer mandate, hereby irrevocably confirm our capability and readiness to execute the transaction under corporate rules and international standards.</p>
                <p>This document serves as an official Letter of Intent for the procurement of the specified commodity subject to final contract terms and proof of product/funds verification.</p>
              </div>

              <div className="pt-16 grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="h-12 border-b border-dashed border-gray-400 mb-2"></div>
                  <strong>Gülali Kaya</strong><br/>
                  <span className="text-[10px] text-gray-500">General Manager</span>
                </div>
                <div>
                  <div className="h-12 border-b border-dashed border-gray-400 mb-2"></div>
                  <strong>Authorized Signature & Seal</strong><br/>
                  <span className="text-[10px] text-gray-500">Makonbi Danışmanlık A.Ş.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
