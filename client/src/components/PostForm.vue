<template lang="tr">
    <div class="app-form" @submit.prevent="submitForm">
        
        <form>
            <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="post.title" placeholder="Enter title">
        </div>

        <div class="form-group">
            <label for="message">Content</label>
            <textarea id="message" v-model="post.message" placeholder="Enter message"></textarea>
        </div>

        <div class="form-group">
            <label for="creator">Creator</label>
            <input type="text" id="creator" v-model="post.creator" placeholder="Enter creator">
        </div>

        <button type="submit">Submit</button>

        </form>

    </div>
</template>
<script>
export default {
    props: ['post', 'submitForm'],
}
</script>
<style lang="scss">
    
</style>