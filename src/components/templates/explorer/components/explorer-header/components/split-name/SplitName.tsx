interface SplitNameProps {
  name: string
  hotKey?: string
}

export const SplitName = (props: SplitNameProps) => {
  const { name, hotKey } = props

  const index = name.indexOf(hotKey!)
  return (
    <>
      <span>{name.substring(0, index)}</span>
      <span className='--underline'>{hotKey}</span>
      <span>{name.substring(index + 1)}</span>
    </>
  )
}