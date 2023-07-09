export interface IIconSharedProps {
  scale?: number
}
export function useIconProps() {
  const defaultProps: IIconSharedProps = {
    scale: 1,
  }

  return {
    defaultProps,
  }
}
