<script lang="ts">
  let darkMode = false;

  const theme = localStorage.getItem('theme');

  if (theme == 'dark') {
    darkMode = true;
    document.documentElement.classList.add('dark');
  }

  function handleSwitchDarkMode() {
    darkMode = !darkMode;

    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    darkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }
</script>

<div>
  <input
    type="checkbox"
    checked={darkMode}
    id="theme-toggle"
    on:click={handleSwitchDarkMode}
  />
  <label for="theme-toggle" />
</div>

<style lang="postcss">
  #theme-toggle {
    @apply invisible;
  }

  #theme-toggle + label {
    @apply inline-block cursor-pointer h-12 w-12 absolute bottom-6 right-12 rounded-full duration-300 content-[''];
  }

  #theme-toggle:not(:checked) + label {
    @apply bg-amber-400;
  }

  #theme-toggle:checked + label {
    @apply bg-transparent;
    box-shadow: inset -18px -16px 1px 1px #ddd;
  }
</style>
