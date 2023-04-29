import userEvent from '@testing-library/user-event';
import './App.css';
import { useState } from 'react';

function App() {
  let [title, set_title] = useState(['강남 맛집', '우동 레시피', '코딩 학습법']);
  let [like, set_like] = useState([0, 0, 0]);
  let [modal, set_modal] = useState('close');
  let [num, set_num] = useState(0);
  let [input, set_input] = useState('');

  return (
    <div className="App">
      <div className='navbar'>
        <h4>React blog</h4>
      </div>

      {
        title.map(function(each_title, i)
        {
          return (
            <div className='list'>
              <h4 onClick={()=>{ 
                modal === 'open' ? set_modal('close') : set_modal('open')
                set_num(i);
              }}> {each_title}
                <span onClick={()=>{
                  let copy_like = [...like];
                  copy_like[i] += 1;
                  set_like(copy_like);
                }}> 👍🏻 {like[i]} </span>
              </h4>
              <p>내용</p>
              <p>2월 {i + 10}에 발행</p>
              <button onClick={()=>{
                let copy = [...title];
                copy.splice(i, 1);
                set_title(copy);
              }}>글 삭제</button>
            </div> 
          );})
    }
    {
      modal === 'open' ? <Modal title={title} title_num={num}></Modal> : null
    }

      <input onChange={(e)=>{set_input(e.target.value)}}></input>
      <button onClick={()=>{
        let title_copy = [...title];
        let like_copy = [...like];
        like_copy.unshift(0);
        title_copy.unshift(input);
        set_title(title_copy);
        set_like(like_copy);
      }}>글 발행</button>
    </div>
  )
}

function Modal(props)
{
  return(
    <div className='modal'>
      <h4>{props.title[props.title_num]}</h4>
      <p>내용</p>
      <p>발행날짜</p>
    </div>
  );
}

export default App;
