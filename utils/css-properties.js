import colors from './colors'

const colorsList = Object.keys(colors)

export const globalCSSValues = [
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
]

export default [
  {
    'property': 'box-decoration-break',
    'values': ['slice', 'clone'],
  },
  {
    'property': 'hyphens',
    'values': ['none', 'manual', 'auto'],
  },
  {
    'property': 'line-break',
    'values': ['auto', 'loose', 'normal', 'strict', 'anywhere'],
  },
  {
    'property': 'overflow-wrap',
    'values': ['normal', 'break-word', 'anywhere'],
  },
  {
    'property': 'text-underline-position',
    'values': ['auto', 'under', 'left', 'right'],
  },
  {
    'property': 'font-kerning',
    'values': ['auto', 'normal', 'none'],
  },
  {
    'property': 'font-synthesis',
    'values': ['none', 'weight', 'style', 'position', 'small-caps-style'],
  },
  {
    'property': 'font-variant-caps',
    'values': ['normal', 'small-caps', 'all-small-caps', 'petite-caps', 'all-petite-caps', 'unicase', 'titling-caps'],
  },
  {
    'property': 'font-variant-east-asian',
    'values': ['normal', 'ruby', 'jis78', 'jis83', 'jis90', 'jis04', 'simplified', 'traditional', 'full-width', 'proportional-width'],
  },
  {
    'property': 'font-variant-ligatures',
    'values': [
      'normal',
      'none',
      'common-ligatures',
      'no-common-ligatures',
      'discretionary-ligatures',
      'no-discretionary-ligatures',
      'historical-ligatures',
      'no-historical-ligatures',
      'contextual',
      'no-contextual',
    ],
  },
  {
    'property': 'font-variant-numeric',
    'values': [
      'normal',
      'ordinal',
      'slashed-zero',
      'lining-nums',
      'oldstyle-nums',
      'proportional-nums',
      'tabular-nums',
      'diagonal-fractions',
      'stacked-fractions',
      'oldstyle-nums stacked-fractions',
    ],
  },
  {
    'property': 'font-variant-position',
    'values': ['normal', 'sub', 'super'],
  },
  {
    'property': 'text-orientation',
    'values': [
      'mixed',
      'upright',
      'sideways-right',
      'sideways',
      'use-glyph-orientation',
    ],
  },
  {
    'property': 'text-combine-upright',
    'values': ['none', 'all', 'digits'],
  },
  {
    'property': 'writing-mode',
    'values': ['horizontal-tb', 'vertical-rl', 'vertical-lr'],
  },
  {
    'property': 'break-after',
    'values': [
      'auto',
      'avoid',
      'always',
      'all',
      'avoid-page',
      'page',
      'left',
      'right',
      'recto',
      'verso',
      'avoid-column',
      'column',
      'avoid-region',
      'region',
    ],
  },
  {
    'property': 'break-before',
    'values': [
      'auto',
      'avoid',
      'always',
      'all',
      'avoid-page',
      'page',
      'left',
      'right',
      'recto',
      'verso',
      'avoid-column',
      'column',
      'avoid-region',
      'region',
    ],
  },
  {
    'property': 'break-inside',
    'values': [
      'auto',
      'avoid',
      'avoid-page',
      'avoid-column',
      'avoid-region',
    ],
  },
  {
    'property': 'widows',
    'values': ['1', '2', '3', '4', '5'],
  },
  {
    'property': 'orphans',
    'values': ['1', '2', '3', '4', '5'],
  },
  {
    'property': 'image-orientation',
    'values': [
      'none',
      'from-image',
    ],
  },
  {
    'property': 'image-rendering',
    'values': [
      'auto',
      'crisp-edges',
      'pixelated',
    ],
  },
  {
    'property': 'object-fit',
    'values': [
      'contain',
      'cover',
      'fill',
      'none',
      'revert',
      'scale-down',
      'unset',
    ],
  },
  {
    'property': 'object-position',
    'values': [
      'top',
      'bottom',
      'left',
      'right',
      'center',
    ],
  },
  {
    'property': 'mask',
    'values': [],
  },
  {
    'property': 'mask-type',
    'values': ['luminance', 'alpha'],
  },
  {
    'property': 'color',
    'values': [
      ...colorsList,
      'transparent',
    ],
  },
  {
    'property': 'opacity',
    'values': [
      '0',
      '0.1',
      '0.2',
      '0.3',
      '0.4',
      '0.5',
      '0.6',
      '0.7',
      '0.8',
      '0.9',
      '1',
    ],
  },
  {
    'property': 'background-position',
    'values': [
      'top',
      'right',
      'bottom',
      'left',
      'center',
    ],
  },
  {
    'property': 'background-image',
    'values': [
      'none',
    ],
  },
  {
    'property': 'background-color',
    'values': [
      ...colorsList,
      'transparent',
    ],
  },
  {
    'property': 'border',
    'values': [
    ],
  },
  {
    'property': 'word-wrap',
    'values': [
      'normal',
      'break-word',
    ],
  },
  {
    'property': 'font-size',
    'values': [
      'medium',
      'xx-small',
      'x-small',
      'small',
      'large',
      'x-large',
      'xx-large',
      'smaller',
      'larger',
    ],
  },
  {
    'property': 'text-decoration-line',
    'values': [
      'none',
      'underline',
      'overline',
      'line-through',
      'blink',
    ],
  },
  {
    'property': 'border-collapse',
    'values': [
      'separate',
      'collapse',
    ],
  },
  {
    'property': 'background-size',
    'values': [
      'auto',
      'percentage',
      ' cover',
      ' contain',
    ],
  },
  {
    'property': 'list-style-type',
    'values': [
      'disc',
      'armenian',
      'circle',
      'cjk-ideographic',
      'decimal',
      'decimal-leading-zero',
      'georgian',
      'hebrew',
      'hiragana',
      'hiragana-iroha',
      'katakana',
      'katakana-iroha',
      'lower-alpha',
      'lower-greek',
      'lower-latin',
      'lower-roman',
      'none',
      'square',
      'upper-alpha',
      'upper-latin',
      'upper-roman',
    ],
  },
  {
    'property': 'border-top-width',
    'values': [
      'medium',
      'thin',
      'thick',
    ],
  },
  {
    'property': 'background-blend-mode',
    'values': [
      'color',
      'color-burn',
      'color-dodge',
      'darken',
      'difference',
      'exclusion',
      'hard-light',
      'hue',
      'lighten',
      'luminosity',
      'multiply',
      'normal',
      'overlay',
      'saturation',
      'screen',
      'soft-light',
    ],
  },
  {
    'property': 'background-repeat',
    'values': [
      'no-repeat',
      'repeat',
      'repeat-x',
      'repeat-y',
      'round',
      'space',
    ],
  },
  {
    'property': 'background-clip',
    'values': [
      'border-box',
      'padding-box',
      'content-box',
      'text',
    ],
  },
  {
    'property': 'animation-direction',
    'values': [
      'normal',
      'reverse',
      'alternate',
      'alternate-reverse',
    ],
  },
  {
    'property': 'animation-duration',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'counter-reset',
    'values': [
      'none',
    ],
  },
  {
    'property': 'padding-left',
    'values': [
    ],
  },
  {
    'property': 'border-bottom-style',
    'values': [
      'none',
      'hidden',
      'dotted',
      'dashed',
      'solid',
      'double',
      'groove',
      'ridge',
      'inset',
      'outset',
    ],
  },
  {
    'property': 'list-style',
    'values': [
      'list-style-type',
      'list-style-position',
      'list-style-image',
    ],
  },
  {
    'property': 'counter-increment',
    'values': [
      'none',
    ],
  },
  {
    'property': 'align-self',
    'values': [
      'auto',
      'stretch',
      'center',
      'flex-start',
      'flex-end',
      'baseline',
    ],
  },
  {
    'property': 'min-height',
    'values': [
    ],
  },
  {
    'property': 'visibility',
    'values': [
      'visible',
      'hidden',
      'collapse',
    ],
  },
  {
    'property': 'max-height',
    'values': [
      'none',
    ],
  },
  {
    'property': 'position',
    'values': [
      'static',
      'absolute',
      'fixed',
      'relative',
      'sticky',
    ],
  },
  {
    'property': 'border-left-width',
    'values': [
      'thin',
      'medium',
      'thick',
    ],
  },
  {
    'property': 'border-image-outset',
    'values': [
    ],
  },
  {
    'property': 'overflow-x',
    'values': [
      'visible',
      'hidden',
      'scroll',
      'auto',
    ],
  },
  {
    'property': 'border-left-color',
    'values': [
      ...colorsList,
      'transparent',
    ],
  },
  {
    'property': 'perspective-origin',
    'values': [
      'top',
      'right',
      'bottom',
      'left',
      'center',
    ],
  },
  {
    'property': 'flex',
    'values': [
      'auto',
      'none',
    ],
  },
  {
    'property': 'border-image',
    'values': [
    ],
  },
  {
    'property': 'animation-delay',
    'values': [
    ],
  },
  {
    'property': 'border-color',
    'values': [
      ...colorsList,
      'transparent',
    ],
  },
  {
    'property': 'clear',
    'values': [
      'none',
      'left',
      'right',
      'both',
    ],
  },
  {
    'property': 'border-width',
    'values': [
      'thin',
      'medium',
      'thick',
    ],
  },
  {
    'property': 'overflow',
    'values': [
      'visible',
      'hidden',
      'scroll',
      'auto',
    ],
  },
  {
    'property': 'column-rule-color',
    'values': [
      ...colorsList,
    ],
  },
  {
    'property': 'border-right-width',
    'values': [
      'medium',
      'thin',
      'thick',
    ],
  },
  {
    'property': 'border-image-source',
    'values': [
    ],
  },
  {
    'property': 'background-attachment',
    'values': [
      'scroll',
      'fixed',
      'local',
    ],
  },
  {
    'property': 'border-right',
    'values': [
    ],
  },
  {
    'property': 'margin-right',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'border-bottom',
    'values': [
    ],
  },
  {
    'property': 'border-right-color',
    'values': [
      ...colorsList,
      'transparent',
    ],
  },
  {
    'property': 'margin-top',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'border-radius',
    'values': [
    ],
  },
  {
    'property': 'max-width',
    'values': [
      'none',
    ],
  },
  {
    'property': 'min-width',
    'values': [
      'none',
      'max-content',
      'min-content',
      'fit-content',
    ],
  },
  {
    'property': 'z-index',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'border-bottom-left-radius',
    'values': [
    ],
  },
  {
    'property': 'text-transform',
    'values': [
      'none',
      'capitalize',
      'uppercase',
      'lowercase',
    ],
  },
  {
    'property': 'text-indent',
    'values': [
    ],
  },
  {
    'property': 'text-justify',
    'values': [
      'auto',
      'inter-word',
      'inter-ideograph',
      'inter-cluster',
      'distribute',
      'kashida',
      'trim',
      'none',
    ],
  },
  {
    'property': 'text-align',
    'values': [
      'left',
      'right',
      'center',
      'justify',
    ],
  },
  {
    'property': 'border-bottom-color',
    'values': [
      ...colorsList,
      'transparent',
    ],
  },
  {
    'property': 'background',
    'values': [
    ],
  },
  {
    'property': 'letter-spacing',
    'values': [
      'normal',
    ],
  },
  {
    'property': 'align-items',
    'values': [
      'stretch',
      'center',
      'flex-start',
      'flex-end',
      'baseline',
    ],
  },
  {
    'property': 'tab-size',
    'values': [
    ],
  },
  {
    'property': 'flex-wrap',
    'values': [
      'nowrap',
      'wrap',
      'wrap-reverse',
    ],
  },
  {
    'property': 'flex-direction',
    'values': [
      'row',
      'row-reverse',
      'column',
      'column-reverse',
    ],
  },
  {
    'property': 'flex-basis',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'flex-shrink',
    'values': [
    ],
  },
  {
    'property': 'bottom',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'clip',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'flex-grow',
    'values': [
    ],
  },
  {
    'property': 'font',
    'values': [
    ],
  },
  {
    'property': 'margin-left',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'text-decoration-color',
    'values': [
      ...colorsList,
    ],
  },
  {
    'property': 'border-bottom-right-radius',
    'values': [
    ],
  },
  {
    'property': 'list-style-position',
    'values': [
      'inside',
      'outside',
    ],
  },
  {
    'property': 'top',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'right',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'background-origin',
    'values': [
      'padding-box',
      'border-box',
      'content-box',
    ],
  },
  {
    'property': 'table-layout',
    'values': [
      'auto',
      'fixed',
    ],
  },
  {
    'property': 'margin-bottom',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'padding-bottom',
    'values': [
    ],
  },
  {
    'property': 'border-image-slice',
    'values': [
    ],
  },
  {
    'property': 'flex-flow',
    'values': [
      'row',
      'row-reverse',
      'column',
      'column-reverse',
      'nowrap',
      'wrap',
      'wrap-reverse',
    ],
  },
  {
    'property': 'float',
    'values': [
      'none',
      'left',
      'right',
      'both',
      'inline',
      'inline-block',
      'inline-table',
      'table-row',
      'table-row-group',
      'table-column',
      'table-column-group',
      'table-cell',
      'table-caption',
      'table-header-group',
      'table-footer-group',
      'inline-flex',
      'inline-grid',
    ],
  },
  {
    'property': 'vertical-align',
    'values': [
      'baseline',
      'sub',
      'super',
      'top',
      'text-top',
      'middle',
      'bottom',
      'text-bottom',
    ],
  },
  {
    'property': 'padding-right',
    'values': [
    ],
  },
  {
    'property': 'width',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'align-content',
    'values': [
      'stretch',
      'center',
      'flex-start',
      'flex-end',
      'space-between',
      'space-around',
    ],
  },
  {
    'property': 'padding',
    'values': [
    ],
  },
  {
    'property': 'hanging-punctuation',
    'values': [
      'none',
      'first',
      'last',
      'allow-end',
      'force-end',
    ],
  },
  {
    'property': 'border-bottom-width',
    'values': [
      'medium',
      'thin',
      'thick',
    ],
  },
  {
    'property': 'border-left-style',
    'values': [
      'none',
      'hidden',
      'dotted',
      'dashed',
      'solid',
      'double',
      'groove',
      'ridge',
      'inset',
      'outset',
    ],
  },
  {
    'property': 'text-align-last',
    'values': [
      'auto',
      'left',
      'right',
      'center',
      'justify',
      'start',
      'end',
    ],
  },
  {
    'property': 'order',
    'values': [
    ],
  },
  {
    'property': 'border-top-style',
    'values': [
      'none',
      'hidden',
      'dotted',
      'dashed',
      'solid',
      'double',
      'groove',
      'ridge',
      'inset',
      'outset',
    ],
  },
  {
    'property': 'border-top-color',
    'values': [
      ...colorsList,
      'transparent',
    ],
  },
  {
    'property': 'display',
    'values': [
      'inline',
      'block',
      'flex',
      'inline-block',
      'inline-flex',
      'inline-table',
      'list-item',
      'run-in',
      'table',
      'table-caption',
      '\r\n      table-column-group',
      'table-header-group',
      'table-footer-group',
      'table-row-group',
      'table-cell',
      'table-column',
      'table-row',
      'none',
    ],
  },
  {
    'property': 'left',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'border-top-left-radius',
    'values': [
    ],
  },
  {
    'property': 'margin',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'border-image-repeat',
    'values': [
      ' stretch',
      ' repeat',
      ' round',
      'space',
    ],
  },
  {
    'property': 'box-shadow',
    'values': [
      'none',
      'h-shadow',
      'v-shadow',
      'blur',
      'spread',
      'inset',
    ],
  },
  {
    'property': 'border-top-right-radius',
    'values': [
    ],
  },
  {
    'property': 'text-decoration-style',
    'values': [
      'solid',
      'double',
      'dotted',
      'dashed',
      'wavy',
    ],
  },
  {
    'property': 'height',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'border-right-style',
    'values': [
      'none',
      'hidden',
      'dotted',
      'dashed',
      'solid',
      'double',
      'groove',
      'ridge',
      'inset',
      'outset',
    ],
  },
  {
    'property': 'border-left',
    'values': [
    ],
  },
  {
    'property': 'border-image-width',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'font-family',
    'values': [
      'monospace',
      'serif',
      'sans-serif',
    ],
  },
  {
    'property': 'border-top',
    'values': [
    ],
  },
  {
    'property': 'empty-cells',
    'values': [
      'show',
      'hide',
    ],
  },
  {
    'property': 'justify-content',
    'values': [
      'flex-start',
      'flex-end',
      'center',
      'space-between',
      'space-around',
    ],
  },
  {
    'property': 'text-shadow',
    'values': [
      'h-shadow',
      'v-shadow',
      'blur-radius',
      'none',
    ],
  },
  {
    'property': 'overflow-y',
    'values': [
      'visible',
      'hidden',
      'scroll',
      'auto',
    ],
  },
  {
    'property': 'padding-top',
    'values': [
    ],
  },
  {
    'property': 'border-style',
    'values': [
      'none',
      'hidden',
      'dotted',
      'dashed',
      'solid',
      'double',
      'groove',
      'ridge',
      'inset',
      'outset',
    ],
  },
  {
    'property': 'border-spacing',
    'values': [],
  },
  {
    'property': 'word-break',
    'values': [
      'normal',
      'break-all',
      'keep-all ',
    ],
  },
  {
    'property': 'text-decoration',
    'values': [
      'none',
      'underline',
      'overline',
      'line-through',
    ],
  },
  {
    'property': 'white-space',
    'values': [
      'normal',
      'nowrap',
      'pre',
      'pre-line',
      'pre-wrap',
    ],
  },
  {
    'property': 'font-size-adjust',
    'values': [
      'none',
    ],
  },
  {
    'property': 'font-style',
    'values': [
      'normal',
      'italic',
      'oblique',
    ],
  },
  {
    'property': 'line-height',
    'values': [
      'normal',
    ],
  },
  {
    'property': 'font-weight',
    'values': [
      'normal',
      'bold',
      'bolder',
      'lighter',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
    ],
  },
  {
    'property': 'word-spacing',
    'values': [
      'normal',
    ],
  },
  {
    'property': 'page-break-after',
    'values': [
      'auto',
      'always',
      'avoid',
      'left',
      'right',
    ],
  },
  {
    'property': 'outline-color',
    'values': [
      ...colorsList,
      'invert',
    ],
  },
  {
    'property': 'row-gap',
    'values': [
      'normal',
    ],
  },
  {
    'property': 'column-gap',
    'values': [
      'normal',
    ],
  },
  {
    'property': 'column-rule',
    'values': [
    ],
  },
  {
    'property': 'columns',
    'values': [
      'auto',
      'column-width',
      'column-count',
    ],
  },
  {
    'property': 'column-rule-style',
    'values': [
      ' none',
      ' hidden',
      ' dotted',
      ' dashed',
      ' solid',
      ' double',
      ' groove',
      ' ridge',
      ' inset',
      ' outset',
    ],
  },
  {
    'property': 'font-variant',
    'values': [
      'normal',
      'small-caps',
    ],
  },
  {
    'property': 'font-variation-settings',
    'values': [
      'normal',
      'small-caps',
    ],
  },
  {
    'property': 'column-rule-width',
    'values': [
      ' medium',
      ' thin',
      ' thick',
      ' length',
    ],
  },
  {
    'property': 'cursor',
    'values': [
      'alias',
      'all-scroll',
      'auto',
      'cell',
      'context-menu',
      'col-resize',
      'copy',
      'crosshair',
      'default',
      'e-resize',
      'ew-resize',
      'grab',
      'grabbing',
      'help',
      'move',
      'n-resize',
      'ne-resize',
      'nesw-resize',
      'ns-resize',
      'nw-resize',
      'nwse-resize',
      'no-drop',
      'none',
      'not-allowed',
      'pointer',
      'progress',
      'row-resize',
      's-resize',
      'se-resize',
      'sw-resize',
      'text',
      'vertical-text',
      'w-resize',
      'wait',
      'zoom-in',
      'zoom-out',
    ],
  },
  {
    'property': 'column-fill',
    'values': [
      'balance',
      'auto',
    ],
  },
  {
    'property': 'animation-fill-mode',
    'values': [
      'none',
      'forwards',
      'backwards',
      'both',
    ],
  },
  {
    'property': 'outline-width',
    'values': [
      'medium',
      'thin',
      'thick',
    ],
  },
  {
    'property': 'outline',
    'values': [],
  },
  {
    'property': 'animation',
    'values': [],
  },
  {
    'property': 'font-stretch',
    'values': [
      'ultra-condensed',
      'extra-condensed',
      'condensed',
      'semi-condensed',
      'normal',
      'semi-expanded',
      'expanded',
      'extra-expanded',
      'ultra-expanded',
    ],
  },
  {
    'property': 'list-style-image',
    'values': [
      'none',
      'url',
    ],
  },
  {
    'property': 'transition-duration',
    'values': [],
  },
  {
    'property': 'perspective',
    'values': [
      'none',
    ],
  },
  {
    'property': 'animation-play-state',
    'values': [
      'paused',
      'running',
    ],
  },
  {
    'property': 'backface-visibility',
    'values': [
      'visible',
      'hidden',
    ],
  },
  {
    'property': 'column-count',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'transition-delay',
    'values': [],
  },
  {
    'property': 'transform',
    'values': [
      'none',
    ],
  },
  {
    'property': 'resize',
    'values': [
      ' none',
      ' both',
      ' horizontal',
      ' vertical',
    ],
  },
  {
    'property': 'text-overflow',
    'values': [
      'clip',
      'ellipsis',
      'string',
    ],
  },
  {
    'property': 'caption-side',
    'values': [
      'top',
      'bottom',
    ],
  },
  {
    'property': 'filter',
    'values': [
      'none',
    ],
  },
  {
    'property': 'content',
    'values': [
      'normal',
      'none',
      'counter',
      'open-quote',
      'close-quote',
      'no-open-quote',
      'no-close-quote',
    ],
  },
  {
    'property': 'transition-timing-function',
    'values': [
      'ease',
      'linear',
      'ease-in',
      'ease-out',
      'ease-in-out',
    ],
  },
  {
    'property': 'box-sizing',
    'values': [
      'border-box',
      'content-box',
    ],
  },
  {
    'property': 'page-break-before',
    'values': [
      'auto',
      'always',
      'avoid',
      'left',
      'right',
    ],
  },
  {
    'property': 'animation-timing-function',
    'values': [
      'linear',
      'ease',
      'ease-in',
      'ease-out',
      'ease-in-out',
    ],
  },
  {
    'property': 'outline-offset',
    'values': [],
  },
  {
    'property': 'column-width',
    'values': [
      'auto',
    ],
  },
  {
    'property': 'outline-style',
    'values': [
      'none',
      'hidden',
      'dotted',
      'dashed',
      'solid',
      'double',
      'groove',
      'ridge',
      'inset',
      'outset',
    ],
  },
  {
    'property': 'transform-origin',
    'values': [],
  },
  {
    'property': 'transform-style',
    'values': [
      'flat',
      'preserve-3d',
    ],
  },
  {
    'property': 'transition',
    'values': [
      'transition-property',
      'transition-duration',
      'transition-timing-function',
      'transition-delay',
    ],
  },
  {
    'property': 'page-break-inside',
    'values': [
      'auto',
      'avoid',
    ],
  },
  {
    'property': 'column-span',
    'values': [
      'all',
    ],
  },
  {
    'property': 'transition-property',
    'values': [
      'none',
      'all',
      'property',
    ],
  },
  {
    'property': 'animation-iteration-count',
    'values': [
      'infinite',
    ],
  },
  {
    'property': 'animation-name',
    'values': [
      'keyframename',
      'none',
    ],
  },
]
