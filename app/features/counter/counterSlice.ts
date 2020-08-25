import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import { CredentialsStore } from '../../db/stores/credentials';
import { Credentials } from '../../db/schemas/credentials';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export const incrementIfOdd = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.counter.value % 2 === 0) {
      return;
    }
    dispatch(increment());
  };
};

export const incrementAsync = (delay = 1000): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};

export default counterSlice.reducer;

export const selectCount = (state: RootState) => state.counter.value;

export const savePassword = async (
  username: string,
  password: string,
  brandName: string
): Promise<Credentials> => {
  const db = new CredentialsStore();

  const pelotonQuery = {
    type: 'credentials',
    'properties.provider': brandName,
  };
  const pelotonUpdateQuery = {
    type: 'credentials',
    properties: { provider: brandName, username: username, password: password },
  };

  return await db
    .upsert(pelotonQuery, pelotonUpdateQuery)
    .then(async () => await db.getCredentialsByProvider(brandName));
};
