import { mergeMap, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StateObservable, ActionsObservable, Epic } from "redux-observable";
import { IStore } from "../../reducers";
import { withJsonContentType } from "../../epicUtils";
import { EpicDependencies } from "../../store";
import { END_POINTS } from "../../endpoints";
import { LaunchCodeApiResponse } from "../../../reactComponents/shared/publicInterfaces";
import { IEDIT_CUSTOMER_REQUEST } from "./editCustomerConstants";
import { IEditCustomerLoadAction, IEditCustomerLoadFailedAction, IEditCustomerSuccessAction, editCustomerLoadFailedAction, editCustomerLoadSuccessAction } from "./editCustomerActions";

export const editCustomerEpic: Epic = (
    action$: ActionsObservable<IEditCustomerLoadAction>,
    store: StateObservable<IStore>,
    {post}: EpicDependencies
): Observable<IEditCustomerSuccessAction | IEditCustomerLoadFailedAction> =>
    action$.ofType(IEDIT_CUSTOMER_REQUEST.REQUEST)
        .pipe(
            mergeMap((action) =>
                post<LaunchCodeApiResponse<string>>(
                    END_POINTS.Customers.EDIT_CUSTOMER,
                    action.data,
                    withJsonContentType(store.value)
                )
                    .pipe(
                        map((response: LaunchCodeApiResponse<string>): IEditCustomerSuccessAction => {
                            return editCustomerLoadSuccessAction(action.data);
                        }),
                        catchError(() => ActionsObservable.of(editCustomerLoadFailedAction("Unable to load editCustomers")))
                    )
            )
        );