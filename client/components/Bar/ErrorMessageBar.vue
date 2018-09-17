<template lang="html">
  <div class="ErrorMessageBarContainer">
    <div class="alert alert-danger" v-if="text">
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessageBar',
  props: ['text', 'displayTime'],
  computed: {
    timeout: function () {
      return Number(this.displayTime) ? Number(this.displayTime) : null
    }
  },
  created() {
    if (this.timeout) {
      this.startTimeToClose()
    }
  },
  methods: {
    startTimeToClose() {
      if (!this.timeout) {
        return
      }

      setTimeout(() => {
        this.$emit('close')
      }, this.timeout)
    }
  }
}
</script>

<style lang="css" scoped>
.ErrorMessageBarContainer {
  position: fixed;
  left: 50%;
  top: 15%;
  width: 100%;
  max-width: 600px;
  padding: 0 10px;
  z-index: 1000;
  transform: translateX(-50%);
}

.alert {
  box-shadow: 1px 2px 10px;
}
</style>
