import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';
import MobileMenu from '../components/MobileMenu.jsx';
import { GoogleMap, Marker, SearchBox } from "react-google-maps";
import $ from "jquery";
//import Posts from '../components/Posts.jsx';
import Tasks from '../components/Tasks.jsx';
import Posty from '../components/Posts.jsx';
import Events from '../components/Events.jsx';
import PostCreate from '../components/post-create/PostCreate';
import EventLocator from '../components/EventLocator';
import { Groups } from '../../api/groups/groups.js';
import { Posts } from '../../api/posts/posts.js';

export default class TutorDashboard extends BaseComponent {
  constructor(props) {
    super(props);
    const users = Meteor.users.find().fetch();
    const id = Meteor.userId();



    this.state.tasks = Posts.find({type: "task", creator: Meteor.userId()}).fetch();
    this.state.otherPosts = Posts.find({type: {$not: "task"}}).fetch();

    this.update = this.update.bind(this);
  }

  update(){
    this.setState({otherPosts: Posts.find({type: {$not: "task"}}).fetch()});


  }

  taskFormFunc() {
    $('.taskForm').css('display', 'block');
    $('.eventForm').css('display', 'none');
    $('.postForm').css('display', 'none');
    $('#map-picker').locationpicker();
  }

  eventFormFunc() {
    $('.taskForm').css('display', 'none');
    $('.eventForm').css('display', 'block');
    $('.postForm').css('display', 'none');
  }

  postFormFunc() {
    $('.taskForm').css('display', 'none');
    $('.eventForm').css('display', 'none');
    $('.postForm').css('display', 'block');
  }

  insertPosts(e) {
    Posts.insert(e.text);
  }

  render() {
    const user = this.props;
    console.log(this.state.otherPosts);
    var postsToDisplay = [];
    for (var i = 0;  i < this.state.otherPosts.length ; i++ )
    {
      postsToDisplay.push(<Posty key={i} name="Post" content={this.state.otherPosts[i].text} />);
    }

    return (

      <div className="tutor-dashboard">
        <div className ="tutor-main">
          <PostCreate callBack={this.update}></PostCreate>
          {/*     <form className="createTask">
           Task name -
           <input type="text" name="taskname" /><br />
           Steps -
           <input type="text" name="steps" /><br />
           Documents required -
           <input type="text" name="docs" /><br />
           <input type="submit" value="Submit" />
           </form>
           */}
          <div className="button-group">
            <button className="btn btn-success" onClick={this.taskFormFunc}>Create Task</button>
            <button className="btn btn-info" onClick={this.eventFormFunc}>Create Event</button>
            <button className="btn btn-warning" onClick={this.postFormFunc}>Create Post</button>
          </div>
          <form className="taskForm">
            <h4>Create a task</h4>
            <div className="form-group">
              <input type="text" className="form-control" id="taskName" placeholder="Enter a name" />

            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="steps" placeholder="Steps" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="docs" placeholder="Documents required" />
            </div>


            <button type="submit" className="btn btn-success">Create task</button>
          </form>

          <form className="eventForm">
            <h4>Create an Event</h4>
            <div className="form-group">
              <input type="text" className="form-control" id="eventName" placeholder="Enter a name" />

            </div>
            <div className="form-group">
              <input type="date" className="form-control" id="date" placeholder="When?" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="where" placeholder="Where?" />
            </div>
            <button type="submit" className="btn  btn-success">Create event</button>
          </form>

          <form className="postForm" onSubmit={this.insertPosts}>
            <h4>Create a post</h4>
            <div className="form-group">
              <input type="text" className="form-control input-lg" id="post" placeholder="What's up?" />

            </div>
            <button type="submit" className="btn btn-success">Post</button>
          </form>

          <div className="map">
            <EventLocator/>
          </div>

          {postsToDisplay}
        </div>
      </div>
    );
  }
}

TutorDashboard.propTypes = {
  user: React.PropTypes.object,
};
