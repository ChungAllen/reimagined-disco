<template>
    <form @submit.prevent="onSubmit">
    <h2 class="label-wrapper">
        <label for="newtodoform" class="label__lg">create a To DO item</label>
    </h2>
    <input type="text" id="newtodoform" v-model.lazy.trim="newtask" class="input__lg"/>
        <button type="submit" class="btn btn__primary btn__lg">Add</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            newtask: "",
        }
    },

    methods: {
        onSubmit () {
            if (this.newtask === "") {
                return;
            }
            this.$emit('task-added', this.newtask);
            this.newtask = "";
        }
    },

}
</script>
