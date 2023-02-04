import { useState } from "react";

type onChange = React.ChangeEventHandler<HTMLInputElement>;
type onClick = React.MouseEventHandler<HTMLButtonElement>;
type CompProps = { id: number; max: number };

function App() {
  const [num, setNum] = useState(0);
  const [render, setRender] = useState(0);

  const onChange: onChange = (e) => {
    const input = Number(e.target.value);
    const numberChecker = Number.isNaN(input);
    if (numberChecker) setNum(0);
    else setNum(input);
  };

  const onClick: onClick = () => {
    setRender(num);
  };

  return (
    <div className="App">
      <input type="text" onChange={onChange} />
      <div>
        {Array.from({ length: render }, (_, i) => {
          return <TempComp key={i} max={render} id={i} />;
        })}
      </div>
      <button onClick={onClick}>생성하기</button>
    </div>
  );
}

function TempComp({ id, max }: CompProps) {
  const onKeyDown = (e: any) => {
    e.preventDefault();
    const par = e.target.parentNode;
    const body = par.parentNode;
    const parId = Number(par.id);
    const id = Number(e.target.id);
    if (e.key === "ArrowRight") par.childNodes[Math.min(id + 1, 3)].focus();
    if (e.key === "ArrowLeft") par.childNodes[Math.max(id - 1, 0)].focus();
    if (e.key === "ArrowDown") body.childNodes[Math.min(parId + 1, max - 1)].childNodes[id].focus();
    if (e.key === "ArrowUp") body.childNodes[Math.max(parId - 1, 0)].childNodes[id].focus();
    if (e.key === "Tab")
      if (id === 3) {
        if (parId !== max - 1) body.childNodes[Math.min(parId + 1, max - 1)].childNodes[0].focus();
      } else par.childNodes[Math.min(id + 1, 3)].focus();
  };

  return (
    <div id={String(id)}>
      <input type="text" onKeyDown={onKeyDown} id="0" />
      <input type="text" onKeyDown={onKeyDown} id="1" />
      <input type="text" onKeyDown={onKeyDown} id="2" />
      <input type="text" onKeyDown={onKeyDown} id="3" />
    </div>
  );
}

export default App;
