'use client';

import React, { useState } from 'react';

interface DocEditorProps {
  isOpen: boolean;
  dealCode: string;
  product: string;
  party: string;
  volume: string;
  onClose: () => void;
  onSaveToCloud: (docType: string, htmlContent: string) => Promise<void>;
}

export default function DocEditor({
  isOpen,
  dealCode,
  product,
  party,
  volume,
  onClose,
  onSaveToCloud
}: DocEditorProps) {
  const [docType, setDocType] = useState('LOI');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSaving(true);
    const content = document.getElementById('a4-document')?.innerHTML || '';
    try {
      await onSaveToCloud(docType, content);
    } finally {
      setIsSaving(false);
    }
  };

  const titleMap: Record<string, string> = {
    LOI: 'LETTER OF INTENT (LOI)',
    SCO: 'SOFT CORPORATE OFFER (SCO)',
    FCO: 'FULL CORPORATE OFFER (FCO)'
  };

  return (
    <div className="fixed inset-0 bg-gray-900/95 z-[300] flex flex-col">
      <div className="h-16 bg-white dark:bg-apple-darkcard border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">İnteraktif Evrak Düzenleyici</h3>
            <p className="text-[10px] sm:text-xs text-gray-500">Mevcut şablonu tıklayarak değiştirebilirsiniz.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="bg-gray-100 dark:bg-gray-800 border-none rounded-lg p-2 text-xs sm:text-sm font-semibold outline-none cursor-pointer text-gray-900 dark:text-white"
          >
            <option value="LOI">LOI (Letter of Intent)</option>
            <option value="SCO">SCO (Soft Corporate Offer)</option>
            <option value="FCO">FCO (Full Corporate Offer)</option>
          </select>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i> Yükleniyor...
              </>
            ) : (
              <>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span className="hidden sm:inline">Buluta Kaydet</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-10 bg-gray-200 dark:bg-[#121212] flex justify-center custom-scrollbar">
        <div
          id="a4-document"
          className="a4-page"
          contentEditable
          suppressContentEditableWarning
        >
          <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', textTransform: 'uppercase' }}>GLOBAL TRADE LLC (ÖRNEK FİRMA)</h1>
            <p style={{ margin: 0, fontSize: '12px' }}>Maslak Mah. Büyükdere Cad. No:1, İstanbul</p>
            <p style={{ margin: 0, fontSize: '12px' }}>Email: info@firma.com | Tel: +90 555 123 45 67</p>
          </div>
          <p>
            <strong>Ref:</strong> {docType}-{dealCode}<br />
            <strong>Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline', margin: '30px 0', fontSize: '18px' }}>
            {titleMap[docType]}
          </div>
          <p>
            We, <strong>Global Trade LLC</strong>, acting with full corporate and legal responsibility, hereby issue this formal and irrevocable document for the specified transaction subject to mutual terms.
          </p>

          <table>
            <tbody>
              <tr><th style={{ width: '30%', border: '1px solid #000', padding: '8px', background: '#f3f4f6' }}>COMMODITY</th><td style={{ border: '1px solid #000', padding: '8px' }}>{product}</td></tr>
              <tr><th style={{ width: '30%', border: '1px solid #000', padding: '8px', background: '#f3f4f6' }}>TARGET PARTY</th><td style={{ border: '1px solid #000', padding: '8px' }}>{party}</td></tr>
              <tr><th style={{ width: '30%', border: '1px solid #000', padding: '8px', background: '#f3f4f6' }}>QUANTITY</th><td style={{ border: '1px solid #000', padding: '8px' }}>{volume}</td></tr>
              <tr><th style={{ width: '30%', border: '1px solid #000', padding: '8px', background: '#f3f4f6' }}>DELIVERY</th><td style={{ border: '1px solid #000', padding: '8px' }}>FOB / CIF Turkey (Incoterms® 2020)</td></tr>
              <tr><th style={{ width: '30%', border: '1px solid #000', padding: '8px', background: '#f3f4f6' }}>PAYMENT</th><td style={{ border: '1px solid #000', padding: '8px' }}>100% Irrevocable DLC / SBLC</td></tr>
            </tbody>
          </table>

          <div style={{ marginTop: '50px' }}>
            <p><strong>AUTHORIZED SIGNATORY</strong></p>
            <p>Authorized Representative<br />Global Trade LLC</p>
          </div>
        </div>
      </div>
    </div>
  );
}