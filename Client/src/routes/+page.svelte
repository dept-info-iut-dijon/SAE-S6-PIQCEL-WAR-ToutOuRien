<script lang="ts">
    import GameView from "$lib/Game/Game.svelte";
    import {game} from "$lib/Game/GameStore";
</script>

<GameView game={game}></GameView>

<style>
    :global(html, body) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>