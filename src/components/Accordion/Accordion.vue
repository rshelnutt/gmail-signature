<template>
  <AccordionRoot class="w-full rounded-md bg-gray-200 shadow-[0_2px_10px] shadow-black/5" default-value="step-1" type="single" :collapsible="true">
    <AccordionItem 
        class="mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow" 
        :value="panel.key"
        v-for="panel in accordionPanels" :key="panel"
    >
        <AccordionHeader class="flex">
        <AccordionTrigger class="group flex h-[45px] flex-1 cursor-pointer items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none">
            <span>{{ panel.title }}</span>
            <Icon
            icon="radix-icons:chevron-down"
            class="text-purple-500 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
            aria-label="Expand/Collapse"
            />
        </AccordionTrigger>
        </AccordionHeader>

        <AccordionContent class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
        <div class="px-5 py-4">
            <component :is="panel" />
        </div>
        </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue"
  import { AccordionRoot } from 'radix-vue'
  import AccordionPanel from '@/components/Accordion/AccordionPanel.vue'

    const allPanels = computed(() => useSlots().default())

    const accordionPanels = computed(() => {
        if (allPanels.value?.length === 1) {
            if (allPanels.value[0]?.type?.toString() === "Symbol(v-fgt)") {
                return allPanels.value[0].children?.filter(
                    (node) => node.type.__name === "AccordionPanel"
                )
            }
        }

        return allPanels.value?.filter(
            (node) => node.type.__name === "AccordionPanel"
        )
    })
</script>
