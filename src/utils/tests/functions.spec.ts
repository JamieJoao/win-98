import { IFile } from 'types/interfaces'
import { getFileFromPath } from 'utils/functions'

const STORAGE_FAKE: IFile[] = [
  {
    name: 'A',
    totalCapacity: 128,
    remainingCapacity: 100,
    files: [
      {
        name: 'B',
        size: 0,
        createdAt: 'created-at',
        files: [
          {
            name: 'DD',
            size: 0,
            createdAt: 'created-at',
            files: []
          },
          {
            name: 'EE',
            size: 0,
            createdAt: 'created-at',
            extension: 'eee',
            data: 'data-eee'
          }
        ]
      },
      {
        name: 'C',
        size: 0,
        createdAt: 'created-at',
        files: []
      }
    ]
  }
]

describe('Test para functions', () => {
  /**
   * 
   * - Si path es un string vacío, retorna null
   * - Si storage es un array, retorna null
   * - Retornar el elemento correspondiente al path
   */
  test('Si path es un string vacío retorna null', () => {
    expect(getFileFromPath('', STORAGE_FAKE)).toBeNull()
  })

  // /*
  // test('Si storage es un array, retorna null', () => {
  //   expect(getFileFromPath('A', [])).toBeNull()
  // })
  // */

  test('Debería retornar el objeto correspondiente al path', () => {
    // expect(getFileFromPath('A\\C\\DD', STORAGE_FAKE)).toEqual(STORAGE_FAKE[0].files[1].files?.[1])
  })
})