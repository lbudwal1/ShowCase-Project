import { mergeMap, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StateObservable, ActionsObservable, Epic } from "redux-observable";
import { IStore } from "../reducers";
import { withJsonContentType } from "../epicUtils";
import { EpicDependencies } from "../store";
import { END_POINTS } from "../endpoints";
import { ById, LaunchCodeApiResponse } from "../../reactComponents/shared/publicInterfaces";
import { IPatient, ICUSTOMER_REQUEST } from "./customerConstants";
import { ICustomerLoadAction, ICustomerLoadFailedAction, ICustomerSuccessAction, customerLoadFailedAction, customerLoadSuccessAction } from "./customerActions";

export const customerEpic: Epic = (
    action$: ActionsObservable<ICustomerLoadAction>,
    store: StateObservable<IStore>,
    {post}: EpicDependencies
): Observable<ICustomerSuccessAction | ICustomerLoadFailedAction> =>
    action$.ofType(ICUSTOMER_REQUEST.REQUEST)
        .pipe(
            mergeMap((action) =>
                post<LaunchCodeApiResponse<ById<IPatient>>>(
                    END_POINTS.Customers.CUSTOMER_LIST,
                    action.data,
                    withJsonContentType(store.value)
                )
                    .pipe(
                        map((response: LaunchCodeApiResponse<ById<IPatient>>): ICustomerSuccessAction => {
                            return customerLoadSuccessAction(response);
                        }),
                        catchError(() => ActionsObservable.of(customerLoadFailedAction("Unable to load customers")))
                    )
            )
        );