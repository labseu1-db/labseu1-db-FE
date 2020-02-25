export const user = { fullName: 'Thorben', userEmail: 'thorben@gmail.com' };
export const orgs = [{ id: 2 }, { id: 284 }];
export const org = { orgName: 'test org', isPremium: false };
export const heading = 'Test';
export const info = 'This is a test';
export const commentBody = 'This is a test comment';
export const arrayOfUsersWhoLiked = [23, 385, 2845, 38385];
export const commentCreatedAt = 1558373067909;
export const commentCreatedByUserId = 32;
export const commentCreatedByUserName = 'test operator';
export const commentUpdatedAt = 1558374066638;
export const commentIsDecided = false;
export const commentIsUpdated = true;
export const orgId = 2435;
export const threadId = 284895;
export const threadName = 'Test Thread';
export const fullName = 'Test';
export const text = 'This is a test text';
export const users = [
  { fullName: 'Test', id: 383 },
  { fullName: 'test 2', id: 38 }
];
export const userArray = [385, 8549684, 48956486, 945849];
export const shoudlBeOpen = true;
export const spaces = [{ orgId: '22' }, { orgId: '22' }, { orgId: '22' }];
export const space = { arrayOfUserIdsInSpace: userArray, spaceName: fullName };
export const teamEmailAddress = [
  'test1@gmail.com',
  'test2@gmail.com',
  'test3@gmail.com',
  'test4@gmail.com'
];
export const threads = [
  {
    id: 22,
    threadName: 'test',
    whenUserHasSeen: 30545894,
    threadTopic: 'Testing',
    lastCommentCreatedAt: 30548594,
    spaceId: 389548594594
  }
];
export const topic = 'Testing';
export const match = {
  params: { id: '22' },
  path: '/mainscreen/:id'
};
export const showModal = function() {
  console.log('Test');
};
export const firestore = {
  add: function() {
    console.log('Test run');
  },
  collection: function(data) {
    return {
      doc: function() {
        return {
          update: function() {
            console.log('Should update');
          }
        };
      }
    };
  }
};
export const auth = {};
export const firebase = {
  auth: function() {
    return {
      isSignInWithEmailLink: function() {
        console.log('Test');
      }
    };
  }
};
export const history = {
  goBack: function() {
    console.log('Go Back test');
  }
};
export const comments = [{ arrayOfUserIdsWhoLiked: userArray, id: '22' }];
