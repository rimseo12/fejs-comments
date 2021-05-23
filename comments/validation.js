import banned from './data/banned.js';
import dummyComments from './data/dummyComments.js';
/* 
 * @function validation
 * @author HyunSeorim
 * @description
 **댓글 빈값 확인
 **댓글 금지어 확인
 **댓글 도배 방지
*/
export function validation({ commentText, user }) {
  const $notice = document.querySelector('.notice');  
  if (commentText.trim() === '') {
    $notice.innerHTML = 'Text is empty!';
    throw new Error('Text is empty');
  } else {
    $notice.innerHTML = '';
  }

  let countBanned = 0;
  banned.map((word) => {
    if (`/${word}/`.match(commentText) !== null) {
      countBanned += 1;
    }
  });
  if (countBanned > 0) {
    $notice.innerHTML = 'You cannot use inappropriate words.';
    throw new Error('You cannot use inappropriate words.');
  } else {
    $notice.innerHTML = '';
  }

  let countUser = 0 ;
  const validateUsers = document.querySelectorAll('strong');
  for (let i = 0; i< dummyComments.length; i++) {
    if (dummyComments[i].user === user) {
      countUser += 1;
    } 
  };
  for (let j = 0; j < validateUsers.length; j++) {
    if (validateUsers[j].innerHTML === user) {
      countUser += 1;
    }
  };
  if (countUser > 3 ) {
    $notice.innerHTML = 'Sorry, There is a restriction on use.';
    throw new Error('Sorry, There is a restriction on use.');
  } else {
    $notice.innerHTML = '';
  }
};
