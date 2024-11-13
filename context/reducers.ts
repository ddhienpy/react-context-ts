export type KOL = {
  id: string;
  name: string;
}

type ActionMap<M extends Record<string, any>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

export enum Types {
  AddKol = 'ADD_KOL',
  SetKols = 'SET_KOLS',
  DeleteKol = 'DELETE_KOL',
}

// KOLs
type KolPayload = {
  [Types.AddKol]: KOL;
  [Types.SetKols]: KOL[];
  [Types.DeleteKol]: string;
}

export type KolsActions = ActionMap<KolPayload>[keyof ActionMap<KolPayload>];

export const kolsReducer = (state: KOL[], action: KolsActions) => {
  switch (action.type) {
    case Types.AddKol: {
      const newState = [...state.filter(item => item.id !== action.payload.id), action.payload];
      localStorage.setItem("kols-cart", JSON.stringify(newState));
      return [...newState];
    }
    case Types.SetKols: {
      const newState = [...action.payload];
      localStorage.setItem("kols-cart", JSON.stringify(newState));
      return [...newState];
    }
    case Types.DeleteKol: {
      const newState = [...state.filter(item => item.id !== action.payload)];
      localStorage.setItem("kols-cart", JSON.stringify(newState));
      return [...newState];
    }
    default:
      return state;
  }
}
