<template lang="tr">
    <PostForm :post="post" :submitForm="createPost" />
</template>
<script>
import PostForm from '@/components/PostForm.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
export default { 
    components: {
        PostForm,
    },
    setup() {
        const API_URL = 'http://localhost:5000/posts';
        const router = useRouter();

        const post = reactive({
            title: '',
            message: '',
            creator: '',
        });
    
        async function createPost() {
           const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });
            const json = await response.json();
            router.push({
                name: 'home',
            });
        }

        return { post, createPost };
    }
 }
</script>
<style lang="scss">
    
</style> 