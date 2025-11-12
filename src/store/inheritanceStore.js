import { writable, derived } from 'svelte/store';
import { calculateTax } from '../utils/taxCalculator';

// ----------------------------------------------------
// 1. Writable Store: ユーザー入力データを保持
//    (初期値は60代一般層の平均的なケースを想定)
// ----------------------------------------------------
export const inputData = writable({
    // 財産情報 (全て万円単位)
    assets: 5000,           // 現金・預貯金など
    realEstate: 3000,       // 不動産評価額
    lifeInsurance: 1000,    // 生命保険金・退職金
    debt: 0,                // 債務・葬式費用

    // 相続人情報
    heirsCount: 3,          // 法定相続人の人数 (配偶者1 + 子2 を想定)
    isSpouse: true,         // 配偶者の有無
    spouseShare: 50,        // 配偶者の取得予定割合 (%)

    // 特例情報
    isSmallLandApplied: true, // 小規模宅地等の特例を適用するか
    smallLandValue: 3000,   // 特例対象の土地評価額 (万円)
});

// ----------------------------------------------------
// 2. Derived Store: 計算結果を保持
// ----------------------------------------------------
// inputDataが変更されると、calculateTaxを実行し結果を更新
export const taxResults = derived(
    inputData,
    ($inputData) => {
        // 計算実行前の簡単なバリデーション
        if ($inputData.heirsCount <= 0 || ($inputData.assets + $inputData.realEstate) <= 0) {
            return null; // データが不十分な場合は計算しない
        }
        
        // utils/taxCalculator.jsで定義した計算関数を実行
        return calculateTax($inputData);
    }
);