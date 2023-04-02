import { useRef, useEffect, useState } from 'react'
import { ActionItem, ControlItem } from '../const'

export const useExpolorerHeader = () => {
  const [restActions, setRestActions] = useState<ActionItem[]>([])
  const [restControls, setRestControls] = useState<ControlItem[]>([])

  const actionsListRef = useRef<HTMLDivElement>(null)
  const actionsPivotRef = useRef<HTMLDivElement>(null)
  const controlsListRef = useRef<HTMLDivElement>(null)
  const controlsPivotRef = useRef<HTMLDivElement>(null)

  const controlsList: ControlItem[] = [
    {
      name: 'File',
      hotKey: 'F',
      options: [
        { name: 'Delete', hotKey: 'D' },
        { name: 'Rename', hotKey: 'm' },
        { name: 'Properties', hotKey: 'r' },
        { name: 'separator' },
        { name: 'Close', hotKey: 'C' },
      ]
    },
    {
      name: 'Edit',
      hotKey: 'E',
      action() { }
    },
    {
      name: 'View',
      hotKey: 'V',
      action() { }
    },
  ]

  const actionsList: ActionItem[] = [
    { name: 'Back', iconKey: 'back', action() { } },
    { name: 'Forward', iconKey: 'forward', action() { } },
    { name: 'Up', iconKey: 'up', action() { } },
    { name: 'separator' },
    { name: 'Cut', iconKey: 'cut', action() { } },
    { name: 'Copy', iconKey: 'copy', action() { } },
    { name: 'Paste', iconKey: 'paste', action() { } },
    { name: 'separator' },
    { name: 'Undo', iconKey: 'undo', action() { } },
    { name: 'Delete', iconKey: 'delete', action() { } },
    { name: 'Properties', iconKey: 'properties', action() { } },
    { name: 'separator' },
    { name: 'Views', iconKey: 'views', action() { } },
  ]

  useEffect(() => {
    let actionsObserver: ResizeObserver,
      controlsObserver: ResizeObserver

    if (actionsPivotRef.current && actionsListRef.current && controlsPivotRef.current && controlsListRef.current) {
      actionsObserver = observeNode(
        actionsPivotRef.current,
        actionsListRef.current,
        (nodeIndex: number) => {
          setRestActions(
            nodeIndex > -1
              ? actionsList.slice(nodeIndex - 1).filter(obj => obj.name !== 'separator')
              : []
          )
        }
      )
      controlsObserver = observeNode(
        controlsPivotRef.current,
        controlsListRef.current,
        (nodeIndex: number) => {
          setRestControls(
            nodeIndex > -1
              ? controlsList.slice(nodeIndex - 1)
              : []
          )
        }
      )
    }

    return () => {
      actionsObserver?.disconnect()
      controlsObserver?.disconnect()
    }
  }, [])

  const observeNode = (containerNode: HTMLElement, targetToObserve: HTMLElement, callback: (arg: number) => void) => {
    const resizeObserver = new ResizeObserver(entries => {
      const { target } = entries[0]

      const nodeOverflowed = Array
        .from(target.childNodes)
        .findIndex(node => {
          if (containerNode) {
            const nodeParsed = node as HTMLDivElement
            const { right } = nodeParsed.getBoundingClientRect()
            const { left: explorerLeft } = containerNode.getBoundingClientRect()

            return right > explorerLeft
          }
        })

      callback(nodeOverflowed)
    })

    resizeObserver.observe(targetToObserve)

    return resizeObserver
  }

  return {
    controlsListRef,
    controlsPivotRef,
    actionsListRef,
    actionsPivotRef,

    restControls,
    restActions,

    controlsList,
    actionsList,
  }
}