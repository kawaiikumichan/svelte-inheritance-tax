<script>
    // App.svelteから渡されるプロパティをエクスポート
    export let results; // 計算結果オブジェクト
    export let formatYen; // 数値整形関数
</script>

<div class="summary-details">
    <h3>内訳 (概算)</h3>

    <div class="detail-row">
        <span class="label">基礎控除額</span>
        <span class="value">{formatYen(results.basicDeduction)}</span>
    </div>
    <div class="detail-row">
        <span class="label">相続税課税対象の財産合計（控除・特例適用前）</span>
        <span class="value">{formatYen(results.totalTaxableAssets)}</span>
    </div>

    <div class="detail-row total">
        <span class="label">課税遺産総額 (基礎控除を引いた金額)</span>
        <span class="value">{formatYen(results.taxableEstateTotal)}</span>
    </div>
    
    <h4 class="sub-header">適用された主な特例と控除の影響</h4>
    
    <div class="detail-row sub-row">
        <span class="label">小規模宅地特例による減額</span>
        <span class="value deduction">-{formatYen(results.landDeduction)}</span>
    </div>
    
    <div class="detail-row sub-row">
        <span class="label">配偶者の税額軽減 (配偶者控除)</span>
        <span class="value deduction">適用により納税額を軽減</span>
    </div>

    <hr class="separator">

    <h4 class="sub-header">最終的な各人の納税額概算</h4>
    <div class="detail-row final-tax-row">
        <span class="label">配偶者を除く法定相続人の納税額合計</span>
        <span class="value final-value">{formatYen(results.taxOthers)}</span>
    </div>
    <div class="detail-row final-tax-row">
        <span class="label">配偶者の納税額（概算）</span>
        <span class="value final-value">{formatYen(results.taxSpouse)}</span>
    </div>
    
</div>

<style>
    .summary-details {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px dashed #ccc;
    }
    h3 {
        color: #1a237e; /* Dark Blue */
        margin-top: 0;
        margin-bottom: 15px;
        font-size: 1.2em;
        padding-bottom: 5px;
        border-bottom: 1px solid #e0e0e0;
    }
    h4 {
        color: #555;
        font-size: 1em;
        margin-top: 20px;
        margin-bottom: 10px;
        font-weight: bold;
    }
    .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px dotted #eee;
    }
    .label {
        font-size: 0.9em;
        flex: 1;
        padding-right: 10px;
    }
    .value {
        font-weight: 500;
        font-size: 0.95em;
        color: #333;
        text-align: right;
        flex-shrink: 0;
    }
    .total {
        padding-top: 12px;
        font-weight: bold;
        border-top: 2px solid #ddd;
        border-bottom: 2px solid #ddd;
    }
    .total .value {
        color: #c62828; /* Red for important totals */
        font-size: 1.1em;
    }
    .deduction {
        color: #00796b; /* Green for deduction/benefit */
    }
    .sub-row {
        padding-left: 15px;
        font-size: 0.9em;
        color: #777;
    }
    .final-tax-row {
        font-weight: bold;
        padding-top: 5px;
        border: none;
    }
    .final-value {
        color: #1a237e;
    }
    .separator {
        margin: 15px 0;
        border: 0;
        border-top: 1px dashed #eee;
    }
</style>