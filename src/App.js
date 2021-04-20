import { useState } from 'react'
import { useCollection } from './hooks/use-collection'
import { useDocument } from './hooks/use-document'
import { useInputField } from './hooks/use-input-field'

const App = () => {
  const { data: messages } = useCollection('messages')
  const { add, update, remove, loading } = useDocument('messages')
  const [name, handleName, resetName] = useInputField()
  const [text, handleText, resetText] = useInputField()
  // state for updates
  const [idToUpdate, setIdToUpdate] = useState('')
  const [newName, handleNewName, resetNewName] = useInputField('')
  const [newText, handleNewText, resetNewText] = useInputField('')

  const handleSubmit = async e => {
    e.preventDefault()

    // don't do anything if name or text is empty
    if (!name || !text) return

    await add({ name, text })

    // reset form values after submission
    resetName()
    resetText()
  }

  // reset new values and
  const onToggleUpdate = id => {
    resetNewName()
    resetNewText()
    setIdToUpdate(idToUpdate ? '' : id)
  }

  return (
    <div className="w-screen h-screen p-4">
      <p className="text-3xl mb-8">Hello world</p>

      <form onSubmit={handleSubmit} className="mb-8 space-x-4">
        <input
          value={name}
          onChange={handleName}
          placeholder="Enter name..."
          className="p-2 border border-black"
        />
        <input
          value={text}
          onChange={handleText}
          placeholder="Enter message text..."
          className="p-2 border border-black"
        />

        <button
          disabled={loading}
          type="submit"
          className="border border-black p-2"
        >
          Add message
        </button>
      </form>

      {messages && messages.length > 0 ? (
        <div className="space-y-6" style={{ maxWidth: 320 }}>
          {messages.map(({ id, name, text }) => (
            <div key={id} className="p-2 bg-gray-100 rounded-lg">
              <div className="flex justify-between">
                <p className="font-semibold">{name} says:</p>
                <div className="space-x-4">
                  <button onClick={() => onToggleUpdate(id)}>update</button>
                  <button onClick={() => remove(id)}>delete</button>
                </div>
              </div>
              <p>{text}</p>

              {idToUpdate === id && (
                <div className="mt-6 flex flex-col space-y-2">
                  <input
                    value={newName}
                    onChange={handleNewName}
                    placeholder="New name..."
                    className="p-2 border border-black"
                  />
                  <input
                    value={newText}
                    onChange={handleNewText}
                    placeholder="New text..."
                    className="p-2 border border-black"
                  />
                  <button
                    onClick={async () => {
                      await update(idToUpdate, { name: newName, text: newText })
                      setIdToUpdate('')
                    }}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">(No messages to show)</p>
      )}
    </div>
  )
}

export default App
