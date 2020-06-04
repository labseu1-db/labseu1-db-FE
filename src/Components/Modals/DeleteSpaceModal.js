import React, { useContext } from 'react';
import { Modal } from 'semantic-ui-react';

// import Context API
import Context from '../ContextProvider/Context';

//Styled components
import styled from 'styled-components';

const DeleteSpaceModal = props => {
  // use Context API
  const {
    updateDataWithDoc,
    deleteData,
    firebase,
    db,
    closeModal,
    redirect
  } = useContext(Context);

  const removeSpaceFromUsersAndDeleteSpace = () => {
    props.space.arrayOfUserIdsInSpace.forEach(id => {
      let request = {
        collection: 'users',
        docId: id,
        data: {
          arrayOfSpaceIds: firebase.firestore.FieldValue.arrayRemove(
            props.space.id
          ),
          arrayOfSpaceNames: firebase.firestore.FieldValue.arrayRemove(
            props.space.spaceName
          )
        }
      };
      updateDataWithDoc(request)
        .then(res => {
          props.threads.forEach(t => {
            let request = {
              collection: 'threads',
              docId: t.id
            };
            deleteData(request).then(res => {
              const ref = db
                .collection('comments')
                .where('threadId', '==', t.id);
              ref.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  doc.ref.delete();
                });
              });
            });
          });
        })
        .then(res => {
          let request = {
            collection: 'spaces',
            docId: props.space.id
          };
          deleteData(request);
        })
        .then(() => {
          redirect(`/mainscreen/${props.match.params.id}`);
        });
    });
  };

  return (
    <Modal open={props.shoudlBeOpen} size="small" aria-label="DeleteSpaceModal">
      <StyledContainer>
        <Modal.Header>
          <div>
            <StyledMainHeader>
              Are you really really sure that you want to delete space{' '}
              <strong>{props.space.spaceName}</strong>?
            </StyledMainHeader>
          </div>

          <Modal.Actions>
            <StyledActions>
              <StyledButtonCancel
                onClick={() => {
                  closeModal();
                }}
              >
                Cancel
              </StyledButtonCancel>

              <StyledButtonCreateSpace
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  removeSpaceFromUsersAndDeleteSpace();
                  closeModal();
                }}
              >
                Delete Space
              </StyledButtonCreateSpace>
            </StyledActions>
          </Modal.Actions>
        </Modal.Header>
      </StyledContainer>
    </Modal>
  );
};

//Styled Components
export default DeleteSpaceModal;

const StyledContainer = styled.div`
  padding: 40px;
  border-radius: 6px;
  position: relative;
`;
const StyledButtonCancel = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: #00bc98;
  border-radius: 15px;
  background-color: white;
  border: 1px solid #00bc98;
  margin-right: 10px;
`;
const StyledButtonCreateSpace = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: white;
  border: 1px solid #00bc98;
  border-radius: 15px;
  outline: none;
  background-color: #00bc98;
  &:disabled {
    background-color: #00bc9880;
    border: none;
  }
`;

const StyledMainHeader = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgb(55, 71, 80);
  font-family: 'Open Sans', sans-serif;
  padding-bottom: 30px;
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;
