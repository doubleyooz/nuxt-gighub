<template>
  <div
    class="flex flex-col gap-6 w-full justify-between p-6 border border-slate-100 rounded-lg"
  >
    <div class="flex w-full items-center justify-between">
      <span>Metamask</span>

      <app-button
        class="small ml-2"
        size="large"
        :variant="buttonVariant"
        :loading="isLoading"
        img="/images/metamask.png"
        :text="address ? 'Unlink wallet' : 'Link wallet'"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface WalletEmits {
  (e: "remove:wallet", address: string): void;
  (e: "update:wallet"): void;
}

export interface WalletComponentType {
  address: string | null;
  isLoading?: boolean;
}

const emit = defineEmits<WalletEmits>();

const props = withDefaults(defineProps<WalletComponentType>(), {
  address: null,
  isLoading: false,
});

const { address } = toRefs(props);

const buttonVariant = computed(() => (address.value ? "error" : "secondary"));

const handleClick = () => {
  if (address.value) {
    emit("remove:wallet", address.value);
  } else {
    emit("update:wallet"); // if it succeeds it updates the stored wallet
  }
};
</script>

<style scoped lang="scss">
.item {
  border-radius: 8px;
  .label {
    gap: 16px;
    position: relative;
    .tooltip-box {
      position: absolute;
      top: -20px;

      visibility: hidden;

      background-color: #eaebec;
      border: #828486 solid 1px;
      color: rgb(93, 104, 114);
      caret-color: rgb(93, 104, 114);
      border-radius: 2px;
      z-index: 999;
      text-transform: none;

      transition: visibility 0s;
      .tooltiptext {
        font-size: 10px;
        font-weight: 500;
        text-align: center;
        color: rgb(93, 104, 114);
        caret-color: rgb(93, 104, 114);
      }
    }

    &:hover {
      .tooltip-box {
        transition-delay: 1s;
        visibility: visible;
      }
    }

    img {
      max-width: 32px;
      max-height: 32px;
    }

    span {
      font-size: 16px;
      font-weight: bold;
      line-height: 22px;
    }
  }
}
.hide {
  display: none;
}
@media (max-width: 420px) {
  .item {
    flex-direction: row-reverse;
    justify-content: center !important;
    align-items: center;

    .label {
      display: none;
      img {
        display: none;
      }
      span {
        display: none;
      }
    }

    .small {
      display: block;

      .hide {
        display: block;
        max-width: 32px;
        max-height: 32px;
      }
      .tooltip-box {
        position: absolute;
        top: -20px;
        margin-inline: auto;
        visibility: hidden;

        background-color: #eaebec;
        border: #828486 solid 1px;

        border-radius: 2px;
        z-index: 999;

        transition: visibility 0s;
        .tooltiptext {
          font-size: 10px;
          text-align: center;
        }
      }

      &:hover {
        background-color: rgb(162, 238, 187);
        .tooltip-box {
          transition-delay: 1s;
          visibility: visible;
        }
      }
    }

    .unlink {
      &:hover {
        background-color: rgb(253, 145, 145);
      }
    }
  }
}
</style>
