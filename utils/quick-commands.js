
import { twColors } from './tw-colors'

const colorData = {}

for (const [k, v] of Object.entries(twColors)) {
  if (typeof v === 'string') {
    colorData[`bg-${k}`] = ['background-color', v]
    colorData[`text-${k}`] = ['color', v]
    colorData[`border-${k}`] = ['border-color', v]
    colorData[`outline-${k}`] = ['outline-color', v]
  } else {
    for (const [scale, cssValue] of Object.entries(v)) {
      colorData[`bg-${k}-${scale}`] = ['background-color', cssValue]
      colorData[`text-${k}-${scale}`] = ['color', cssValue]
      colorData[`border-${k}-${scale}`] = ['border-color', cssValue]
      colorData[`outline-${k}-${scale}`] = ['outline-color', cssValue]
    }
  }
}

const data = {
  ...colorData,

  'aspect-auto': ['aspect-ratio', 'auto'],
  'aspect-square': ['aspect-ratio', '1 / 1'],
  'aspect-video': ['aspect-ratio', '16 / 9'],

  'block': ['display', 'block'],
  'inline-block': ['display', 'inline-block'],
  'inline': ['display', 'inline'],
  'flex': ['display', 'flex'],
  'inline-flex': ['display', 'inline-flex'],
  'table': ['display', 'inline-table'],
  'table-caption': ['display', 'table-caption'],
  'table-cell': ['display', 'table-cell'],
  'table-column': ['display', 'table-column'],
  'table-column-group': ['display', 'table-column-group'],
  'table-footer-group': ['display', 'table-footer-group'],
  'table-header-group': ['display', 'table-header-group'],
  'table-row-group': ['display', 'table-row-group'],
  'table-row': ['display', 'table-row'],
  'flow-root': ['display', 'flow-root'],
  'grid': ['display', 'grid'],
  'inline-grid': ['display', 'inline-grid'],
  'contents': ['display', 'contents'],
  'list-item': ['display', 'list-item'],
  'hidden': ['display', 'none'],

  'box-border': ['box-sizing', 'border-box'],
  'box-content': ['box-sizing', 'content-box'],

  'box-decoration-clone': ['box-decoration-break', 'clone'],
  'box-decoration-slice': ['box-decoration-break', 'slice'],

  'break-after-auto': ['break-after', 'auto'],
  'break-after-avoid': ['break-after', 'avoid'],
  'break-after-all': ['break-after', 'all'],
  'break-after-avoid-page': ['break-after', 'avoid-page'],
  'break-after-page': ['break-after', 'page'],
  'break-after-left': ['break-after', 'left'],
  'break-after-right': ['break-after', 'right'],
  'break-after-column': ['break-after', 'column'],

  'break-before-auto': ['break-after', 'auto'],
  'break-before-avoid': ['break-after', 'avoid'],
  'break-before-all': ['break-after', 'all'],
  'break-before-avoid-page': ['break-after', 'avoid-page'],
  'break-before-page': ['break-after', 'page'],
  'break-before-left': ['break-after', 'left'],
  'break-before-right': ['break-after', 'right'],
  'break-before-column': ['break-after', 'column'],

  'break-inside-auto': ['break-after', 'auto'],
  'break-inside-avoid': ['break-after', 'avoid'],

  'break-before-avoid-page': ['break-after', 'avoid-page'],
  'break-before-column': ['break-after', 'avoid-column'],

  'cols-1': ['columns', '1'],
  'cols-2': ['columns', '2'],
  'cols-3': ['columns', '3'],
  'cols-4': ['columns', '4'],
  'cols-5': ['columns', '5'],
  'cols-6': ['columns', '6'],
  'cols-7': ['columns', '7'],
  'cols-8': ['columns', '8'],
  'cols-9': ['columns', '9'],
  'cols-10': ['columns', '10'],
  'cols-11': ['columns', '11'],
  'cols-12': ['columns', '12'],

  'float-start': ['float', 'inline-start'],
  'float-end': ['float', 'inline-end'],
  'float-right': ['float', 'right'],
  'float-left': ['float', 'left'],
  'float-none': ['float', 'none'],
  'clear-start': ['clear', 'inline-start'],
  'clear-end': ['clear', 'inline-end'],
  'clear-left': ['clear', 'left'],
  'clear-right': ['clear', 'right'],
  'clear-both': ['clear', 'both'],
  'clear-none': ['clear', 'none'],

  'isolate': ['isolation', 'isolate'],
  'isolate-auto': ['isolation', 'auto'],

  'object-contain': ['object-fit', 'contain'],
  'object-cover': ['object-fit', 'cover'],
  'object-fill': ['object-fit', 'fill'],
  'object-none': ['object-fit', 'none'],
  'object-scale-down': ['object-fit', 'scale-down'],

  'object-bottom': ['object-position', 'bottom'],
  'object-center': ['object-position', 'center'],
  'object-left': ['object-position', 'left'],
  'object-left-bottom': ['object-position', 'left bottom'],
  'object-left-top': ['object-position', 'left top'],
  'object-right': ['object-position', 'right'],
  'object-right-bottom': ['object-position', 'right bottom'],
  'object-right-top': ['object-position', 'right top'],
  'object-top': ['object-position', 'top'],

  'overflow-auto':	['overflow', 'auto'],
  'overflow-hidden':	['overflow', 'hidden'],
  'overflow-clip':	['overflow', 'clip'],
  'overflow-visible':	['overflow', 'visible'],
  'overflow-scroll': ['overflow', 'scroll'],
  'overflow-x-auto': ['overflow-x', 'auto'],
  'overflow-y-auto': ['overflow-y', 'auto'],
  'overflow-x-hidden': ['overflow-x', 'hidden'],
  'overflow-y-hidden': ['overflow-y', 'hidden'],
  'overflow-x-clip': ['overflow-x', 'clip'],
  'overflow-y-clip': ['overflow-y', 'clip'],
  'overflow-x-visible': ['overflow-x', 'visible'],
  'overflow-y-visible': ['overflow-y', 'visible'],
  'overflow-x-scroll': ['overflow-x', 'scroll'],
  'overflow-y-scroll': ['overflow-y', 'scroll'],

  'overscroll-auto': ['overscroll-behavior', 'auto'],
  'overscroll-contain': ['overscroll-behavior', 'contain'],
  'overscroll-none': ['overscroll-behavior', 'none'],
  'overscroll-y-auto': ['overscroll-behavior-y', 'auto'],
  'overscroll-y-contain': ['overscroll-behavior-y', 'contain'],
  'overscroll-y-none': ['overscroll-behavior-y', 'none'],
  'overscroll-x-auto': ['overscroll-behavior-x', 'auto'],
  'overscroll-x-contain': ['overscroll-behavior-x', 'contain'],
  'overscroll-x-none': ['overscroll-behavior-x', 'none'],

  'static':	['position', 'static'],
  'fixed':	['position', 'fixed'],
  'absolute':	['position', 'absolute'],
  'relative':	['position', 'relative'],
  'sticky':	['position', 'sticky'],

  'visible':	['visibility', 'visible'],
  'invisible':	['visibility', 'hidden'],
  'collapse':	['visibility', 'collapse'],

  'z-0':	['z-index', '0'],
  'z-10':	['z-index', '10'],
  'z-20':	['z-index', '20'],
  'z-30':	['z-index', '30'],
  'z-40':	['z-index', '40'],
  'z-50':	['z-index', '50'],
  'z-auto':	['z-index', 'auto'],

  'basis-0': ['flex-basis', '0px'],
  'basis-1': ['flex-basis', '0.25rem'],
  'basis-2': ['flex-basis', '0.5rem'],
  'basis-3': ['flex-basis', '0.75rem'],
  'basis-4': ['flex-basis', '1rem'],
  'basis-5': ['flex-basis', '1.25rem'],
  'basis-6': ['flex-basis', '1.5rem'],
  'basis-7': ['flex-basis', '1.75rem'],
  'basis-8': ['flex-basis', '2rem'],
  'basis-9': ['flex-basis', '2.25rem'],
  'basis-10': ['flex-basis', '2.5rem'],
  'basis-11': ['flex-basis', '2.75rem'],
  'basis-12': ['flex-basis', '3rem'],
  'basis-14': ['flex-basis', '3.5rem'],
  'basis-16': ['flex-basis', '4rem'],
  'basis-20': ['flex-basis', '5rem'],
  'basis-24': ['flex-basis', '6rem'],
  'basis-28': ['flex-basis', '7rem'],
  'basis-32': ['flex-basis', '8rem'],
  'basis-36': ['flex-basis', '9rem'],
  'basis-40': ['flex-basis', '10rem'],
  'basis-44': ['flex-basis', '11rem'],
  'basis-48': ['flex-basis', '12rem'],
  'basis-52': ['flex-basis', '13rem'],
  'basis-56': ['flex-basis', '14rem'],
  'basis-60': ['flex-basis', '15rem'],
  'basis-64': ['flex-basis', '16rem'],
  'basis-72': ['flex-basis', '18rem'],
  'basis-80': ['flex-basis', '20rem'],
  'basis-96': ['flex-basis', '24rem'],
  'basis-auto': ['flex-basis', 'auto'],
  'basis-px': ['flex-basis', '1px'],
  'basis-0.5': ['flex-basis', '0.125rem'],
  'basis-1.5': ['flex-basis', '0.375rem'],
  'basis-2.5': ['flex-basis', '0.625rem'],
  'basis-3.5': ['flex-basis', '0.875rem'],
  'basis-1/2': ['flex-basis', '50%'],
  'basis-1/3': ['flex-basis', '33.333333%'],
  'basis-2/3': ['flex-basis', '66.666667%'],
  'basis-1/4': ['flex-basis', '25%'],
  'basis-2/4': ['flex-basis', '50%'],
  'basis-3/4': ['flex-basis', '75%'],
  'basis-1/5': ['flex-basis', '20%'],
  'basis-2/5': ['flex-basis', '40%'],
  'basis-3/5': ['flex-basis', '60%'],
  'basis-4/5': ['flex-basis', '80%'],
  'basis-1/6': ['flex-basis', '16.666667%'],
  'basis-2/6': ['flex-basis', '33.333333%'],
  'basis-3/6': ['flex-basis', '50%'],
  'basis-4/6': ['flex-basis', '66.666667%'],
  'basis-5/6': ['flex-basis', '83.333333%'],
  'basis-1/12': ['flex-basis', '8.333333%'],
  'basis-2/12': ['flex-basis', '16.666667%'],
  'basis-3/12': ['flex-basis', '25%'],
  'basis-4/12': ['flex-basis', '33.333333%'],
  'basis-5/12': ['flex-basis', '41.666667%'],
  'basis-6/12': ['flex-basis', '50%'],
  'basis-7/12': ['flex-basis', '58.333333%'],
  'basis-8/12': ['flex-basis', '66.666667%'],
  'basis-9/12': ['flex-basis', '75%'],
  'basis-10/12': ['flex-basis', '83.333333%'],
  'basis-11/12': ['flex-basis', '91.666667%'],
  'basis-full': ['flex-basis', '100%'],

  'flex-row': ['flex-direction', 'row'],
  'flex-row-reverse': ['flex-direction', 'row-reverse'],
  'flex-col': ['flex-direction', 'column'],
  'flex-col-reverse': ['flex-direction', 'column-reverse'],

  'flex-wrap': ['flex-wrap', 'wrap'],
  'flex-wrap-reverse': ['flex-wrap', 'wrap-reverse'],
  'flex-nowrap': ['flex-wrap', 'nowrap'],

  'flex-1': ['flex', '1 1 0%'],
  'flex-auto': ['flex', '1 1 auto'],
  'flex-initial': ['flex', '0 1 auto'],
  'flex-none': ['flex', 'none'],

  'grow':	['flex-grow', '1'],
  'grow-0':	['flex-grow', '0'],

  'shrink':	['flex-shrink', '1'],
  'shrink-0':	['flex-shrink', '0'],

  'order-1': ['order', '1'],
  'order-2': ['order', '2'],
  'order-3': ['order', '3'],
  'order-4': ['order', '4'],
  'order-5': ['order', '5'],
  'order-6': ['order', '6'],
  'order-7': ['order', '7'],
  'order-8': ['order', '8'],
  'order-9': ['order', '9'],
  'order-10': ['order', '10'],
  'order-11': ['order', '11'],
  'order-12': ['order', '12'],
  'order-first': ['order', '-9999'],
  'order-last': ['order', '9999'],
  'order-none': ['order', '0'],

  'grid-cols-1': ['grid-template-columns', 'repeat(1, minmax(0, 1fr))'],
  'grid-cols-2': ['grid-template-columns', 'repeat(2, minmax(0, 1fr))'],
  'grid-cols-3': ['grid-template-columns', 'repeat(3, minmax(0, 1fr))'],
  'grid-cols-4': ['grid-template-columns', 'repeat(4, minmax(0, 1fr))'],
  'grid-cols-5': ['grid-template-columns', 'repeat(5, minmax(0, 1fr))'],
  'grid-cols-6': ['grid-template-columns', 'repeat(6, minmax(0, 1fr))'],
  'grid-cols-7': ['grid-template-columns', 'repeat(7, minmax(0, 1fr))'],
  'grid-cols-8': ['grid-template-columns', 'repeat(8, minmax(0, 1fr))'],
  'grid-cols-9': ['grid-template-columns', 'repeat(9, minmax(0, 1fr))'],
  'grid-cols-10': ['grid-template-columns', 'repeat(10, minmax(0, 1fr))'],
  'grid-cols-11': ['grid-template-columns', 'repeat(11, minmax(0, 1fr))'],
  'grid-cols-12': ['grid-template-columns', 'repeat(12, minmax(0, 1fr))'],
  'grid-cols-none': ['grid-template-columns', 'none'],
  'grid-cols-subgrid': ['grid-template-columns', 'subgrid'],

  'col-auto': ['grid-column', 'auto'],
  'col-span-1': ['grid-column', 'span 1 / span 1'],
  'col-span-2': ['grid-column', 'span 2 / span 2'],
  'col-span-3': ['grid-column', 'span 3 / span 3'],
  'col-span-4': ['grid-column', 'span 4 / span 4'],
  'col-span-5': ['grid-column', 'span 5 / span 5'],
  'col-span-6': ['grid-column', 'span 6 / span 6'],
  'col-span-7': ['grid-column', 'span 7 / span 7'],
  'col-span-8': ['grid-column', 'span 8 / span 8'],
  'col-span-9': ['grid-column', 'span 9 / span 9'],
  'col-span-10': ['grid-column', 'span 10 / span 10'],
  'col-span-11': ['grid-column', 'span 11 / span 11'],
  'col-span-12': ['grid-column', 'span 12 / span 12'],
  'col-span-full': ['grid-column', '1 / -1'],
  'col-start-1': ['grid-column-start', '1'],
  'col-start-2': ['grid-column-start', '2'],
  'col-start-3': ['grid-column-start', '3'],
  'col-start-4': ['grid-column-start', '4'],
  'col-start-5': ['grid-column-start', '5'],
  'col-start-6': ['grid-column-start', '6'],
  'col-start-7': ['grid-column-start', '7'],
  'col-start-8': ['grid-column-start', '8'],
  'col-start-9': ['grid-column-start', '9'],
  'col-start-10': ['grid-column-start', '10'],
  'col-start-11': ['grid-column-start', '11'],
  'col-start-12': ['grid-column-start', '12'],
  'col-start-13': ['grid-column-start', '13'],
  'col-start-auto': ['grid-column-start', 'auto'],
  'col-end-1': ['grid-column-end', '1'],
  'col-end-2': ['grid-column-end', '2'],
  'col-end-3': ['grid-column-end', '3'],
  'col-end-4': ['grid-column-end', '4'],
  'col-end-5': ['grid-column-end', '5'],
  'col-end-6': ['grid-column-end', '6'],
  'col-end-7': ['grid-column-end', '7'],
  'col-end-8': ['grid-column-end', '8'],
  'col-end-9': ['grid-column-end', '9'],
  'col-end-10': ['grid-column-end', '10'],
  'col-end-11': ['grid-column-end', '11'],
  'col-end-12': ['grid-column-end', '12'],
  'col-end-13': ['grid-column-end', '13'],
  'col-end-auto':	['grid-column-end', 'auto'],

  'grid-rows-1': ['grid-template-rows', 'repeat(1, minmax(0, 1fr))'],
  'grid-rows-2': ['grid-template-rows', 'repeat(2, minmax(0, 1fr))'],
  'grid-rows-3': ['grid-template-rows', 'repeat(3, minmax(0, 1fr))'],
  'grid-rows-4': ['grid-template-rows', 'repeat(4, minmax(0, 1fr))'],
  'grid-rows-5': ['grid-template-rows', 'repeat(5, minmax(0, 1fr))'],
  'grid-rows-6': ['grid-template-rows', 'repeat(6, minmax(0, 1fr))'],
  'grid-rows-7': ['grid-template-rows', 'repeat(7, minmax(0, 1fr))'],
  'grid-rows-8': ['grid-template-rows', 'repeat(8, minmax(0, 1fr))'],
  'grid-rows-9': ['grid-template-rows', 'repeat(9, minmax(0, 1fr))'],
  'grid-rows-10': ['grid-template-rows', 'repeat(10, minmax(0, 1fr))'],
  'grid-rows-11': ['grid-template-rows', 'repeat(11, minmax(0, 1fr))'],
  'grid-rows-12': ['grid-template-rows', 'repeat(12, minmax(0, 1fr))'],
  'grid-rows-none': ['grid-template-rows', 'none'],
  'grid-rows-subgrid': ['grid-template-rows', 'subgrid'],

  'row-auto': ['grid-row', 'auto'],
  'row-span-1': ['grid-row', 'span 1 / span 1'],
  'row-span-2': ['grid-row', 'span 2 / span 2'],
  'row-span-3': ['grid-row', 'span 3 / span 3'],
  'row-span-4': ['grid-row', 'span 4 / span 4'],
  'row-span-5': ['grid-row', 'span 5 / span 5'],
  'row-span-6': ['grid-row', 'span 6 / span 6'],
  'row-span-7': ['grid-row', 'span 7 / span 7'],
  'row-span-8': ['grid-row', 'span 8 / span 8'],
  'row-span-9': ['grid-row', 'span 9 / span 9'],
  'row-span-10': ['grid-row', 'span 10 / span 10'],
  'row-span-11': ['grid-row', 'span 11 / span 11'],
  'row-span-12': ['grid-row', 'span 12 / span 12'],
  'row-span-full': ['grid-row', '1 / -1'],
  'row-start-1': ['grid-row-start', '1'],
  'row-start-2': ['grid-row-start', '2'],
  'row-start-3': ['grid-row-start', '3'],
  'row-start-4': ['grid-row-start', '4'],
  'row-start-5': ['grid-row-start', '5'],
  'row-start-6': ['grid-row-start', '6'],
  'row-start-7': ['grid-row-start', '7'],
  'row-start-8': ['grid-row-start', '8'],
  'row-start-9': ['grid-row-start', '9'],
  'row-start-10': ['grid-row-start', '10'],
  'row-start-11': ['grid-row-start', '11'],
  'row-start-12': ['grid-row-start', '12'],
  'row-start-13': ['grid-row-start', '13'],
  'row-start-auto': ['grid-row-start', 'auto'],
  'row-end-1': ['grid-row-end', '1'],
  'row-end-2': ['grid-row-end', '2'],
  'row-end-3': ['grid-row-end', '3'],
  'row-end-4': ['grid-row-end', '4'],
  'row-end-5': ['grid-row-end', '5'],
  'row-end-6': ['grid-row-end', '6'],
  'row-end-7': ['grid-row-end', '7'],
  'row-end-8': ['grid-row-end', '8'],
  'row-end-9': ['grid-row-end', '9'],
  'row-end-10': ['grid-row-end', '10'],
  'row-end-11': ['grid-row-end', '11'],
  'row-end-12': ['grid-row-end', '12'],
  'row-end-13': ['grid-row-end', '13'],
  'row-end-auto':	['grid-row-end', 'auto'],

  'grid-flow-row': ['grid-auto-flow', 'row'],
  'grid-flow-col': ['grid-auto-flow', 'column'],
  'grid-flow-dense': ['grid-auto-flow', 'dense'],
  'grid-flow-row-dense': ['grid-auto-flow', 'row dense'],
  'grid-flow-col-dense': ['grid-auto-flow', 'column dense'],

  'auto-cols-auto': ['grid-auto-columns', 'auto'],
  'auto-cols-min': ['grid-auto-columns', 'min-content'],
  'auto-cols-max': ['grid-auto-columns', 'max-content'],
  'auto-cols-fr': ['grid-auto-columns', 'minmax(0, 1fr)'],

  'auto-rows-auto': ['grid-auto-rows', 'auto'],
  'auto-rows-min': ['grid-auto-rows', 'min-content'],
  'auto-rows-max': ['grid-auto-rows', 'max-content'],
  'auto-rows-fr': ['grid-auto-rows', 'minmax(0, 1fr)'],

  'gap-x-0': ['column-gap', '0px'],
  'gap-y-0': ['row-gap', '0px'],
  'gap-x-px': ['column-gap', '1px'],
  'gap-y-px': ['row-gap', '1px'],
  'gap-x-0.5': ['column-gap', '0.125rem'],
  'gap-y-0.5': ['row-gap', '0.125rem'],
  'gap-x-1': ['column-gap', '0.25rem'],
  'gap-y-1': ['row-gap', '0.25rem'],
  'gap-x-1.5': ['column-gap', '0.375rem'],
  'gap-y-1.5': ['row-gap', '0.375rem'],
  'gap-x-2': ['column-gap', '0.5rem'],
  'gap-y-2': ['row-gap', '0.5rem'],
  'gap-x-2.5': ['column-gap', '0.625rem'],
  'gap-y-2.5': ['row-gap', '0.625rem'],
  'gap-x-3': ['column-gap', '0.75rem'],
  'gap-y-3': ['row-gap', '0.75rem'],
  'gap-x-3.5': ['column-gap', '0.875rem'],
  'gap-y-3.5': ['row-gap', '0.875rem'],
  'gap-x-4': ['column-gap', '1rem'],
  'gap-y-4': ['row-gap', '1rem'],
  'gap-x-5': ['column-gap', '1.25rem'],
  'gap-y-5': ['row-gap', '1.25rem'],
  'gap-x-6': ['column-gap', '1.5rem'],
  'gap-y-6': ['row-gap', '1.5rem'],
  'gap-x-7': ['column-gap', '1.75rem'],
  'gap-y-7': ['row-gap', '1.75rem'],
  'gap-x-8': ['column-gap', '2rem'],
  'gap-y-8': ['row-gap', '2rem'],
  'gap-x-9': ['column-gap', '2.25rem'],
  'gap-y-9': ['row-gap', '2.25rem'],
  'gap-x-10': ['column-gap', '2.5rem'],
  'gap-y-10': ['row-gap', '2.5rem'],
  'gap-x-11': ['column-gap', '2.75rem'],
  'gap-y-11': ['row-gap', '2.75rem'],
  'gap-x-12': ['column-gap', '3rem'],
  'gap-y-12': ['row-gap', '3rem'],
  'gap-x-14': ['column-gap', '3.5rem'],
  'gap-y-14': ['row-gap', '3.5rem'],
  'gap-x-16': ['column-gap', '4rem'],
  'gap-y-16': ['row-gap', '4rem'],
  'gap-x-20': ['column-gap', '5rem'],
  'gap-y-20': ['row-gap', '5rem'],
  'gap-x-24': ['column-gap', '6rem'],
  'gap-y-24': ['row-gap', '6rem'],
  'gap-x-28': ['column-gap', '7rem'],
  'gap-y-28': ['row-gap', '7rem'],
  'gap-x-32': ['column-gap', '8rem'],
  'gap-y-32': ['row-gap', '8rem'],
  'gap-x-36': ['column-gap', '9rem'],
  'gap-y-36': ['row-gap', '9rem'],
  'gap-x-40': ['column-gap', '10rem'],
  'gap-y-40': ['row-gap', '10rem'],
  'gap-x-44': ['column-gap', '11rem'],
  'gap-y-44': ['row-gap', '11rem'],
  'gap-x-48': ['column-gap', '12rem'],
  'gap-y-48': ['row-gap', '12rem'],
  'gap-x-52': ['column-gap', '13rem'],
  'gap-y-52': ['row-gap', '13rem'],
  'gap-x-56': ['column-gap', '14rem'],
  'gap-y-56': ['row-gap', '14rem'],
  'gap-x-60': ['column-gap', '15rem'],
  'gap-y-60': ['row-gap', '15rem'],
  'gap-x-64': ['column-gap', '16rem'],
  'gap-y-64': ['row-gap', '16rem'],
  'gap-x-72': ['column-gap', '18rem'],
  'gap-y-72': ['row-gap', '18rem'],
  'gap-x-80': ['column-gap', '20rem'],
  'gap-y-80': ['row-gap', '20rem'],
  'gap-x-96': ['column-gap', '24rem'],
  'gap-y-96': ['row-gap', '24rem'],

  'justify-normal': ['justify-content', 'normal'],
  'justify-start': ['justify-content', 'flex-start'],
  'justify-end': ['justify-content', 'flex-end'],
  'justify-center': ['justify-content', 'center'],
  'justify-between': ['justify-content', 'space-between'],
  'justify-around': ['justify-content', 'space-around'],
  'justify-evenly': ['justify-content', 'space-evenly'],
  'justify-stretch': ['justify-content', 'stretch'],

  'justify-items-start': ['justify-items', 'start'],
  'justify-items-end': ['justify-items', 'end'],
  'justify-items-center': ['justify-items', 'center'],
  'justify-items-stretch': ['justify-items', 'stretch'],

  'justify-self-auto': ['justify-self', 'auto'],
  'justify-self-start': ['justify-self', 'start'],
  'justify-self-end': ['justify-self', 'end'],
  'justify-self-center': ['justify-self', 'center'],
  'justify-self-stretch': ['justify-self', 'stretch'],

  'content-normal': ['align-content', 'normal'],
  'content-center': ['align-content', 'center'],
  'content-start': ['align-content', 'flex-start'],
  'content-end': ['align-content', 'flex-end'],
  'content-between': ['align-content', 'space-between'],
  'content-around': ['align-content', 'space-around'],
  'content-evenly': ['align-content', 'space-evenly'],
  'content-baseline': ['align-content', 'baseline'],
  'content-stretch': ['align-content', 'stretch'],

  'items-start': ['align-items', 'flex-start'],
  'items-end': ['align-items', 'flex-end'],
  'items-center': ['align-items', 'center'],
  'items-baseline': ['align-items', 'baseline'],
  'items-stretch': ['align-items', 'stretch'],

  'self-auto': ['align-self', 'auto'],
  'self-start': ['align-self', 'flex-start'],
  'self-end': ['align-self', 'flex-end'],
  'self-center': ['align-self', 'center'],
  'self-stretch': ['align-self', 'stretch'],
  'self-baseline': ['align-self', 'baseline'],

  'place-content-center': ['place-content', 'center'],
  'place-content-start': ['place-content', 'start'],
  'place-content-end': ['place-content', 'end'],
  'place-content-between': ['place-content', 'space-between'],
  'place-content-around': ['place-content', 'space-around'],
  'place-content-evenly': ['place-content', 'space-evenly'],
  'place-content-baseline': ['place-content', 'baseline'],
  'place-content-stretch': ['place-content', 'stretch'],

  'place-items-start': ['place-items', 'start'],
  'place-items-end': ['place-items', 'end'],
  'place-items-center': ['place-items', 'center'],
  'place-items-baseline': ['place-items', 'baseline'],
  'place-items-stretch': ['place-items', 'stretch'],

  'place-self-auto': ['place-self', 'auto'],
  'place-self-start': ['place-self', 'start'],
  'place-self-end': ['place-self', 'end'],
  'place-self-center': ['place-self', 'center'],
  'place-self-stretch': ['place-self', 'stretch'],



  'p-0': ['padding', '0px'],
  'px-0': ['padding-left', '0px'],
  'py-0': ['padding-top', '0px'],
  'ps-0': ['padding-inline-start', '0px'],
  'pe-0': ['padding-inline-end', '0px'],
  'pt-0': ['padding-top', '0px'],
  'pr-0': ['padding-right', '0px'],
  'pb-0': ['padding-bottom', '0px'],
  'pl-0': ['padding-left', '0px'],
  'p-px': ['padding', '1px'],
  'px-px': ['padding-left', '1px'],
  'py-px': ['padding-top', '1px'],
  'ps-px': ['padding-inline-start', '1px'],
  'pe-px': ['padding-inline-end', '1px'],
  'pt-px': ['padding-top', '1px'],
  'pr-px': ['padding-right', '1px'],
  'pb-px': ['padding-bottom', '1px'],
  'pl-px': ['padding-left', '1px'],
  'p-0.5': ['padding', '0.125rem'],
  'px-0.5': ['padding-left', '0.125rem'],
  'py-0.5': ['padding-top', '0.125rem'],
  'ps-0.5': ['padding-inline-start', '0.125rem'],
  'pe-0.5': ['padding-inline-end', '0.125rem'],
  'pt-0.5': ['padding-top', '0.125rem'],
  'pr-0.5': ['padding-right', '0.125rem'],
  'pb-0.5': ['padding-bottom', '0.125rem'],
  'pl-0.5': ['padding-left', '0.125rem'],
  'p-1': ['padding', '0.25rem'],
  'px-1': ['padding-left', '0.25rem'],
  'py-1': ['padding-top', '0.25rem'],
  'ps-1': ['padding-inline-start', '0.25rem'],
  'pe-1': ['padding-inline-end', '0.25rem'],
  'pt-1': ['padding-top', '0.25rem'],
  'pr-1': ['padding-right', '0.25rem'],
  'pb-1': ['padding-bottom', '0.25rem'],
  'pl-1': ['padding-left', '0.25rem'],
  'p-1.5': ['padding', '0.375rem'],
  'px-1.5': ['padding-left', '0.375rem'],
  'py-1.5': ['padding-top', '0.375rem'],
  'ps-1.5': ['padding-inline-start', '0.375rem'],
  'pe-1.5': ['padding-inline-end', '0.375rem'],
  'pt-1.5': ['padding-top', '0.375rem'],
  'pr-1.5': ['padding-right', '0.375rem'],
  'pb-1.5': ['padding-bottom', '0.375rem'],
  'pl-1.5': ['padding-left', '0.375rem'],
  'p-2': ['padding', '0.5rem'],
  'px-2': ['padding-left', '0.5rem'],
  'py-2': ['padding-top', '0.5rem'],
  'ps-2': ['padding-inline-start', '0.5rem'],
  'pe-2': ['padding-inline-end', '0.5rem'],
  'pt-2': ['padding-top', '0.5rem'],
  'pr-2': ['padding-right', '0.5rem'],
  'pb-2': ['padding-bottom', '0.5rem'],
  'pl-2': ['padding-left', '0.5rem'],
  'p-2.5': ['padding', '0.625rem'],
  'px-2.5': ['padding-left', '0.625rem'],
  'py-2.5': ['padding-top', '0.625rem'],
  'ps-2.5': ['padding-inline-start', '0.625rem'],
  'pe-2.5': ['padding-inline-end', '0.625rem'],
  'pt-2.5': ['padding-top', '0.625rem'],
  'pr-2.5': ['padding-right', '0.625rem'],
  'pb-2.5': ['padding-bottom', '0.625rem'],
  'pl-2.5': ['padding-left', '0.625rem'],
  'p-3': ['padding', '0.75rem'],
  'px-3': ['padding-left', '0.75rem'],
  'py-3': ['padding-top', '0.75rem'],
  'ps-3': ['padding-inline-start', '0.75rem'],
  'pe-3': ['padding-inline-end', '0.75rem'],
  'pt-3': ['padding-top', '0.75rem'],
  'pr-3': ['padding-right', '0.75rem'],
  'pb-3': ['padding-bottom', '0.75rem'],
  'pl-3': ['padding-left', '0.75rem'],
  'p-3.5': ['padding', '0.875rem'],
  'px-3.5': ['padding-left', '0.875rem'],
  'py-3.5': ['padding-top', '0.875rem'],
  'ps-3.5': ['padding-inline-start', '0.875rem'],
  'pe-3.5': ['padding-inline-end', '0.875rem'],
  'pt-3.5': ['padding-top', '0.875rem'],
  'pr-3.5': ['padding-right', '0.875rem'],
  'pb-3.5': ['padding-bottom', '0.875rem'],
  'pl-3.5': ['padding-left', '0.875rem'],
  'p-4': ['padding', '1rem'],
  'px-4': ['padding-left', '1rem'],
  'py-4': ['padding-top', '1rem'],
  'ps-4': ['padding-inline-start', '1rem'],
  'pe-4': ['padding-inline-end', '1rem'],
  'pt-4': ['padding-top', '1rem'],
  'pr-4': ['padding-right', '1rem'],
  'pb-4': ['padding-bottom', '1rem'],
  'pl-4': ['padding-left', '1rem'],
  'p-5': ['padding', '1.25rem'],
  'px-5': ['padding-left', '1.25rem'],
  'py-5': ['padding-top', '1.25rem'],
  'ps-5': ['padding-inline-start', '1.25rem'],
  'pe-5': ['padding-inline-end', '1.25rem'],
  'pt-5': ['padding-top', '1.25rem'],
  'pr-5': ['padding-right', '1.25rem'],
  'pb-5': ['padding-bottom', '1.25rem'],
  'pl-5': ['padding-left', '1.25rem'],
  'p-6': ['padding', '1.5rem'],
  'px-6': ['padding-left', '1.5rem'],
  'py-6': ['padding-top', '1.5rem'],
  'ps-6': ['padding-inline-start', '1.5rem'],
  'pe-6': ['padding-inline-end', '1.5rem'],
  'pt-6': ['padding-top', '1.5rem'],
  'pr-6': ['padding-right', '1.5rem'],
  'pb-6': ['padding-bottom', '1.5rem'],
  'pl-6': ['padding-left', '1.5rem'],
  'p-7': ['padding', '1.75rem'],
  'px-7': ['padding-left', '1.75rem'],
  'py-7': ['padding-top', '1.75rem'],

  'm-0': ['margin', '0px'],
  'mx-0': ['margin-left', '0px', 'margin-right', '0px'],
  'my-0': ['margin-top', '0px', 'margin-bottom', '0px'],
  'ms-0': ['margin-inline-start', '0px'],
  'me-0': ['margin-inline-end', '0px'],
  'mt-0': ['margin-top', '0px'],
  'mr-0': ['margin-right', '0px'],
  'mb-0': ['margin-bottom', '0px'],
  'ml-0': ['margin-left', '0px'],
  'm-px': ['margin', '1px'],
  'mx-px': ['margin-left', '1px', 'margin-right', '1px'],
  'my-px': ['margin-top', '1px', 'margin-bottom', '1px'],
  'ms-px': ['margin-inline-start', '1px'],
  'me-px': ['margin-inline-end', '1px'],
  'mt-px': ['margin-top', '1px'],
  'mr-px': ['margin-right', '1px'],
  'mb-px': ['margin-bottom', '1px'],
  'ml-px': ['margin-left', '1px'],
  'm-0.5': ['margin', '0.125rem'],
  'mx-0.5': ['margin-left', '0.125rem', 'margin-right', '0.125rem'],
  'my-0.5': ['margin-top', '0.125rem', 'margin-bottom', '0.125rem'],
  'ms-0.5': ['margin-inline-start', '0.125rem'],
  'me-0.5': ['margin-inline-end', '0.125rem'],
  'mt-0.5': ['margin-top', '0.125rem'],
  'mr-0.5': ['margin-right', '0.125rem'],
  'mb-0.5': ['margin-bottom', '0.125rem'],
  'ml-0.5': ['margin-left', '0.125rem'],
  'm-auto': ['margin', 'auto'],
  'mx-auto': ['margin-left', 'auto', 'margin-right', 'auto'],
  'my-auto': ['margin-top', 'auto', 'margin-bottom', 'auto'],
  'ms-auto': ['margin-inline-start', 'auto'],
  'me-auto': ['margin-inline-end', 'auto'],
  'mt-auto': ['margin-top', 'auto'],
  'mr-auto': ['margin-right', 'auto'],
  'mb-auto': ['margin-bottom', 'auto'],
  'ml-auto': ['margin-left', 'auto'],
}

