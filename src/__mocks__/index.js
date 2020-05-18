// Data
const spaces = [{ spaceName: 'Test 1' }, { spaceName: 'Test 2' }];
const orgs = [{ orgName: 'Org 1' }, { orgName: 'Org 2' }];
const users = [{ fullName: 'Thorben' }, { fullName: 'Sam' }];
const user = { fullName: 'Thorben' };
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
