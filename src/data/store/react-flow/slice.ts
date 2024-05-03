
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TypeEdges } from 'components/common/react-flows/constants/enum';

import { SetReactFlowPayload,StateReactFlow, UpdateReactFlowPayload  } from './interface';



const initialState: StateReactFlow = {
  data: [],
}

export const reactFlowSlice = createSlice({
  name: 'reactFlow',
  initialState,
  reducers: {
    getList: (state) => {
      return state;
    },
    setData: (state:any, action: PayloadAction<SetReactFlowPayload>) => {
        return { ...state, data: action.payload.data };
    },
    updateEdges: (state:StateReactFlow , action: PayloadAction<SetReactFlowPayload>) => {
        const { id, targetId, type } = action.payload.data;
            const temp = state?.data.map((item: any) => {
                if (item.id === id) {
                    if (type === TypeEdges.SuccessEdge) {
                        item.successId = targetId;
                    } else if (type === TypeEdges.FailedEdge) {
                        item.failedId = targetId;
                    }
                }

                return item;
            });

            return { ...state, data: temp };
    },
    updateReactFlows: (state:StateReactFlow , action: PayloadAction<UpdateReactFlowPayload>) => {
      return state;
    }
  }
})

export const { setData, updateEdges } = reactFlowSlice.actions



