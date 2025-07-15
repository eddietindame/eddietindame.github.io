import React from 'react'
import { MTGTool } from 'components/MTGTool/index'

export default function MTGToolPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700">
      <div className="flex h-full flex-col">
        <div className="flex-1">
          <MTGTool />
        </div>
      </div>
    </div>
  )
}
