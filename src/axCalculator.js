// 相続税速算表
// 課税遺産額の法定相続分に応じる取得金額 (万円)
const TAX_RATES = [
    { threshold: 1000, rate: 0.10, deduction: 0 },
    { threshold: 3000, rate: 0.15, deduction: 50 },
    { threshold: 5000, rate: 0.20, deduction: 200 },
    { threshold: 10000, rate: 0.30, deduction: 700 },
    { threshold: 20000, rate: 0.40, deduction: 1700 },
    { threshold: 30000, rate: 0.45, deduction: 2700 },
    { threshold: 60000, rate: 0.50, deduction: 4200 },
    { threshold: Infinity, rate: 0.55, deduction: 7200 }
];

/**
 * 相続税の計算を行うメイン関数
 * @param {object} data - inheritanceStoreから受け取る入力データ
 * @returns {object} - 計算結果
 */
export function calculateTax(data) {
    // すべて万円単位で計算するため、入力値を万単位に変換（必要に応じて）
    const assets = Number(data.assets || 0);
    const realEstate = Number(data.realEstate || 0);
    const lifeInsurance = Number(data.lifeInsurance || 0);
    const debt = Number(data.debt || 0);
    const heirsCount = Number(data.heirsCount || 0);
    const isSpouse = data.isSpouse;
    const isSmallLandApplied = data.isSmallLandApplied;
    const smallLandValue = Number(data.smallLandValue || 0);
    const spouseShare = Number(data.spouseShare || 0) / 100;

    // 1. 基礎控除額の計算
    const basicDeduction = 3000 + (600 * heirsCount);

    // 2. 非課税財産の計算 (生命保険金・退職金)
    const insuranceExemption = 500 * heirsCount;
    const taxableInsurance = Math.max(0, lifeInsurance - insuranceExemption);

    // 3. 課税価格の合計額の計算 (特例適用前)
    let totalTaxableAssets = assets + realEstate + taxableInsurance - debt;

    // 4. 小規模宅地等の特例の適用 (一般ユーザー向けに簡易適用 - 自宅80%減額を想定)
    let landDeduction = 0;
    let finalRealEstate = realEstate;

    if (isSmallLandApplied && smallLandValue > 0) {
        // 80%減額を適用
        landDeduction = smallLandValue * 0.8;
        // 減額後の課税価格を計算
        totalTaxableAssets -= landDeduction;
        finalRealEstate = realEstate - landDeduction;
    }

    // 5. 課税遺産総額の計算
    const taxableEstateTotal = Math.max(0, totalTaxableAssets - basicDeduction);

    // 6. 相続税の総額の計算 (法定相続分で分けたと仮定して計算)
    let taxTotal = 0;
    if (taxableEstateTotal > 0) {
        // 法定相続分で分けたと仮定した、一人当たりの課税遺産額
        const assumedShare = taxableEstateTotal / heirsCount;

        // 税率表を参照して税額を計算
        const taxRateData = TAX_RATES.find(rate => assumedShare <= rate.threshold);
        if (taxRateData) {
            const taxPerHeir = (assumedShare * taxRateData.rate) - taxRateData.deduction;
            // 総額 = 一人当たりの税額 × 法定相続人の数
            taxTotal = Math.max(0, taxPerHeir) * heirsCount;
        }
    }

    // 7. 各相続人の納税額の概算 (配偶者控除の適用)
    let taxSpouse = 0;
    let taxOthers = taxTotal;

    if (isSpouse && taxTotal > 0) {
        // 配偶者の取得予定額に基づく、配偶者に按分される税額
        const spouseTaxShare = taxTotal * spouseShare;

        // 簡易シミュレーションとして、配偶者が法定相続分か1.6億円以下を取得する場合は納税額0円と仮定
        const spouseShareAmount = totalTaxableAssets * spouseShare;
        const spouseTaxableThreshold = 16000; // 1億6,000万円 (万円単位)

        if (spouseShareAmount <= spouseTaxableThreshold || spouseShare <= (1 / heirsCount)) {
            taxSpouse = 0;
            // 配偶者控除により、配偶者に按分される税額分を総額から控除
            taxOthers = Math.max(0, taxTotal - spouseTaxShare);
        } else {
            // 例外的なケース（ここでは簡略化のため、按分された税額をそのまま適用）
            taxSpouse = spouseTaxShare;
            taxOthers = taxTotal - taxSpouse;
        }
    }

    // 結果オブジェクトを返す
    return {
        basicDeduction: Math.round(basicDeduction),
        totalTaxableAssets: Math.round(totalTaxableAssets),
        taxableEstateTotal: Math.round(taxableEstateTotal),
        taxTotal: Math.round(taxTotal),
        
        taxSpouse: Math.round(taxSpouse),
        taxOthers: Math.round(taxOthers),
        finalTaxTotal: Math.round(taxSpouse + taxOthers),
        
        landDeduction: Math.round(landDeduction),
        finalRealEstate: Math.round(finalRealEstate),
    };
}