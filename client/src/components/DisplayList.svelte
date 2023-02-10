<!-- // display the contents of the todo list -->
<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    import type { ToDo } from "../../../server/domain/toDo";
    // import { initializeApp } from "firebase/app";
    // import { doc, setDoc } from "firebase/firestore";
    let toDoList: ToDo[] = [];
    async function getToDos() {
        const result = await axios.get("http://localhost:3000/todolist");
        console.log("results", result.data);
        return result.data;
    }
    onMount(async () => {
        toDoList = (await getToDos()) as any as ToDo[];
        toDoList.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    });
    async function removeItem(id) {
        const result = await axios.post("http://localhost:3000/removeitem", {
            id: id,
        });
        location.reload();
        return false;
    }
    async function markCompleted(id) {
       const result = await axios.post("http://localhost:3000/toggleCompleted", {
        id: id
       });
    }
</script>

<div class="container">

    {#each toDoList as toDo}
    
    {#if !toDo.isCompleted }
        
   
        <div class="grid grid-cols-4 gap-4">

            <div> 
                <button id={toDo.id}
                    on:click={async () => {

                        await removeItem(`${toDo.id}`);
                        location.reload();
                        return false;
                    }}>Delete Forever</button
                >

            </div>
            <div>
                <button on:click={async() =>{
                    await markCompleted(`${toDo.id}`);
                     location.reload();
                        return false;
                }}>Mark complete</button>
            </div>
            <div class="todo-line">
                To Do: {toDo.toDoItem}
            </div>
            <div class="todo-line">
                Due Date: {new Date(toDo.dueDate).toDateString().slice(0, 16)}
            </div>
        </div>
        
        {/if}
    {/each}


</div>
<div class="container">
    <h1>COMPLETED TASKS</h1>
    {#each toDoList as toDo}
    
    {#if toDo.isCompleted }
     
   
        <div class="grid grid-cols-4 gap-4">

            <div> 
                <button id={toDo.id}
                    on:click={async () => {

                        await removeItem(`${toDo.id}`);
                        location.reload();
                        return false;
                    }}>Delete Forever</button
                >

            </div>
            <div>
                <button on:click={async() =>{
                    await markCompleted(`${toDo.id}`);
                     location.reload();
                        return false;
                }}>Mark complete</button>
            </div>
            <div class="todo-line-faded">
                To Do: {toDo.toDoItem}
            </div>
            <div class="todo-line-faded">
                Due Date: {new Date(toDo.dueDate).toDateString().slice(0, 16)}
            </div>
        </div>
        
        {/if}
    {/each}

</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    .todo-line {
        text-align: left;
    }
        .todo-line-faded {
        text-align: left;
        color: rgb(121, 121, 121);
    }
    .container {
        padding: inherit;
    }
</style>
