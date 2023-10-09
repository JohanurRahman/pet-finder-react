import { MutableRefObject, ReactElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children }: { children: ReactElement }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);

    // Returning an useEffect in functional component
    // is similar to componentWillMount() lifecycle method
    return () => {
      if (elRef.current) modalRoot.removeChild(elRef.current);
    };
  }, []);

  // <div> is not necessary for wrapping the children. It's just for styling purpose
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
