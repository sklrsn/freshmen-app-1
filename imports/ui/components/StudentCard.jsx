import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import BaseComponent from './BaseComponent.jsx';

export default class StudentCard extends BaseComponent{
  constructor(props) {
    super(props);
  //  const name = props.name;
  }

  render() {
    var user = Meteor.user();
    const { name } = this.props;
    //const email = user.emails[0].address;
    //const emailLocalPart = email.substring(0, email.indexOf('@'));
    return (
      <div className="student-card">

        <a href="/profile"><img src="http://orig08.deviantart.net/0f29/f/2014/283/e/f/butters_stotch_by_edgotru-d7v25i4.png" alt="sup" /></a>
        <a href="/profile"><p>{name}</p></a>
      </div>
    );
  }
}

/*
const StudentCard = ({ user }) => (
  <div className="student-card">
    <a href="/profile"><img src="" alt="sup" /></a>
    <a href="/profile">{user.emails[0].address}</a>
  </div>
);

StudentCard.propTypes = {
  user: React.PropTypes.object
};
*/
//export default StudentCard;
