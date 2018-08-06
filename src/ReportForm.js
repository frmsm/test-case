import React from 'react';

const ReportForm = (props) => {
    return (
        <div className={'report-window'} style={props.reporting ? {display: 'block'} : {display: 'none'}}>
            <form action="">
                <span className='close-window' onClick={props.changeReporting}/>
                <h2>Отправить жалобу</h2>
                <textarea name="text-report" cols="30" rows="10"></textarea>
                <br/>
                <button className="send-report" onClick={props.changeReporting}>Отправить</button>
            </form>
        </div>
    )
};

export default ReportForm;