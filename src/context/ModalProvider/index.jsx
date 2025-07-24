import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext();

function ModalProvider({ children }) {
  //  tất cả nhữg thằng bọc trong Modal đều là children và nó đếu sử dụng đc  khi provider
  const [isShowing, setIsShowing] = useState(false);
  const [content, setContent] = useState();
  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style = "";
    }
  }, [isShowing]);
  return (
    <>
      <ModalContext.Provider value={{ setIsShowing, setContent }}>
        {children}
        {/*  được bọc trong provider thfi đều truy cập đc đến value nhờ useContext */}
        {/*  sẽ truy cập để sử dụng đến dư liệu này  */}
        {isShowing && (
          <div className="fixed inset-0">
            <div
              className="absolute inset-0 flex items-center justify-center bg-slate-600/60"
              onClick={() => setIsShowing(false)}
            >
              <p>{content}</p>
            </div>
          </div>
        )}
      </ModalContext.Provider>
    </>
  );
}

export default ModalProvider;
