import { LOGIN_STORAGE_KEY } from './index.js';
/* 
 * @function Comments
 * @author HyunSeorim
 * @description
***로그인 상태가 아닌데 댓글 등록할 경우, SNS 로그인 하기로 보여주기
***댓글 등록 기능
***댓글 좋아요, 싫어요 기능
***댓글 삭제 기능
***댓글 수정 기능
***댓글 조회해서 렌더링하기
*/
export default function Comments({ $app, user, initialState, onSubmit, onRemove }) {
  this.$target = document.createElement('div');
  this.$target.className = "comments";
  $app.appendChild(this.$target);

  this.$commentButton = document.querySelector('#addCommentButton');
  this.$socialButton = document.querySelector('.social');

  this.state = initialState || {
    comments: [],
  };

  $app.addEventListener('click', (e) => {
    const $input = document.querySelector('#comment-input');
    if (e.target.id === 'addCommentButton') {
      if (user.length > 0) {
        onSubmit($input.value);
        $input.value = '';
      } else {
        document.querySelector('.social-card').className = 'social-card show';
      }
    }

    if (e.target.className === 'social') {
      localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify('seorim'));
      document.querySelector('.social-card.show').className = 'social-card';
      alert ('Welcome, you are now logged in');
    }
    if (e.target.className.indexOf('btn--icon-like') === 0) {
      e.target.parentNode.classList.toggle('liked');
    } else if (e.target.className.indexOf('btn--icon-dislike') === 0) {
      e.target.parentNode.classList.toggle('disliked');
    }

    if (e.target.className === 'btn-delete') {
      const id = e.target.closest('li').id;
      onRemove(id);
    }

    const addButton = document.querySelector('#addCommentButton');
    const editButton =  document.querySelector('#editCommentButton');
    const cancelButton = document.querySelector('#cancelCommentButton');
    if (e.target.className === 'btn-edit') {
      const id = e.target.closest('li').id;
      $input.value = document.querySelectorAll('li .comment-text')[id-1].innerHTML;
      addButton.style.display = 'none';
      editButton.style.display = 'block';
      editButton.className = id;
      cancelButton.style.display = 'block';
    }
    if (e.target.id === 'editCommentButton') {
      onRemove(editButton.className);
      onSubmit($input.value);
      $input.value = '';
      addButton.style.display = 'block';
      editButton.style.display = 'none';
      cancelButton.style.display = 'none';
    }
    if (e.target.id === 'cancelCommentButton') {
      $input.value = '';
      addButton.style.display = 'block';
      editButton.style.display = 'none';
      cancelButton.style.display = 'none';
    }
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { comments } = this.state;
    const htmlString = comments.map((comment) => {
      return `<li id="${comment.id}">
        <strong>${comment.user}</strong>
        <span class="comment-text">${comment.text}</span>
        <span class="btn-like">
          <span class="btn--icon-like">
            <i class="fas fa-thumbs-up"></i>like
          </span>
        </span>
        <span class="btn-dislike"> 
          <span class="btn--icon-dislike">
            <i class="fas fa-thumbs-down"></i>dislike
          </span>
        </span>
        ${comment.user === user? 
          `<span class="btn-delete"><i class="fas fa-trash"></i>delete</span> 
           <span class="btn-edit"><i class="fas fa-edit"></i>edit</span>`: ''}
      </li>`
    });
    this.$target.innerHTML = `<ul>${htmlString.join('')}</ul>`;
  };
  this.render();
};
