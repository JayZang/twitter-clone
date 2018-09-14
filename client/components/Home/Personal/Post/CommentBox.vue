<template lang="html">
  <div class="PostCommentSenderContainer" @click.stop="">
    <div class="CommentSenderBox">
      <div class="BoxHeader">
        <div class="CloseBtn" @click.stop="closeBtnClickEventHandler">
          <span>x</span>
        </div>
        <div class="BoxTitle">
          <span>
            回覆給 <slot name="Title"></slot>
          </span>
        </div>
      </div>
      <div class="BoxContent">
        <div class="LeftSide">
          <div class="ProfileImg">
            <slot name="ProfileImg"></slot>
          </div>
        </div>
        <div class="RightSide">
          <div class="Info">
            <div class="Name">
              <slot name="Name"></slot>
            </div>
            <div class="UserId">
              @<span class="id"><slot name="Account"></slot>
              </span>
            </div>
            <div class="Date">
              <slot name="Date"></slot>
            </div>
          </div>
          <div class="Content">
            <slot name="PostContent"></slot>
          </div>
        </div>
      </div>
      <div class="BoxReplyContainer">
        <div class="EditerContainer">
          <div class="Editer" default-txt="推你的回覆" contenteditable @input="editerInputEventHandler"></div>
          <button type="button" class="btn ReplyBtn" :disabled="!inputContent.length" @mousedown="replyBtnClickEventHandler">回覆</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commentAPI from '@/API/Comment'

export default {
  name: 'PostCommentBox',
  props: ['postID'],
  data () {
    return {
      inputContent: ''
    }
  },
  methods: {
    closeBtnClickEventHandler (e) {
      this.$emit('Close')
    },
    editerInputEventHandler (e) {
      this.inputContent = e.target.innerText.trim()
    },
    async replyBtnClickEventHandler (e) {
      let res = await commentAPI.SendCommentToPost(this.postID, {
          content: this.inputContent
        })

      if (!res.result) {
        console.log(res)
        return
      }

      this.$emit('ReplySuccess', res.comments)
      this.$emit('Close')
    }
  }
}
</script>

<style lang="css" scoped>
.PostCommentSenderContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: auto;
}

.CommentSenderBox {
  position: relative;
  max-width: 590px;
  margin: 0 auto;
  background-color: white;
  top: 20%;
  border-radius: 6px
}

.BoxHeader {
  padding: 12px;
  border-bottom: 1px solid #e6ecf0;
}

.BoxTitle {
  width: 75%;
  margin: 0 auto;
  overflow: hidden;
  font-size: 18px;
  font-weight: bold;
  line-height: 24px;
  color: #14171a;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.CloseBtn {
  position: absolute;
  right: 15px;
  color: #657786;
  font-size: 18px;
  line-height: 18px;
  cursor: pointer;
}

.BoxContent {
  padding: 9px 12px;
  min-height: 51px;
  border-bottom: 1px solid #e6ecf0;
  display: flex;
}

.LeftSide {
  width: 48px;
  margin-right: 10px;
  flex-shrink: 0;
}

.ProfileImg {
  width: 100%;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.ProfileImg img {
  width: 100%;
}

.RightSide {
  flex-grow: 1;
}

.Info {
  display: flex;
}

.Info .Name {
  word-break: break-all;
  font-size: 14px;
  font-weight: bold;
}

.Info .UserId,
.Info .Date {
  font-size: 14px;
  color: #657786;
  margin: 0 5px;
}

.Content {
  font-size: 14px;
  line-height: 20px;
}

.EditerContainer {
  position: relative;
  line-height: 20px;
  background: rgba(0,132,180,0.1);
  padding: 12px;
}

.Editer {
  position: relative;
  width: 100%;
  color: #1DA1F2;
  background: #fff;
  border: 1px solid #C6E7FB;
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  letter-spacing: 0.03em;
  min-height: 80px;
}

.Editer:focus {
  outline: none;
}

.Editer:empty:before {
  content: attr(default-txt);
  display: block;
  color: #aab8c2;
  position: relative;
}

.ReplyBtn {
  margin: 5px 3px 0 auto;
  border: 1px solid #1da1f2;
  color: #fff;
  background-color: #4AB3F4;
  padding: 2px 12px;
  font-size: 14px;
  border-radius: 100px;
  display: block;
}
</style>
