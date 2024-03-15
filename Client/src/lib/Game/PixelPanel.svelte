<script lang="ts">
    import Button from "$lib/Button.svelte";
    import { pixelSelected } from "$lib/Game/Stores/PixelSelected";

    export let AddPixel: () => Promise<void>;

    let colorPicker: string = "#FFFFFF";
    let isCooldown: boolean = false;
    let timeOfCooldownRemaining: number = 0;
    let plural: string;

    $: plural = timeOfCooldownRemaining <= 1 ? "" : "s";
    $: if ($pixelSelected != null) {
        $pixelSelected.Color = colorPicker;
    }

    /**
     * Cool down the user for a certain duration after a pixel has been added
     */
    function StartCooldown(duration: number) {
        isCooldown = true;
        timeOfCooldownRemaining = duration;
        const interval = setInterval(() => {
            timeOfCooldownRemaining -= 1;
            if (timeOfCooldownRemaining <= 0) {
                clearInterval(interval);
                isCooldown = false;
            }
        }, 1000);
    }

    /**
     * Validate the pixel selection and add it to the canvas
     */
    async function ValidatePixelSelection(): Promise<void> {
        if ($pixelSelected != null) {
            await AddPixel();
            $pixelSelected = null;
            StartCooldown(5);
        }
    }

    /**
     * Cancel the pixel selection
     */
    function CancelPixelSelection(): void {
        $pixelSelected = null;
    }
</script>

<div class="container">
    <div class="text">
        {#if isCooldown === true}
            <p>Attend {timeOfCooldownRemaining} seconde{plural}, merci 😊</p>
        {:else if $pixelSelected == null}
            <p>Sélectionne un pixel 🚀!</p>
        {:else}
            <p>Change de couleur 🖌️️et valide 👌</p>
        {/if}
    </div>
    <div class="button-container" style:pointer-events={isCooldown ? 'none' : 'auto'}>
        <Button text="Valider" onclick={ValidatePixelSelection}></Button>
        <Button text="Annuler" onclick={CancelPixelSelection}></Button>
        <input id="input-color" style:pointer-events={'auto'} type="color" bind:value={colorPicker} />
    </div>
</div>

<style>
    .container {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        z-index: 1;
        background-color: lightgray;
        padding: .9em;
        border-top-left-radius: .7em;
        border-top-right-radius: .7em;
        border: 2px solid #394961;
        user-select: none;
        font-size: 1em;
        width: 20em;
    }

    .text {
        text-align: center;
    }

    .button-container {
        display: flex;
        justify-content: space-evenly;
    }


    #input-color {
        margin-top: 8px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: transparent;
        width: 3.25em;
        height: 3.25em;
        border: none;
        cursor: pointer;
    }

    #input-color::-webkit-color-swatch {
        border-radius: 2em;
        border: 2px solid #394961;
    }

    #input-color::-moz-color-swatch {
        border-radius: 2em;
        border: 2px solid #394961;
    }
</style>
