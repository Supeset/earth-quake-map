<script lang="ts" setup>
const versions = ref('')
const DialogVisible = ref(false)
function open() {
  DialogVisible.value = true
}
async function fetchData() {
  versions.value = navigator.userAgent
}
onMounted(() => {
  fetchData()
})
defineExpose({
  open,
})
</script>

<template>
  <AModal v-model:visible="DialogVisible" :footer="false">
    <template #title>
      关于
    </template>
    <ASpace direction="vertical" align="center" class="w-full">
      <MapLogo />

      <ATypographyText>
        {{ versions }}
      </ATypographyText>
      <ATypographyText>
        技术栈
        <a
          class="link-text"
          href="https://maplibre.org/"
          target="_blank"
          rel="noreferrer"
        >@maplibre</a>
        <a
          class="link-text"
          href="https://nuxt.com/"
          target="_blank"
          rel="noreferrer"
        >Nuxt3</a>
      </ATypographyText>
      <ATypographyText>
        Made by  <a
          class="link-text"
          href="https://github.com/lanseria"
          target="_blank"
          rel="noreferrer"
        >@Lanseria</a> <a
          class="link-text"
          href="https://space.bilibili.com/8487409"
          target="_blank"
          rel="noreferrer"
        >@爱吃包子的超</a>
      </ATypographyText>
    </ASpace>
  </AModal>
</template>

<style lang="css" scoped>
.link-text {
  @apply text-primary hover:text-blueGray cursor-pointer mr-2;
}
</style>
