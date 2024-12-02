<template>
    <div class="tip">{{content}}</div>
</template>

<script>

    export default {
        name: 'Tip',
        props: {
          content: String  
        },
    }
</script>

<style scoped>
   .tip{
       position: fixed;
       top: 40%;
       left: 50%;
       max-width: 70%;
       padding: 0.2rem 0.4rem;
       transform: translate(-50%,-50%);
       color: #fff;
       font-size: 0.32rem;
       line-height: 0.533333rem;
       background-color: rgba(0,0,0,0.7);
       border-radius: 0.933333rem;
       z-index: 30;
   }
</style>
