<template>
  <div class="main-card card">
    <div class="card-header">
      <h3 class="card-title">
        {{title}}
      </h3>
      <div class="card-header-actions">
        <v-btn icon small @click="$emit('helpClick')">
          <img :src="helpIcon" />
        </v-btn>
      </div>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>
<script>
  import helpIcon from '@/assets/images/ques.png'

  export default {
    name: 'MainCard',
    props: {
      title: { type: String, default: '' },
    },
    data() {
      return {
        helpIcon,
      }
    }
  }
</script>