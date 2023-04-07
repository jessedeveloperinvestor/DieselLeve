import React from 'react';
import './style.css';

export default function App() {
  const demos = {
    soundcloud:
      '<iframe style="position: absolute;width:99%;height:100%;overflow:hidden" scrolling="yes" frameborder="no" allow="autoplay" src="https://kalburgimanjunath.github.io/HTML-project/instructor.html"></iframe>',
  };
  function Iframe(props) {
    return (
      <div
        className="iframework"
        dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }}
      />
    );
  }
  return (
    <div>
      <Iframe iframe={demos['soundcloud']} allow="autoplay" />
    </div>
  );
}
