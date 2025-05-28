<template>
  <!-- Transition entre les pages, avec un p’tit effet fade -->
  <transition name="fade" mode="out-in">
    <!-- Ici c’est la magie de Vue Router : chaque page s’affiche ici -->
    <router-view />
  </transition>
</template>

<script setup>
  // Rien à foutre ici pour l’instant
  // Le routing se fait tout seul via <router-view>
</script>
