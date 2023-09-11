<template>
  <div class="footer">
    Copyright @ 2019 <a href="#"><img :src="logo" alt="NetEdge Logo" /></a> All Rights Reserved.
  </div>
</template>

<script>
import logo from '../assets/images/netedge-logo.png';

export default {
  data() {
    return {
      logo: logo
    };
  },
  name: 'AppFooter'
}
</script>

<style lang="scss" scoped>
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    background-color: #fff;
    padding: 8px 15px 3px 20px;
    font-size: 13px;
    color: #2e4a9b;
    font-family: 'Segoe UI';

    img {
      max-width: 65px;
      margin: 0 5px;
    }
  }
</style>