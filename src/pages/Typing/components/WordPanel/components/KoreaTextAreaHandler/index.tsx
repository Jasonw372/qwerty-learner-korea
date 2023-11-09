import type { WordUpdateAction } from '../InputHandler'
import { TypingContext } from '@/pages/Typing/store'
import type { FormEvent } from 'react'
import { useCallback, useContext, useEffect, useRef } from 'react'

export default function TextAreaHandler({ updateInput }: { updateInput: (updateObj: WordUpdateAction) => void }) {
  const textRef = useRef<HTMLInputElement>(null)
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state } = useContext(TypingContext)!

  useEffect(() => {
    if (!textRef.current) return

    if (state.isTyping) {
      textRef.current.focus()
    } else {
      textRef.current.blur()
    }
  }, [state.isTyping])

  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const nativeEvent = e.nativeEvent as InputEvent
    if (!nativeEvent.isComposing && nativeEvent.data !== null) {
      updateInput({ type: 'add', value: nativeEvent.data, event: e })

      if (textRef.current) {
        textRef.current.value = ''
      }
    }
  }

  const onBlur = useCallback(() => {
    if (!textRef.current) return

    if (state.isTyping) {
      textRef.current.focus()
    }
  }, [state.isTyping])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode == 13) {
      console.log('enter')
      for (let i = 0; i < textRef.current!.value.length; i++) {
        updateInput({ type: 'add', value: textRef.current!.value[i], event: e })
      }
      if (textRef.current) {
        textRef.current.value = ''
      }
    }
  }
  return (
    <input
      className="input input-bordered w-full max-w-xs"
      ref={textRef}
      autoFocus={true}
      spellCheck="false"
      onKeyDown={handleKeyDown}
    ></input>
  )
}
