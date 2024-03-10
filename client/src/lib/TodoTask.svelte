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
  <td class="TODO-title"
    ><div contenteditable={editable} class="TODO-text">
      {todoObject.title}
    </div>
  </td>
  <td class="TODO-date">
    <div contenteditable={editable} class="TODO-text">
      {todoObject.created_at}
    </div>
  </td>
  <td class="TODO-date">
    <div contenteditable={editable} class="TODO-text">
      {todoObject.completed_at}
    </div>
  </td>
  <td class="TODO-date">
    <div contenteditable={editable} class="TODO-text">
      {todoObject.due_date}
    </div>
  </td>
</tr>

<style>
  .TODO-text {
    cursor: initial;
    margin: 0px 20px;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
