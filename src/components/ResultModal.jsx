import { useImperativeHandle, useRef } from "react";
import {createPortal} from 'react-dom'

export default function ResultModal({ ref, targetTime, timeRemaining, onReset }) {
  const dialog = useRef();
  const userLost = timeRemaining<=0;
  const formattedTime = (timeRemaining/1000).toFixed(2);
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100)
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost </h2>}
      {!userLost && <h2>Your Score: {score}</h2>}

      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formattedTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
}
