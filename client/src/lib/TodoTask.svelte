<script context="module" lang="ts">
  export type TODO = {
    id: number;
    title: string;
    created_at: any;
    completed_at?: any;
    due_date?: any;
    blank?: boolean;
    formatedCreateDate?: string;
    formatedCompleteDate?: string;
    dueDateObject?: any;
  };
</script>

<script lang="ts">
  import { DateInput } from 'date-picker-svelte';
  import SaveIconDark from '../assets/save-svgrepo-com-dark.svelte';
  import SaveIconLight from '../assets/save-svgrepo-com-light.svelte';
  import CheckIconDark from '../assets/check-svgrepo-com-dark.svelte';
  import CheckIconLight from '../assets/check-svgrepo-com-light.svelte';
  import DelIconDark from '../assets/cross-svgrepo-com-dark.svelte';
  import DelIconLight from '../assets/cross-svgrepo-com-light.svelte';

  import { darkMode } from './ThemeSwitch.svelte';

  console.log($darkMode);

  // could not get tailwind working. It's late. I'm just gonna do it in css, hope you don't mind

  export let todoObject: TODO;

  export let saveTask: any;
  export let deleteTask: any;
  export let createNewTask: any;
  export let checkOffTask: any;

  function save() {
    if (todoObject.dueDateObject !== null)
      todoObject.due_date = todoObject.dueDateObject.toISOString();

    if (!todoObject.blank) {
      if (saveTask) {
        saveTask(todoObject);
      }
      return;
    }

    if (createNewTask) createNewTask(todoObject);
  }
  function del() {
    if (deleteTask) deleteTask(todoObject.id);
  }

  function check() {
    if (checkOffTask) checkOffTask(todoObject.id);
  }
</script>

<tr class="TODO-task">
  <td class="TODO-title"
    ><div
      contenteditable="true"
      bind:textContent={todoObject.title}
      class="TODO-text TODO-editable"
    >
      {todoObject.title}
    </div>
  </td>
  <td class="TODO-date">
    <div contenteditable="false" class="TODO-text">
      {todoObject.formatedCreateDate}
    </div>
  </td>
  <td class="TODO-date">
    <div contenteditable="false" class="TODO-text">
      {todoObject.formatedCompleteDate}
    </div>
  </td>
  <td class="TODO-date">
    <DateInput
      bind:value={todoObject.dueDateObject}
      format=" dd/MM/yyyy  HH:mm:ss"
      placeholder=""
    />
  </td>

  <aside class="TODO-buttons">
    {#if $darkMode}
      <button on:click={check}>
        <CheckIconDark>check</CheckIconDark>
      </button>
      <button on:click={save}>
        <SaveIconDark></SaveIconDark>
      </button>
      <button on:click={del}>
        <DelIconDark></DelIconDark>
      </button>
    {:else}
      <button on:click={check}>
        <CheckIconLight>check</CheckIconLight>
      </button>
      <button on:click={save}>
        <SaveIconLight></SaveIconLight>
      </button>
      <button on:click={del}>
        <DelIconLight></DelIconLight>
      </button>
    {/if}
  </aside>
</tr>

<style>
  .TODO-text {
    cursor: initial;
    margin: 0px 20px;
    overflow: hidden;
    white-space: nowrap;
  }

  .TODO-editable {
    /*     background: #1b1e27;
  transition: 0.2s ease-in-out; */
    border: 1px solid rgba(103, 113, 137, 0.3);
    border-radius: 3px;
  }

  .TODO-buttons {
    display: none;
    float: right;
    z-index: 200;
    position: relative;
  }

  .TODO-buttons > button {
    margin-right: 5px;
  }

  .TODO-task:hover .TODO-buttons {
    display: flex;
  }

  .TODO-task {
    vertical-align: baseline;
  }
</style>
