import NotePadIcon from 'assets/icons/notepad-0.png'
import FileExplorerIcon from 'assets/icons/directory_open_file_mydocs-3.png'

export const hardDiskModel = [
  {
    name: 'C',
    totalCapacity: 128,
    remainingCapacity: 100,
    files: [
      {
        name: 'My Documents',
        size: 0,
        createdAt: '10/03/2023 05:00',
        files: []
      },
      {
        name: 'Program Files',
        size: 0,
        createdAt: '10/03/2023 05:00',
        files: [
          {
            name: 'Notepad',
            size: 0,
            createdAt: '10/03/2023 05:00',
            files: [
              {
                name: 'config',
                size: 0,
                createdAt: '10/03/2023 05:00',
                extension: 'ini',
                data: [
                  'txt',
                  'ini'
                ]
              },
              {
                name: 'Notepad',
                icon: NotePadIcon,
                size: 0,
                createdAt: '10/03/2023 05:00',
                extension: 'exe',
                data: 'notepad'
              }
            ]
          }
        ]
      },
      {
        name: 'Windows',
        size: 0,
        createdAt: '10/03/2023 05:00',
        files: [
          {
            name: 'System32',
            size: 0,
            createdAt: '10/03/2023 05:00',
            files: [
              {
                name: 'File Explorer',
                size: 0,
                createdAt: '10/03/2023 05:00',
                files: [
                  {
                    name: 'config',
                    size: 0,
                    createdAt: '10/03/2023 05:00',
                    extension: 'ini',
                    data: []
                  },
                  {
                    name: 'File Explorer',
                    icon: FileExplorerIcon,
                    size: 0,
                    createdAt: '10/03/2023 05:00',
                    extension: 'exe',
                    data: 'file-explorer'
                  }
                ]
              }
            ]
          },
          {
            name: 'Desktop',
            size: 0,
            createdAt: '10/03/2023 05:00',
            readOnly: true,
            files: [
              {
                name: 'Notepad',
                icon: NotePadIcon,
                size: 0,
                createdAt: '10/03/2023 05:00',
                extension: 'lnk',
                data: 'C\\Program Files\\Notepad\\Notepad.exe'
              },
              {
                name: 'File Explorer',
                icon: FileExplorerIcon,
                size: 0,
                createdAt: '10/03/2023 05:00',
                extension: 'lnk',
                data: 'C\\Windows\\System32\\File Explorer\\File Explorer.exe'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'D',
    totalCapacity: 256,
    remainingCapacity: 50,
    files: []
  }
]