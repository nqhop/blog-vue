<script lang="ts" setup>
import { useModal } from '../composables/modal';

const modal = useModal();
</script>
<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <button class="button" @click="modal.showModal()">Sign Up</button>
                        <RouterLink to="/posts/new" class="button"
                            >New Post</RouterLink
                        >
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <Teleport to="#modal">
        Content to be rendered
    </Teleport>
</template>
