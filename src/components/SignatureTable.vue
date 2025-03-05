<template>
  <table
    :style="{
      textIndent: '0',
      borderCollapse: 'collapse',
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
      border: '0 solid',
    }"
  >
    <tbody
      :style="{ display: 'table-row-group', boxSizing: 'border-box', margin: '0', padding: '0' }"
    >
      <tr :style="{ display: 'table-row', boxSizing: 'border-box', margin: '0', padding: '0' }">
        <td
          width="392px"
          height="185px"
          :style="{ display: 'table-cell', boxSizing: 'border-box', margin: '0', padding: '0' }"
        >
          <div
            :style="[
              { backgroundColor: 'white', padding: '10px 0 10px 10px', height: '185px' },
              { padding: '10px'}
            ]"
          >
            <table
              :style="{
                textIndent: '0',
                borderCollapse: 'collapse',
                boxSizing: 'border-box',
                margin: '0',
                padding: '0',
                border: '0 solid',
                width: '100%',
                height: '100%',
              }"
            >
              <tbody
                :style="{
                  display: 'table-row-group',
                  boxSizing: 'border-box',
                  margin: '0',
                  padding: '0',
                }"
              >
                <tr
                  :style="{
                    display: 'table-row',
                    boxSizing: 'border-box',
                    margin: '0',
                    padding: '0',
                  }"
                >
                  <td
                    width="126px"
                    :style="{
                      display: 'table-cell',
                      boxSizing: 'border-box',
                      margin: '0',
                      padding: '0',
                    }"
                    v-if="props.avatarUrl"
                  >
                    <img
                      :style="{ marginRight: '12px', display: 'inline', verticalAlign: 'top' }"
                      :src="props.avatarUrl"
                    />
                  </td>

                  <td :style="{ boxSizing: 'border-box', margin: '0', padding: '0', verticalAlign: 'top' }">
                    <table
                      :style="{
                        textIndent: '0',
                        borderCollapse: 'collapse',
                        boxSizing: 'border-box',
                        margin: '0',
                        padding: '0',
                        border: '0 solid',
                      }"
                    >
                      <tbody
                        :style="{
                          display: 'table-row-group',
                          boxSizing: 'border-box',
                          margin: '0',
                          padding: '0',
                        }"
                      >
                        <tr
                          :style="{
                            display: 'table-row',
                            boxSizing: 'border-box',
                            margin: '0',
                            padding: '0',
                          }"
                        >
                          <td
                            :style="{
                              display: 'table-cell',
                              boxSizing: 'border-box',
                              margin: '0',
                              padding: '0',
                              verticalAlign: 'top'
                            }"
                          >
                            <p
                              :style="{
                                display: 'block',
                                color: 'black',
                                fontSize: '24px',
                                lineHeight: '1',
                                fontFamily: 'Century Gothic, Andale Mono, Helvetica, Verdana',
                                boxSizing: 'border-box',
                                margin: '0 0 12px',
                                padding: '0',
                              }"
                            >
                              {{ props.name }}
                            </p>
                            <div
                              :style="{ boxSizing: 'border-box', margin: '0 0 12px', padding: '0' }"
                              v-if="props.title"
                            >
                              <span
                                :style="{
                                  display: 'inline-block',
                                  color: 'white',
                                  backgroundColor: '#ff2200',
                                  padding: '4px 8px',
                                  fontSize: '16px',
                                  fontWeight: 'bold',
                                  letterSpacing: '0.0125em',
                                  lineHeight: '1',
                                  textTransform: 'uppercase',
                                  fontFamily: 'Trebuchet MS, CenturyGothic, Helvetica, Verdana',
                                }"
                              >
                                {{ props.title }}
                              </span>
                            </div>

                            <!-- Social Icon Links -->
                            <div :style="{ boxSizing: 'border-box', margin: '0', padding: '0' }">
                              <component 
                                :is="socialObjectLinkIcon" 
                                v-for="(object, index) in props.socialLinks" 
                                :key="object.type"
                                :="object"
                                :isLast="props.socialLinks ? index === props.socialLinks?.length! - 1 : false"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr
                  :style="{
                    display: 'table-row',
                    boxSizing: 'border-box',
                    margin: '0',
                    padding: '0',
                  }"
                >
                  <td
                    colspan="2"
                    :style="{
                      display: 'table-cell',
                      boxSizing: 'border-box',
                      margin: '0',
                      padding: '0',
                    }"
                  >
                    <!-- Barcode -->
                    <img
                      :style="{
                        display: 'inline',
                        boxSizing: 'border-box',
                        marginTop: '16px',
                        marginBottom: '6px'
                      }"
                      :src="props.barcodeUrl"
                    />
                    <div
                      :style="{
                        fontFamily: 'Courier New, Palatino, Baskerville',
                        boxSizing: 'border-box',
                        margin: '0',
                        padding: '0',
                        lineHeight: '1',
                      }"
                    >
                      <div
                        :style="{
                          float: 'left',
                          boxSizing: 'border-box',
                          margin: '0',
                          padding: '0',
                        }"
                      >
                        <a
                          :href="`tel:${props.footerPhone}`"
                          :style="{ color: '#808080', textDecoration: 'unset' }"
                        >
                          {{ props.footerPhone }}
                        </a>
                      </div>
                      <div
                        :style="{
                          float: 'right',
                          boxSizing: 'border-box',
                          margin: '0',
                          padding: '0',
                        }"
                      >
                        <a
                          :href="props.footerLink"
                          :style="{ color: '#808080', textDecoration: 'unset' }"
                        >
                          {{  props.footerLinkText }}
                        </a>
                      </div>
                      <div :style="{ clear: 'both', height: '0' }">&nbsp;</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
        <td
          width="12px"
          :style="{ display: 'table-cell', boxSizing: 'border-box', margin: '0', padding: '0' }"
          v-if="props.borderUrl"
        >
          <!-- Border -->
          <img :src="props.borderUrl" :style="{ display: 'inline', verticalAlign: 'middle' }" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import { h } from 'vue'
  import type { SignatureModel, SocialObjectModel } from '@/types'

  const props = defineProps<Partial<SignatureModel>>()

  const socialObjectLinkIcon = (data: SocialObjectModel & {
    isLast: boolean
  }) => h('a', {
    href: data.linkHref,
    target: '_blank',
    rel: 'noopener noreferrer',
    style: {
      display: 'inline-block',
      float: 'left',
      marginRight: data.isLast ? '' : '10px',
      textDecoration: 'unset',
    },
  }, [
    h('img', {
      src: data.iconHref,
    }),
  ])
</script>
