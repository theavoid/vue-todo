<template lang="tr">
    
    <div class="cards">
         
        <div class="card" v-for="post in posts" :key="post._id">
        
            <div class="card-header">
                <h3 class="card-title">{{post.title}}</h3>
            </div>

            <div class="card-body">
                <p>{{post.message}}</p>
            </div>

            <div class="card-author">
                <p>{{post.creator}}</p>
            </div>

            <div class="card-footer">
                <button @click="editPost(post._id)">Edit</button>
                <button @click="removePost(post._id)" class="danger">Delete</button>
            </div>
            
        </div>

    </div>

</template>
<script>
import { onMounted } from 'vue';
import { ref } from 'vue';
import {useRouter} from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const posts = ref([]);
        onMounted(async () => {
            const response = await fetch('http://localhost:5000/posts');
            posts.value = await response.json();
            posts.value = posts.value.reverse();
        });

        async function removePost(_id) {
            await fetch(`http://localhost:5000/posts/${_id}`, {
                method: 'DELETE',
            });
            posts.value = posts.value.filter((post) => post._id !== _id);
        }

        async function editPost(_id) {
            router.push({
                name: 'Update',
                params: { id:_id },
            });
        }

        return { posts, removePost, editPost };
    },
}
</script>
<style lang="scss">
    
</style>