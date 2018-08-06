import React from 'react';
import add from './img/add.gif';

const FriendsInterests = (props) => {

    const receiveHobby = (e) => {
        e.preventDefault();
        let index = props.hobbies.findIndex(hobby=> hobby.id === Number(e.target.id));
        props.addHobby(index);
    };

    const setListHeight = () => {
        if (props.spoilerHeight) {
            return {maxHeight: '300px'}
        }
        return {maxHeight: props.spoilerMinHeight + 'px'}
    };

    const makeHobbiesList = () => {
        return props.hobbies.map((hobby) =>
            <li key={hobby.id.toString()}>
                <img  src={add} alt={'+'}
                      key={hobby.id.toString()}
                      id={hobby.id.toString()}
                      className={hobby.sended ? 'disabled' : 'add-from-friend'}
                      onClick={receiveHobby} />
                <span className='listText'>{hobby.hobby}</span>
                <span className={hobby.sended ? 'sended' : ''} />
                <span className={hobby.sended ? 'disabled' : 'reporting'}
                      onClick={props.changeReporting}>пожаловаться</span>
            </li>);
    };

    return (
        <div className='interests'>
            <h2 className='title'>{props.name}</h2>
            <hr/>
            <h3>Хобби</h3>
            <div className='hobbies-input'>
                <ul style={setListHeight()}>
                    {makeHobbiesList()}
                </ul>
                <span className={props.hobbies.length > 2 ? 'spoiler visible' : 'spoiler'}
                      onClick={()=>{props.changeSpoiler('friendsSpoiler')}}>
            {`Еще ${props.hobbies.length - 2} интересов`}
          </span>
            </div>
        </div>
    )
};

export default FriendsInterests;