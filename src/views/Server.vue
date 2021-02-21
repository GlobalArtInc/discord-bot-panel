<template>
  <div class="about">
    <h1>{{ guild }}</h1>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {checkGuild} from "@/bot";

export default {
  computed: {
    ...mapGetters(['guild'])
  },
  mounted() {
    checkGuild(this.$route.params.id).then(() => {
      this.$store.dispatch('bot/setGuild', this.$route.params.id)
    });
  }
}
</script>
