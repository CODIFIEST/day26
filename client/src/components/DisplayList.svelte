<!-- // display the contents of the todo list -->
<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    import type {ToDo} from "../../../server/domain/toDo"
    let toDoList:ToDo[] = []
    async function getToDos() {
        const result = await axios.get("http://localhost:3000/todolist")
        console.log('results', result.data)
        return result.data
    }
    onMount(async () => {
        toDoList = await getToDos();

    });
</script>

{#each toDoList as toDo }
<div>
    To Do: {toDo.toDoItem}

</div>   
<div>
    Due Date: {toDo.dueDate}
</div>    
{/each}