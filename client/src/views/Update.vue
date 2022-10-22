<template lang="tr">
    <PostForm :post="post" :submitForm="updatePost" />
</template>
<script>
import PostForm from '@/components/PostForm.vue';
import { useRouter, useRoute } from 'vue-router';
import {ref, onMounted} from 'vue';

export default {
    components: {
        PostForm,
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const API_URL = 'http://localhost:5000/posts';

        const post = ref({
            title: '',
            message: '',
            creator: '',
        });

        onMounted(() => {
            getPost()
        })

        async function getPost() {
            const { id } = route.params;
            const response = await fetch(`${API_URL}/${id}`);
            post.value = await response.json();
        }

        async function updatePost() {
            const { id } = route.params;
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post.value),
            });
            router.push({
                name: 'home',
            });
        }

        return { post, updatePost };
    }
} 
</script>
<style lang="scss">
    
</style>