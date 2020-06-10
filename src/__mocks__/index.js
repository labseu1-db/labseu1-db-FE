// Data
export const space = {
  spaceName: 'Test 1',
  arrayOfUserIdsInSpace: [24, 305, 348, 849084]
};
export const spaces = [{ spaceName: 'Test 1' }, { spaceName: 'Test 2' }];
const orgs = [{ orgName: 'Org 1' }, { orgName: 'Org 2' }];
const users = [{ fullName: 'Thorben' }, { fullName: 'Sam' }];
const user = { fullName: 'Thorben' };
const org = { id: 22, createdByUserId: null };
const threads = [
  {
    threadName: 'Thread 1',
    whenUserHasSeen: { null: 22 },
    threadTopic: 'Testing 1'
  },
  {
    threadName: 'Thread 2',
    whenUserHasSeen: { null: 23 },
    threadTopic: 'Testing 2'
  }
];

export const arrayOfUsersWhoLiked = [22, 359, 3959, 9459];
export const teamEmailAddress = [
  'test1@gmail.com',
  'test2@gmail.com',
  'test3@gmail.com'
];
export const isOpen = true;
export const emptyModal = '';
export const newSpaceModal = 'CreateSpaceModal';
export const error = false;
export const match = { params: { id: 22 } };
export const comment = { content: 'Hello', id: 22 };
export const comments = [{ content: 'Hello', id: 22 }];
export const resetPasswordStatusFalse = false;
export const resetPasswordStatusTrue = true;

export const history = { goBack: () => {}, redirect: () => {} };
export const firebase = {
  auth: () => {
    return {
      signInWithEmailLink: () => {
        return { catch: () => {} };
      }
    };
  }
};

export const setModal = () => {};
export const closeModal = () => {};
export const redirect = () => {};
export const setError = () => {};
export const isLoggedIn = () => {};
export const loadingFalse = false;
export const loadingTrue = true;
export const useMountEffect = callFunction => callFunction;
export const getUserDataRealTime = setData => () => setData(user);
export const getSpacesWithOrg = (setData, orgId) => () => setData(spaces);
export const getOrgWithUuid = (setData, uuid) => () => setData(orgs);
export const getUsersFromOrg = (setData, orgId) => () => setData(users);
export const getThreadsWithOrg = (setData, orgId) => () => setData(threads);
export const getSpaceWithId = (setData, spaceId) => () => setData(space);
export const getThreadsWithSpace = (setData, spaceId) => () => setData(threads);
export const updateDataWithDoc = () => {};
export const getCommentsWithThread = (setData, threadId) => () => setData([]);
export const getThreadWithId = (setData, threadId) => () => setData();
export const getOrgWithId = (setData, uuid) => () => setData(org);
