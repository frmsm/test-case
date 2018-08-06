import React from 'react';
import close from './img/close.png';

const MyInterests = (props) => {

    const removeHobby = (e) => {
        let index = props.hobbies.findIndex(hobby=>{
            return hobby.id === Number(e.target.id);
        });
        props.removeHobby(index);
    };

    const addHobby = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            let value = e.target.value.trim();
            if (value === '' || value.length < 5) {
                e.target.value = value;
                return;
            }
            props.addHobby({hobby: value});
            e.target.value = '';
            props.changeSpoiler('mySpoiler');
        }
    };

    const setListHeight = () => {
        if (props.spoilerHeight) {
            return {maxHeight: '300px'}
        }
        return {maxHeight: '40px'}
    };

    const makeHobbiesList = () => {
        return props.hobbies.map((hobby) =>
            <li key={hobby.id.toString()}>
                <img  src={close} alt='del'
                      id={hobby.id.toString()}
                      className='del'
                      onClick={removeHobby} />
                <span className='listText'>{hobby.hobby}</span>
            </li>);
    };

    return (
        <div className='interests'>
            <h2 className='title'>{props.name}</h2>
            <hr/>
            <h3>Хобби</h3>
            <div className='hobbies-input'>
                <input  minLength='5'
                        type='text'
                       placeholder='Введите текст'
                       onKeyUp={addHobby}
                />
                <ul className='list'
                    style = {setListHeight()}>
                    {makeHobbiesList()}
                </ul>
                <span className={props.hobbies.length > 2 ? 'spoiler visible' : 'spoiler'}
                      onClick={()=>{props.changeSpoiler('mySpoiler')}}>
            {`Еще ${props.hobbies.length - 2} интересов`}
          </span>
            </div>
        </div>
    )
};

export default MyInterests;