<script lang="ts">
        import axios from "axios";
    let toDoItem: string = "";
    let dueDate: string = "";
    let isCompleted:boolean = false;

    async function submitForm() {
        const result = await axios.post("http://localhost:3000/todolist", {
            toDoItem: toDoItem,
            dueDate: dueDate,
            isCompleted:isCompleted,
        });
        console.log(result);
    }
</script>

<div class="grid grid-cols-3 gap-4">
    <div class="form-control">
        <label for="todo" class="label">
            <span class="label-text">What do you need to do?</span>
        </label>
        <label class="input-group">
            <span>Task</span>
            <input
                bind:value={toDoItem}
                type="text"
                placeholder="Get up and find a broom"
                class="input input-bordered"
            />
        </label>
    </div>

    <div class="form-control">
        <label for="due" class="label">
            <span class="label-text">When does it have to be done?</span>
        </label>
        <label class="input-group">
            <span>Date</span>
            <input
                bind:value={dueDate}
                type="text"
                placeholder="Jan 12 1980"
                class="input input-bordered"
            />
        </label>
    </div>
    <div>
        <button
            class="btn btn-active btn-ghost"
            on:click={async () => {
                await submitForm();
            }}>Save my To Do item</button
        >
    </div>
</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
