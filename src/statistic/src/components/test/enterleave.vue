<template>
  <div>
    <div ref="parent">
      <div ref="children">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'test',
  created() {
    console.log('created')
  }
}
</script>