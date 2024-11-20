<template>
  <div>
    <textarea
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '')"
      @blur="$emit('blur')"
      :value="modelValue"
      :class="[
        'caja',
        {
          'border-red-500': error,
        },
      ]"
    ></textarea>
    <span class="text-red-400" v-show="error">{{ error }}</span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue?: string | number;
  error?: string;
}

withDefaults(defineProps<Props>(), {});

defineEmits(['update:modelValue', 'blur']);
</script>

<style scoped>
.caja {
  @apply shadow h-32 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
