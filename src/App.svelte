<script lang="ts">
  import Guide from "./components/Guide.svelte";
  import Playground from "./components/Playground.svelte";
  import _ from "lodash";
  let navOpen = false;
  export let menu = 2;
  function handleNav() {
    navOpen = !navOpen;
    // 		navWidth === 0 ? navWidth = 40 : navWidth = 0;
    console.log("clicked", navOpen);
  }
</script>

<svelte:head>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@300&family=Montserrat&display=swap");
  </style>
</svelte:head>

<main>
  <div>
    <nav class="nav">
      <div class:change={navOpen} class="hamburger" on:click={handleNav}>
        <span class="line" />
        <span class="line" />
        <span class="line" />
      </div>

      {#if navOpen === false}
        <div class="nav__link hide">
          <a href="/" on:click|preventDefault={() => (menu = 1)}>Playground</a>
        </div>
        <a href="/" class="logo">FinScrape</a>
        <div class="nav__link hide">
          <a href="/" on:click|preventDefault={() => (menu = 2)}>Guide</a>
        </div>
      {:else if navOpen === true}
        <div class="nav__link">
          <a href="/" on:click|preventDefault={() => (menu = 1)}>Playground</a>

          <a href="/" on:click|preventDefault={() => (menu = 2)}>Guide</a>
        </div>
      {/if}
    </nav>
    <div />
  </div>
  {#if menu === 1}
    <Playground />
  {:else if menu === 2}
    <Guide />
  {:else}
    <h1>Page Not Found</h1>
  {/if}
</main>

<style>
  main {
    background-color: #222222;
    color: white;
    height: 100%;
  }

  h1 {
    color: #81a1c1;
    font-family: "Merriweather", sans-serif;
    padding: 20px;
  }

  .nav {
    justify-content: center;
    align-items: center;
    background-color: #2e3440;
    height: 80px;
  }

  .logo {
    font-size: 1.8rem;
    color: #88c0d0;
    padding: 20px;
    justify-content: center;
  }

  .hamburger {
    padding-right: 20px;
    cursor: pointer;
  }

  .hamburger .line {
    max-width: 400px;
    display: block;
    width: 40px;
    height: 5px;
    margin-bottom: 10px;
    background-color: white;
  }

  .nav__link {
    position: fixed;
    max-width: 400px;
    width: 94%;
    top: 5rem;
    left: 18px;
    background-color: #222222;
  }

  .nav__link a {
    display: block;
    text-align: center;
  }

  .nav__link a:hover {
    text-transform: underline;
    color: #88c0d0;
  }

  .hide {
    display: none;
  }

  @media screen and (min-width: 600px) {
    .nav__link {
      display: block;
      position: static;
      width: auto;
      margin-right: 20px;
      background: none;
    }

    .nav__link a {
      display: inline-block;
      padding-left: 20px;
      color: white;
    }

    .hamburger {
      display: none;
    }
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
