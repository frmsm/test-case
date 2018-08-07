import React from 'react';
import MyInterests from './MyInterests';
import FriendsInterests from './FriendsInterests';
import ReportForm from './ReportForm';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myHobbies: [{id: 1533319559071, hobby: 'Хоккей', received: false},
                {id: 123456645632, hobby: 'Высокоточная вёрстка под старые версии Microsoft Internet Explorer, начиная с версии IE9'},
                {id: 13546346343, hobby: 'Распространение информации среди жильцов своего жэка'}],
            mySpoilerHeight: false,
            friendsHobbies: [{id: 153331954709, hobby: 'Баскетбол', sended: false},
                {id: 153331954779, hobby: 'Нарезка Photoshop/Fireworks макетов на скорости света', sended: false},
                {id: 153332954709, hobby: 'Занятие космитческим туризмом', sended: false},
                {id: 1532345954709, hobby: 'Программирование старых газовых плит на бейсике под BolgenOS', sended: false}],
            friendsSpoilerHeight: false,
            friendsSpoilerMinHeight: 40,
            isReportingOpen: false,
        };
        this.addMyHobby = this.addMyHobby.bind(this);
        this.removeMyHobby = this.removeMyHobby.bind(this);
        this.changeSpoiler = this.changeSpoiler.bind(this);
        this.addHobbyFromFriend = this.addHobbyFromFriend.bind(this);
        this.toggleReportingWindow = this.toggleReportingWindow.bind(this);
    }

    toggleReportingWindow() {
        this.setState({
            isReportingOpen: !this.state.isReportingOpen
        })
    }

    changeSpoiler(spoiler) {
        switch (spoiler) {
            case 'mySpoiler':
                this.setState({mySpoilerHeight: !this.state.mySpoilerHeight});
                break;
            case 'friendsSpoiler':
                this.setState({friendsSpoilerHeight: !this.state.friendsSpoilerHeight});
                break;
            default:
                break;
        }
    }

    removeMyHobby(hobbyIndex) {
        const myHobbies = this.state.myHobbies;
        let friendsSpoilerMinHeight = this.state.friendsSpoilerMinHeight;
        const friendsHobbies = this.state.friendsHobbies;
        if (myHobbies[hobbyIndex].received === true) {
            let i = friendsHobbies.findIndex(hobby=>{
                return hobby.id === myHobbies[hobbyIndex].id;
            });
            friendsHobbies[i].sended = false;
            friendsSpoilerMinHeight = i === 0 || i === 1 ? friendsSpoilerMinHeight - 20 : friendsSpoilerMinHeight
        }
        this.setState({
            myHobbies: myHobbies.filter((hobby,i)=>{ return i !== hobbyIndex}),
            friendsHobbies: friendsHobbies,
            friendsSpoilerMinHeight: friendsSpoilerMinHeight
        })
    }

    addHobbyFromFriend(hobbyIndex) {
        const friendsHobbies = this.state.friendsHobbies;
        const friendsSpoilerMinHeight = this.state.friendsSpoilerMinHeight;
        friendsHobbies[hobbyIndex].sended = 'true';
        this.setState({
            friendsHobbies: friendsHobbies,
            myHobbies: [...this.state.myHobbies,
                {id: friendsHobbies[hobbyIndex].id,
                    hobby: friendsHobbies[hobbyIndex].hobby,
                    received: true}],
            friendsSpoilerMinHeight: hobbyIndex === 0 || hobbyIndex === 1 ? friendsSpoilerMinHeight + 20 : friendsSpoilerMinHeight

        })
    }

    addMyHobby(hobby) {
        this.setState({
            myHobbies: [...this.state.myHobbies,
                {id: Date.now(),
                    hobby: hobby.hobby,
                    received: false}]
        })
    }

    render() {
        return (
            <div className='wrapper'>
                <MyInterests name={'О себе'}
                             hobbies={this.state.myHobbies}
                             addHobby={this.addMyHobby}
                             removeHobby={this.removeMyHobby}
                             changeSpoiler={this.changeSpoiler}
                             spoilerHeight={this.state.mySpoilerHeight}
                />
                <FriendsInterests name={'Интересы друга'}
                                  hobbies={this.state.friendsHobbies}
                                  addHobby={this.addHobbyFromFriend}
                                  spoilerHeight={this.state.friendsSpoilerHeight}
                                  spoilerMinHeight={this.state.friendsSpoilerMinHeight}
                                  changeSpoiler={this.changeSpoiler}
                                  changeReporting={this.toggleReportingWindow}
                />
                <ReportForm reporting={this.state.isReportingOpen}
                            changeReporting={this.toggleReportingWindow}/>
            </div>
        )
    }
}

export default App;
