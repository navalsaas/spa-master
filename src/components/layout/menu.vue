<script>
export default {
  name: 'Menu'
}
</script>

<template>
  <div class="list-group list-group-flush">
    <router-link :to="{name: 'dashboard' }" class="list-group-item list-group-item-action bg-light">Dashboard</router-link>
    <router-link :to="{name: 'tasks' }" class="list-group-item list-group-item-action bg-light">Tarefas Essenciais</router-link>
    <router-link :to="{name: 'notes' }" class="list-group-item list-group-item-action bg-light">Anotações</router-link>
    <router-link :to="{name: 'goals' }" class="list-group-item list-group-item-action bg-light">Objetivos</router-link>
    <router-link :to="{name: 'streaks' }" class="list-group-item list-group-item-action bg-light">Streaks</router-link>
    <router-link :to="{name: 'gratitude-diaries' }" class="list-group-item list-group-item-action bg-light">Diário de Gratidão</router-link>
  </div>
</template>
