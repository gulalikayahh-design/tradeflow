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

interface MarketplaceProps {
  deals: Deal[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenOffer: (code: string) => void;
  onOpenDrawer: (deal: Deal) => void;
  onOpenNewDeal: () => void;
}

export default function Marketplace({
  deals,
  favorites,
  onToggleFavorite,
  onOpenOffer,
  onOpenDrawer,
  onOpenNewDeal
}: MarketplaceProps) {
  const supplies = deals.filter((d) => d.stage && d.stage.includes('SATIŞ'));
  const demands = deals.filter((d) => d.stage && d.stage.includes('ALIM'));
  const allOffers = deals.filter((d) => d.stage === 'GELEN TEKLİF');

  const renderCard = (deal: Deal, isSupply: boolean) => {
    const isFav = favorites.includes(deal.$id);
    const offerCount = allOffers.filter((o) => o.code === deal.code).length;

    return (
      <div
        key={deal.$id}
        className="bg-white dark:bg-apple-darkcard p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-2 sm:gap-3 transition-transform hover:scale-[1.01]"
      >
        <div className="flex justify-between items-start">
          <div className="overflow-hidden pr-2">
            <div className="flex items-center mb-1">
              <span className="text-[9px] sm:text-[10px] text-gray-400 font-mono">{deal.code}</span>
              {offerCount > 0 && (
                <span className="bg-amber-100 text-amber-700 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md ml-2 border border-amber-200 shadow-sm">
                  <i className="fa-solid fa-bell mr-1"></i> {offerCount} Teklif
                </span>
              )}
            </div>
            <h4
              onClick={() => onOpenDrawer(deal)}
              className="font-bold text-sm sm:text-base text-gray-900 dark:text-white cursor-pointer hover:text-apple-blue truncate w-full"
            >
              {deal.product}
            </h4>
          </div>
          <span
            className={`font-bold text-xs sm:text-sm whitespace-nowrap ${
              isSupply ? 'text-emerald-600' : 'text-blue-600'
            }`}
          >
            {deal.volume}
          </span>
        </div>
        <div className="flex gap-2 mt-1 sm:mt-2 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => onToggleFavorite(deal.$id)}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 transition-colors"
          >
            <i
              className={`fa-solid fa-heart text-sm sm:text-lg ${
                isFav ? 'text-red-500' : 'text-gray-400'
              }`}
            ></i>
          </button>
          <button
            onClick={() => onOpenOffer(deal.code)}
            className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold text-[10px] sm:text-xs rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <i className="fa-solid fa-paper-plane"></i> Teklif İlet
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-24 md:pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-apple-card dark:bg-apple-darkcard p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">İlan Havuzu</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Küresel arz ve talep panosu</p>
        </div>
        <button
          onClick={onOpenNewDeal}
          className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 bg-apple-blue text-white font-medium text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
        >
          <i className="fa-solid fa-bullhorn"></i> İlan Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl sm:rounded-2xl border border-emerald-100 dark:border-emerald-800/30 p-3 sm:p-5">
          <h3 className="text-sm sm:text-lg font-bold text-emerald-700 dark:text-emerald-500 mb-3 sm:mb-4 border-b border-emerald-200 dark:border-emerald-800/50 pb-2 flex items-center gap-2">
            <i className="fa-solid fa-arrow-up-right-dots"></i> SATIŞ İLANLARI (ARZ)
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {supplies.length > 0 ? (
              supplies.map((deal) => renderCard(deal, true))
            ) : (
              <p className="text-xs sm:text-sm text-gray-500">Aktif satış ilanı yok.</p>
            )}
          </div>
        </div>

        <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl sm:rounded-2xl border border-blue-100 dark:border-blue-800/30 p-3 sm:p-5">
          <h3 className="text-sm sm:text-lg font-bold text-blue-700 dark:text-blue-500 mb-3 sm:mb-4 border-b border-blue-200 dark:border-blue-800/50 pb-2 flex items-center gap-2">
            <i className="fa-solid fa-arrow-down-long"></i> ALIM İLANLARI (TALEP)
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {demands.length > 0 ? (
              demands.map((deal) => renderCard(deal, false))
            ) : (
              <p className="text-xs sm:text-sm text-gray-500">Aktif alım talebi yok.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}