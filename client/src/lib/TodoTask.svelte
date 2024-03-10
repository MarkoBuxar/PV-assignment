<script context="module" lang="ts">
  export type TODO = {
    title: string;
    created_at: any;
    completed_at?: any;
    due_date?: any;
  };
</script>

<script lang="ts">
  // could not get tailwind working. It's late. I'm just gonna do it in css, hope you don't mind

  export let todoObject: TODO;
  export let editable = true;
</script>

<tr class="TODO-task">
  <td class="TODO-title">{todoObject.title}</td>
  <td class="TODO-date">{todoObject.created_at}</td>
  <td class="TODO-date">{todoObject.completed_at}</td>
  <td class="TODO-date">{todoObject.due_date}</td>
</tr>

<style lang="postcss">
  .TODO-task td {
    height: 50px;
    padding: 20px 0;
    border-bottom: 1px solid #aaa;
  }

  .TODO-task thead {
    border-bottom: 0px;
  }
</style>
