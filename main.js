import ReactDOM from "react-dom";

export default function Main() {}

const div = document.createElement("div");
const url = window.location.href;
let text;
try {
  documentFromTab = getSourceAsDOM(url);
} catch (err) {
  console.error(`failed to execute script: ${err}`);
} finally {
  //   deleteIntervals();
  //   deleteTimeouts();
  //   cleanDOMAfter(url);
  //   deleteEvents();
  //   deleteCurrentDOM();
  document.body.appendChild(div);
  ReactDOM.render(
    <Main text={selectedText} url={url} title={documentTitle} />,
    div
  );
}
