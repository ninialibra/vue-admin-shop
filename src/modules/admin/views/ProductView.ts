import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    console.log('Hola Mundo');

    return {
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    };
  },
});
