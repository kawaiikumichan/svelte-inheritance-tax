<script>
    import { taxResults } from './store/inheritanceStore';
    
    // --- 必要なコンポーネントをインポート ---
    // AssetInputはまだ作成していませんが、このApp.svelteで利用します。
    import AssetInput from './components/Input/AssetInput.svelte';
    import ResultSummary from './components/Output/ResultSummary.svelte';

    // ヘルパー関数：数値を万円表記に整形 (カンマ区切り)
    const formatYen = (amount) => {
        if (typeof amount !== 'number' || isNaN(amount)) return '0 万円';
        // 整数に丸めてカンマを付け、単位を付加
        return Math.round(amount).toLocaleString() + ' 万円';
    };

    // 結果の有無と、納税発生の有無を判定
    $: hasResults = $taxResults && $taxResults.finalTaxTotal !== undefined;
    $: isTaxDue = hasResults && $taxResults.finalTaxTotal > 0;
</script>

<main>
    <div class="simulator-container">
        <h1>📊 相続税 簡易シミュレーション</h1>
        <p class="description">
            現在の財産を入力し、相続税の概算と対策の必要性を確認します。
            （全て万円単位で入力してください）
        </p>

        <hr />

        <section class="input-form">
            <h2>📝 1. 財産と相続人情報</h2>
            <AssetInput />
        </section>
        
        <hr />

        <section class="result-display">
            <h2>💰 2. 概算結果</h2>

            {#if hasResults}
                <div class="summary-box" class:tax-due={isTaxDue}>
                    <h3>
                        {#if isTaxDue}
                            🚨 相続税が発生する可能性があります
                        {:else}
                            ✅ 相続税は発生しません
                        {/if}
                    </h3>
                    
                    <p class="final-tax">
                        {formatYen($taxResults.finalTaxTotal)}
                    </p>
                    
                    <ResultSummary results={$taxResults} formatYen={formatYen} />
                    
                    <p class="note">
                        ※ これは概算値であり、正確な税額は税理士にご相談ください。
                    </p>
                </div>

            {:else}
                <p class="no-result">計算に必要な情報を入力してください。</p>
            {/if}
        </section>
    </div>
</main>

<style>
    .simulator-container {
        max-width: 700px;
        margin: 0 auto;
        padding: 20px;
        font-family: 'Yu Gothic', 'Meiryo', sans-serif;
    }
    h1 { color: #004d40; border-bottom: 2px solid #004d40; padding-bottom: 10px; font-size: 1.8em; }
    h2 { color: #00796b; margin-top: 30px; font-size: 1.5em; }
    .description { font-size: 0.9em; color: #555; }
    
    .summary-box {
        background-color: #e8f5e9;
        border: 2px solid #c8e6c9;
        padding: 20px;
        border-radius: 8px;
    }
    .summary-box.tax-due {
        background-color: #ffebee;
        border-color: #ffcdd2;
    }
    .summary-box.tax-due h3 {
        color: #d32f2f;
    }
    
    .final-tax {
        font-size: 2.5em;
        color: #1a237e;
        font-weight: bold;
        margin: 10px 0;
    }
    .summary-box.tax-due .final-tax {
        color: #c62828;
    }

    .no-result { color: #f44336; font-weight: bold; }
    .note { font-size: 0.8em; color: #777; margin-top: 20px; }
    hr { border: 0; border-top: 1px dashed #ccc; margin: 30px 0; }
</style>
