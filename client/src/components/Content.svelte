<script lang="ts">
  import { create } from 'lodash';
  import NewButton from '../lib/NewButton.svelte';
  import TodoTask from '../lib/TodoTask.svelte';
  import TODO from '../lib/TodoTask.svelte';

  export const api = 'http://firelink.shrine:3000';

  let todos: any[];

  async function loadData() {
    // CHANGE PORT HERE
    const data = await fetch(api + '/todo');
    todos = await data.json();

    console.log(todos);
  }

  async function createTask() {
    console.log('working');
    todos = [
      ...todos,
      { title: '', created_at: '', completed_at: '', due_date: '' },
    ];
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

    <NewButton newTask={createTask}></NewButton>
  </table>
</main>

<style>
  .TODO-table {
    width: 100%;
    table-layout: fixed;
  }

  .TODO-table thead {
    font-weight: bold;
  }

  th {
    width: 25%;
  }
</style>
