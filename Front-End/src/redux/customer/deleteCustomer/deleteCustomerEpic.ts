import { mergeMap, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StateObservable, ActionsObservable, Epic } from "redux-observable";
import { IStore } from "../../reducers";
import { withJsonContentType } from "../../epicUtils";
import { EpicDependencies } from "../../store";
import { END_POINTS } from "../../endpoints";
import { IDELETE_CUSTOMER_REQUEST } from "./deleteCustomerConstants";
import { IDeleteCustomerLoadAction, IDeleteCustomerLoadFailedAction, IDeleteCustomerSuccessAction, deleteCustomerLoadFailedAction, deleteCustomerLoadSuccessAction } from "./deleteCustomerActions";
import { LaunchCodeApiResponse } from "../../../reactComponents/shared/publicInterfaces";

export const deleteCustomerEpic: Epic = (
    action$: ActionsObservable<IDeleteCustomerLoadAction>,
    store: StateObservable<IStore>,
    {post}: EpicDependencies
): Observable<IDeleteCustomerSuccessAction | IDeleteCustomerLoadFailedAction> =>
    action$.ofType(IDELETE_CUSTOMER_REQUEST.REQUEST)
        .pipe(
            mergeMap((action) =>
                post<LaunchCodeApiResponse<string>>(
                    END_POINTS.Customers.DELETE_CUSTOMER,
                    action.data,
                    withJsonContentType(store.value)
                )
                    .pipe(
                        map((response: LaunchCodeApiResponse<string>): IDeleteCustomerSuccessAction => {
                            return deleteCustomerLoadSuccessAction(action.data);
                        }),
                        catchError(() => ActionsObservable.of(deleteCustomerLoadFailedAction()))
                    )
            )
        );