<script>
    import { inputData } from '../../store/inheritanceStore';

    // ストアのデータをローカル変数にバインド（双方向バインディングを実現）
    let data = $inputData;

    // inputDataを直接バインドする方法もあるが、ここではローカル変数経由で$ストアを更新
    $: $inputData = data;
</script>

<div class="input-card">
    <h3>👨‍👩‍👧‍👦 相続人情報</h3>
    <div class="form-group">
        <label for="heirsCount">法定相続人の人数</label>
        <input 
            type="number" 
            id="heirsCount" 
            bind:value={data.heirsCount} 
            min="1" 
            required
            class="short-input"
        />
        <span class="unit-text">人 (配偶者を含めた人数)</span>
    </div>

    <div class="form-group">
        <label for="isSpouse">配偶者の有無</label>
        <select id="isSpouse" bind:value={data.isSpouse} class="select-input">
            <option value="true">あり</option>
            <option value="false">なし</option>
        </select>
    </div>

    {#if data.isSpouse}
    <div class="form-group sub-group">
        <label for="spouseShare">配偶者の取得予定割合</label>
        <input 
            type="number" 
            id="spouseShare" 
            bind:value={data.spouseShare} 
            min="0" 
            max="100" 
            class="short-input"
        />
        <span class="unit-text">%</span>
    </div>
    {/if}

    <hr>
    
    <h3>💰 財産の評価 (万円単位)</h3>

    <div class="form-group">
        <label for="assets">現金・預貯金など</label>
        <input type="number" id="assets" bind:value={data.assets} min="0" />
        <span class="unit-text">万円</span>
    </div>

    <div class="form-group">
        <label for="realEstate">不動産評価額</label>
        <input type="number" id="realEstate" bind:value={data.realEstate} min="0" />
        <span class="unit-text">万円 (固定資産税評価額などを想定)</span>
    </div>
    
    <div class="form-group">
        <label for="lifeInsurance">生命保険金・死亡退職金</label>
        <input type="number" id="lifeInsurance" bind:value={data.lifeInsurance} min="0" />
        <span class="unit-text">万円 (合計額)</span>
    </div>

    <div class="form-group">
        <label for="debt">債務・葬式費用</label>
        <input type="number" id="debt" bind:value={data.debt} min="0" />
        <span class="unit-text">万円 (合計額)</span>
    </div>

    <hr>
    
    <h3>🛡️ 節税のための特例</h3>
    
    <div class="form-group">
        <label for="isSmallLandApplied">小規模宅地等の特例を考慮しますか？</label>
        <select id="isSmallLandApplied" bind:value={data.isSmallLandApplied} class="select-input">
            <option value="true">はい (適用を考慮する)</option>
            <option value="false">いいえ</option>
        </select>
    </div>
    
    {#if data.isSmallLandApplied}
    <div class="form-group sub-group">
        <label for="smallLandValue">特例を適用する土地の評価額</label>
        <input 
            type="number" 
            id="smallLandValue" 
            bind:value={data.smallLandValue} 
            min="0" 
        />
        <span class="unit-text">万円 (減額前の評価額)</span>
    </div>
    <p class="note">※ 特例適用後の評価額は、計算ロジックで自動的に減額されます（80%減額を想定）。</p>
    {/if}
</div>

<style>
/* ... (スタイルは変更なし) ... */
</style>
