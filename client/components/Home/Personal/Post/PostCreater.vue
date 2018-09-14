<template lang="html">
  <div class="PostSenderContainer">
    <img :src="user.profileImg" class="UserImg">
    <div class="EditerContainer">
      <div class="Editer" default-txt="有什麼新鮮事？" contenteditable @focus="editerFocusEventHandler" @blur="editerBlurEventHandler" @input="editerInputEventHandler">
        有什麼新鮮事？
      </div>
      <button type="button" class="btn PostBtn" :disabled="!inputContent.length" v-if="isEditerFocused" @mousedown="sendPostBtnClickEventHandler">發推</button>
    </div>
  </div>
</template>

<script>
import postAPI from '@/API/Post'

export default {
  name: 'PostSender',
  data () {
    return {
      user: this.$store.state.Auth.user,
      isEditerFocused: false,
      contentEl: null,
      inputContent: ''
    }
  },
  methods: {
    editerFocusEventHandler (e) {
      this.isEditerFocused = true
      this.contentEl = e.target

      if (e.target.innerText.trim() === e.target.getAttribute('default-txt')) {
        e.target.innerText = ''
      }
    },
    editerBlurEventHandler (e) {
      this.isEditerFocused = false

      if (!e.target.innerText.trim()) {
        e.target.innerText = e.target.getAttribute('default-txt')
      }
    },
    editerInputEventHandler (e) {
      this.inputContent = e.target.innerText.trim()
    },
    async sendPostBtnClickEventHandler (e) {
      let reg = new RegExp("\n","g");
      let res = await postAPI.SendPost({
          content: this.inputContent.replace(reg, '<br>')
        })

      if (!res.result || !res.post) {
        return
      }

      this.inputContent = ''
      this.contentEl.innerText = ''
      this.$emit('newPost', res.post)
    }
  }
}
</script>

<style lang="css" scoped>
.PostSenderContainer {
  border: 1px solid #e6ecf0;
  background-color: #E8F5FD;
  padding: 10px 12px;
  display: flex;
}

.UserImg {
  border-radius: 50%;
  overflow: hidden;
  width: 32px;
  height: 32px;
  left: 16px;
  position: relative;
  flex-shrink: 0;
}

.EditerContainer {
  position: relative;
  left: 26px;
  width: calc(100% - 65px);
  line-height: 20px;
}

.Editer {
  position: relative;
  width: 100%;
  color: #1DA1F2;
  background: #fff;
  border: 1px solid #C6E7FB;
  border-radius: 8px;
  padding: 8px;
  word-wrap: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  letter-spacing: 0.03em;
  cursor: text;
}

.Editer:focus {
  outline: none;
  height: 100px;
  max-height: none;
  word-wrap: break-word;
  overflow-y: scroll;
  white-space: normal;
}

.Editer:empty:focus:before {
  content: attr(default-txt);
  display: block;
  color: #aab8c2;
  position: relative;
}

.PostBtn {
  margin: 5px 3px 0 auto;
  border: 1px solid #1da1f2;
  color: #fff;
  background-color: #4AB3F4;
  padding: 2px 12px;
  font-size: 14px;
  border-radius: 100px;
  display: block;
}

.PostBtn.hide {
  display: none
}
</style>
