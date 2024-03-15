<script lang="ts">
    type ButtonProps = {
        text: string;
        onclick?: () => void;
    }

    let {text, onclick = () => {}} = $props<ButtonProps>();
</script>

<button on:click={onclick}>{text}</button>

<style>
    button {
        width: fit-content;
        min-width: 6em;
        min-height: 1.4em;
        margin: .8em;
        padding: .3em;
        padding-left: 1em;
        padding-right: 1em;
        border-radius: .5em;
        border: 2px solid #394961;
        transition: all .1s ease-out;
        font-size: 1.02em;
    }
    button:hover {
        transform: scale(1.05);
        cursor: pointer;
    }
</style>