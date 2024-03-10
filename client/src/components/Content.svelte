<script lang="ts">
  import TodoTask from '../lib/TodoTask.svelte';
  import TODO from '../lib/TodoTask.svelte';

  let todos: any[];

  async function loadData() {
    // CHANGE PORT HERE
    const data = await fetch('http://localhost:3000/todo');
    todos = await data.json();

    console.log(todos);
  }

  loadData();
</script>

<main>
  <table class="TODO-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Created At</th>
        <th>Completed At</th>
        <th>Due Date</th>
      </tr>
      <!-- hacky solution for spacing between table rows. I'm tired so this has to do for now-->
      <tr style="height: 20px"> </tr>
    </thead>

    {#if todos && todos.length}
      {#each todos as todo}
        <TodoTask todoObject={todo}></TodoTask>
      {/each}
    {/if}
  </table>
</main>

<style>
  .TODO-table {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .TODO-table thead {
    font-weight: bold;
  }
</style>
