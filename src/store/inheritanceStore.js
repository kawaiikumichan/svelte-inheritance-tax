import { writable, derived } from 'svelte/store';
import { calculateTax } from '../utils/taxCalculator';

// ... (inputData の定義は変更なし) ...

// ----------------------------------------------------
// 2. Derived Store: 計算結果を保持
// ----------------------------------------------------
export const taxResults = derived(
    inputData,
    ($inputData) => {
        
        // ★修正箇所: 文字列をブール値に、数値を数値型に変換してデータを準備
        const processedData = {
            ...$inputData,
            // 'true' という文字列、または初期値の true をブール値に変換
            isSpouse: $inputData.isSpouse === 'true' || $inputData.isSpouse === true,
            isSmallLandApplied: $inputData.isSmallLandApplied === 'true' || $inputData.isSmallLandApplied === true,
            
            // 数値型の項目を明示的に変換（安全のため）
            assets: Number($inputData.assets || 0),
            realEstate: Number($inputData.realEstate || 0),
            lifeInsurance: Number($inputData.lifeInsurance || 0),
            debt: Number($inputData.debt || 0),
            heirsCount: Number($inputData.heirsCount || 0),
            spouseShare: Number($inputData.spouseShare || 0),
            smallLandValue: Number($inputData.smallLandValue || 0),
        };
        // ★修正箇所ここまで

        // 計算実行前の簡単なバリデーション (processedDataを使用)
        if (processedData.heirsCount <= 0 || (processedData.assets + processedData.realEstate) <= 0) {
            return null; // データが不十分な場合は計算しない
        }
        
        // utils/taxCalculator.jsで定義した計算関数を実行 (processedDataを渡す)
        return calculateTax(processedData);
    }
);
