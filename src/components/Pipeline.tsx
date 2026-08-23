'use client';

import React from 'react';

interface Deal {
  $id: string;
  code: string;
  product: string;
  party: string;
  volume: string;
  stage: string;
  fileId?: string;
}

interface PipelineProps {
  deals: Deal[];
  currentRole: string;
  userTradeflowId: string;
  onOpenDrawer: (deal: Deal) => void;
  onDeleteDeal: (id: string) => void;
}

export default function Pipeline({
  deals,
  currentRole,
  userTradeflowId,
  onOpenDrawer,
  onDeleteDeal
}: PipelineProps) {
  const filteredDeals = deals.filter((d) => {
    if (currentRole === 'supervisor') return true;
    if (d.code && d.code.startsWith(userTradeflowId)) return true;
    return false;
  });

  return (
    <div className="space-y-4 sm:space-y-6 h-full flex flex-col pb-24 md:pb-6">
      <div className="bg-apple-card dark:bg-apple-darkcard p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">İş Akışı & Teklifler</h2>
      </div>
      <div className="bg-apple-card dark:bg-apple-darkcard rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="px-3 sm:px-5 py-2 sm:py-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-[10px] sm:text-xs font-bold uppercase text-gray-500">Gelen Teklifler ve Aktif İlanlarınız</h2>
        </div>
        <div className="overflow-x-auto custom-scrollbar flex-1">
          <table className="w-full text-left whitespace-nowrap">
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-[10px] sm:text-xs">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 sm:p-10 text-center text-gray-500">
                    <i className="fa-solid fa-folder-open text-3xl sm:text-4xl mb-2 sm:mb-3 text-gray-300 dark:text-gray-600 block"></i>
                    <span className="text-xs sm:text-sm font-semibold">Aktif İşlem veya Teklif Yok</span>
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal) => {
                  const isOffer = deal.stage === 'GELEN TEKLİF';
                  return (
                    <tr
                      key={deal.$id}
                      onClick={() => onOpenDrawer(deal)}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${
                        isOffer ? 'bg-amber-50/30 dark:bg-amber-900/10' : ''
                      }`}
                    >
                      <td className={`p-3 sm:p-4 font-mono font-bold ${isOffer ? 'text-amber-600' : 'text-apple-blue'}`}>
                        {deal.code}
                      </td>
                      <td className="p-3 sm:p-4 font-medium text-gray-900 dark:text-white truncate max-w-[150px]">
                        {deal.product}
                      </td>
                      <td className="p-3 sm:p-4 text-gray-600 dark:text-gray-400 truncate max-w-[100px]">
                        <i className={`fa-solid ${isOffer ? 'fa-user-tag text-amber-500' : 'fa-building'} mr-1`}></i>
                        {deal.party}
                      </td>
                      <td className="p-3 sm:p-4">
                        <span
                          className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase ${
                            isOffer ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-apple-blue'
                          }`}
                        >
                          {deal.stage}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteDeal(deal.$id);
                          }}
                          className="text-[10px] sm:text-xs text-red-500 font-bold hover:underline"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}