<!-- // display the contents of the todo list -->
<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    import type { ToDo } from "../../../server/domain/toDo";
    let toDoList: ToDo[] = [];
    async function getToDos() {
        const result = await axios.get("http://localhost:3000/todolist");
        console.log("results", result.data);
        return result.data;
    }
    onMount(async () => {
        toDoList = await getToDos();
    });
</script>
<div class = "container">
{#each toDoList as toDo}

        <div class="grid grid-cols-2 gap-4">
            <div class="todo-line">
                To Do: {toDo.toDoItem}
            </div>
            <div class="todo-line">
                Due Date: {toDo.dueDate}
            </div>
        </div>

{/each}
</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    .todo-line {
        text-align: left;
    }
    .container {
        padding:inherit;
       
    }
</style>
