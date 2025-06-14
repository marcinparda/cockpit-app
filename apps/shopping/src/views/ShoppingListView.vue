<script setup lang="ts">
import { InputText, Button } from '@cockpit-app/shared/vue-ui';
import { useShoppingList } from '../composables/useShoppingList';
import ShoppingList from '../components/ShoppingList.vue';

const { shoppingItems, newItemTitle, addShoppingItem, ...shoppingListMethods } =
  useShoppingList();
</script>

<template>
  <div>
    <div>
      <InputText
        v-model="newItemTitle"
        placeholder="Add a new item"
        @keyup.enter="addShoppingItem"
      />
      <Button @click="addShoppingItem"> Add to list </Button>
    </div>
    <ShoppingList :items="shoppingItems" v-bind="shoppingListMethods" />
  </div>
</template>
