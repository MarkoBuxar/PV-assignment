<script lang="ts">
  import NewButton from '../lib/NewButton.svelte';
  import TodoTask from '../lib/TodoTask.svelte';
  import moment from 'moment';

  // CHANGE API LINK HERE
  export const api = 'http://localhost:3000';

  let todos: any[];

  async function loadData() {
    todos = [];

    const data = await fetch(api + '/todo');
    todos = await data.json();

    todos.map((object) => {
      object.formatedCreateDate = object.created_at
        ? moment(object.created_at).format('DD/MM/yyyy  HH:mm:ss')
        : '';
      object.formatedCompleteDate = object.completed_at
        ? moment(object.completed_at).format('DD/MM/yyyy  HH:mm:ss')
        : '';

      object.dueDateObject = object.due_date ? new Date(object.due_date) : null;
    });
  }

  async function createEmptyTask() {
    todos = [
      ...todos,
      {
        title: '',
        created_at: '',
        completed_at: '',
        due_date: '',
        blank: true,
        formatedCreateDate: '',
        formatedCompleteDate: '',
        dueDateObject: null,
      },
    ];
  }

  async function createNewTask(todoObject: TodoTask) {
    if (!todoObject.title) return;

    const finalData: any = { title: todoObject.title };

    if (todoObject.due_date) finalData.due_date = todoObject.due_date;

    const data = await fetch(api + '/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData),
    });

    loadData();
  }

  async function deleteTask(id: number) {
    if (typeof id !== 'undefined' && typeof id !== null) {
      const data = await fetch(api + '/todo/' + id, {
        method: 'delete',
      });
    }

    todos = todos.filter((obj) => obj.id !== id);
  }

  async function saveTask(todoObject: TodoTask) {
    const finalData: any = {};
    if (todoObject.title) finalData.title = todoObject.title;
    if (todoObject.due_date) finalData.due_date = todoObject.due_date;

    const data = await fetch(api + '/todo/' + todoObject.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData),
    });
  }

  async function checkOffTask(id: number) {
    const data = await fetch(api + '/check/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    loadData();
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
        <TodoTask
          todoObject={todo}
          {deleteTask}
          {saveTask}
          {createNewTask}
          {checkOffTask}
        ></TodoTask>
      {/each}
    {/if}

    <NewButton newTask={createEmptyTask}></NewButton>
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
