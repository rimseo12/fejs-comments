import Comments from './Comments.js';
import { validation } from './validation.js';
import dummyComments from './data/dummyComments.js';

export default function App($app, user) {
  this.state = {
    comments: [],
  };

  const init = () => {
    this.setState({
      ...this.state,  
    });

    const comments = dummyComments;
    
    this.setState({
      ...this.state,
      comments
    });
  };

  const commentList = new Comments({
    $app,
    user,
    initialState: {
      comments: [],
    },
    onSubmit: (commentText) => {
      validation({ commentText, user });
      this.setState({
        ...this.state,
        comments: [
          ...this.state.comments,
          {
            id: this.state.comments.length+1,
            text: commentText,
            user: user,
          },
        ], 
      });
    },
    onRemove: (id) => {
      this.setState({
        comments: [
          ...this.state.comments.slice(0, id),
          ...this.state.comments.slice(id+1)
        ],
      });
      init();
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    
    commentList.setState({
      comments: this.state.comments, 
    });
  };

  init();
};
