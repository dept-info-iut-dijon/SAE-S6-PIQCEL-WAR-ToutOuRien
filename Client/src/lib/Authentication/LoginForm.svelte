<script lang="ts">
    export let isGuest: boolean = false;
</script>

<div class="container-connection">
    <h1>Connexion</h1>
    {#if isGuest}
        <p>En tant qu'invité</p>
    {/if}
    {#if !isGuest}
        <p>À partir d'un compte</p>
    {/if}
    <a href="/guest">Se connecter en tant qu'invité</a>
    <a href="/login">Se connecter à partir d'un compte</a>
</div>

<style>
    .container-connection {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 90vh;
    }

    .container-connection a {
        padding: .5em;
        background-color: gray;
        text-decoration: none;
        color: black;
    }

    .container-connection h1 {
        margin-bottom: 1em;
    }

    .container-connection a {
        margin-bottom: 2em;
    }
</style>