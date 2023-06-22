import React, { useEffect, useContext } from 'react';
import noteContext from '../noteContext/note_Context.js';
const Home = () => {
  const { setState } = useContext(noteContext);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setState(true);
    }
  }, [])
  return (
    <>
      <div id="home_main">
        <div id="home_style">
          <h1>iNoteBook</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus doloremque cumque rerum corrupti quaerat laudantium, quam consectetur, odit enim sunt ut at deserunt dolorem ipsa, inventore qui porro itaque tenetur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quo vitae veritatis architecto eos dolore nulla aspernatur porro facilis vel aperiam sint atque corporis illo, fuga voluptate dolores, asperiores non quasi voluptatem molestias excepturi ipsum quos. Quas voluptate dolore expedita aperiam, cumque, culpa dicta soluta assumenda dolorem neque facilis rem odit saepe accusamus illo suscipit. Commodi ducimus quibusdam dolore, at eveniet dicta dolor expedita nam iste totam dolorum voluptatibus accusamus accusantium, vero soluta, facere reiciendis doloremque! Animi omnis veniam blanditiis aliquam, nobis impedit libero facilis, dicta odio repellat, dolor cumque sequi dolore non vitae harum! Similique quidem odio itaque repellat.</p>
        </div>

        <div className='home-style1'>
          <img src="https://3.imimg.com/data3/WD/JT/MY-2281434/notebooks-1000x1000.jpg" alt="notebookimage" />
        </div>
      </div>
    </>
  );
}
export default Home;