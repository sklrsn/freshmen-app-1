import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../BaseComponent.jsx';
import CommentSection from '../comment-section/CommentSection.jsx';
import { displayError } from '../../helpers/errors.js';
import { Modal, Button } from 'react-bootstrap';
import Event from './Event.jsx';
import Task from './Task.jsx';
import {
  remove
} from '../../../api/posts/methods.js';

export default class Post extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {
      showDeleteModal: false
    });
    this.deletePost = this.deletePost.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
  }

  showDeleteModal() {
    this.setState({showDeleteModal: true});
  }

  hideDeleteModal() {
    this.setState({showDeleteModal: false});
  }
  deletePost() {
    remove.call({_id: this.props.post._id}, (err, res) => {
      if (err) {
        displayError(err);
      }

      toastr.success('Post has been removed', 'Success');
    });
  }

  render() {
    const { post } = this.props;
    //TODO: improve populating creator later
    //read more: collection-helpers and publishComposite
    const creator = Meteor.users.findOne(post.creator);
    const createdAt = new Date(post.createdAt);
    const creatorProfile = "/profile/" + creator._id;

    if (post.type==="simple" || post.type==="task"){
    return (
      <div className="posts">
        <div className="post-header">
          <div className="avatar">
            <a href={creatorProfile}><img className="img-responsive img-circle" src={creator.profile.photo}/></a>
          </div>
          <a href={creatorProfile}><div className="user-info">
            {creator.profile.name}
            <p id="date">on {createdAt.toUTCString()}</p>
          </div></a>

          { Meteor.userId() === post.creator
            ? <i className="icon-close pull-right" onClick={this.showDeleteModal}></i>
            : '' }

        </div>

        <div className="post-body">
          {this.props.post.text}
        </div>
        <hr></hr>
        <div className="post-footer">
          <CommentSection post={this.props.post}/>
        </div>

        <Modal
          show={this.state.showDeleteModal}
          onHide={this.hideDeleteModal}>

          <Modal.Header closeButton>
            <Modal.Title>Delete post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete this post? This action cannot be undone.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hideDeleteModal}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.deletePost}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  else if (post.type==="event"){
    return <Event event={post}/>;
  }

  }
}

Post.propTypes = {
  post: React.PropTypes.object
};