const all = Object.entries(data).reduce((acc, [command,tuple]) => {
  acc[command] = {
    action: 'update_selection_styles',
    data: {
      property: tuple[0],
      value: tuple[1],
    },
  }

  return acc
}, {})

export default {
  block: {
    action: 'update_selection_styles',
    data: {
      property: 'display',
      value: 'block',
    },
  },
  flex: {
    action: 'update_selection_styles',
    data: {
      property: 'display',
      value: 'flex',
    },
  },
  'shadow-sm': {
    action: 'update_selection_styles',
    data: {
      property: 'box-shadow',
      value: '0px 0px 7px -2px rgba(0,0,0,1)'
    },
  },
  'shadow': {
    action: 'update_selection_styles',
    data: {
      property: 'box-shadow',
      value: '0px 0px 15px -5px rgba(0,0,0,1)',
    },
  },
  'shadow-lg': {
    action: 'update_selection_styles',
    data: {
      property: 'box-shadow',
      value: '0px 0px 25px -5px rgba(0,0,0,1)',
    },
  },
  'w-1': {
    action: 'update_selection_styles',
    data: {
      property: 'width',
      value: '25px',
    },
  },
  'w-2': {
    action: 'update_selection_styles',
    data: {
      property: 'width',
      value: '50px',
    },
  },
  'w-3': {
    action: 'update_selection_styles',
    data: {
      property: 'width',
      value: '75px',
    },
  },
  'w-4': {
    action: 'update_selection_styles',
    data: {
      property: 'width',
      value: '100px',
    },
  },
  'h-1': {
    action: 'update_selection_styles',
    data: {
      property: 'height',
      value: '25px',
    },
  },
  'h-2': {
    action: 'update_selection_styles',
    data: {
      property: 'height',
      value: '50px',
    },
  },
  'h-3': {
    action: 'update_selection_styles',
    data: {
      property: 'height',
      value: '75px',
    },
  },
  'h-4': {
    action: 'update_selection_styles',
    data: {
      property: 'height',
      value: '100px',
    },
  },
  ...all,
}
