interface DefaultDataFetchObject<T = {}, E = {}> {
  loading: boolean;
  data: any;
  error: unknown;
}

class AjaxUtil {
  constructor() {}

  init(data: { [key: string]: any } | null = null): DefaultDataFetchObject {
    return {
      loading: false,
      data,
      error: null,
    };
  }

  pending(prevState = null): DefaultDataFetchObject {
    return {
      loading: true,
      data: prevState,
      error: null,
    };
  }

  success(data: { [key: string]: any } | null): DefaultDataFetchObject {
    return {
      loading: false,
      data,
      error: null,
    };
  }

  error(error: unknown): DefaultDataFetchObject {
    return {
      loading: false,
      data: null,
      error,
    };
  }

  fetchAndWait(store: any, actionCreator: any) {
    return new Promise((resolve) => {
      store.dispatch(actionCreator);
      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        unsubscribe();
        return resolve(state);
      });
    });
  }
}

export default new AjaxUtil();
