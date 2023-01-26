interface IProps {
  onDragStart: () => void
  onDragEnd: () => void
  onDragging: () => void
}

export const useDrag = (props: IProps) => {
  const { onDragStart, onDragEnd, onDragging } = props
}