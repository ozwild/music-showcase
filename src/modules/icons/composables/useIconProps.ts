import { ComponentPropsOptions } from 'vue'

export const sharedIconProps = {
  scale: {
    type: Number,
    required: false,
    default: 1,
  },
} satisfies ComponentPropsOptions

/* export function useIconProps() {
  const defaultProps: IIconSharedProps = {
    scale: 1,
  }

  return {
    defaultProps,
  }
} */
