import { mergeMap, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StateObservable, ActionsObservable, Epic } from "redux-observable";
import { IStore } from "../../reducers";
import { withJsonContentType } from "../../epicUtils";
import { EpicDependencies } from "../../store";
import { END_POINTS } from "../../endpoints";
import { ById, LaunchCodeApiResponse } from "../../../reactComponents/shared/publicInterfaces";
import { IADD_CUSTOMER_REQUEST } from "./addCustomerConstants";
import { IAddCustomerLoadAction, IAddCustomerLoadFailedAction, IAddCustomerSuccessAction, addCustomerLoadFailedAction, addCustomerLoadSuccessAction } from "./addCustomerActions";
import { ICustomerResponse } from "../customerConstants";

export const addCustomerEpic: Epic = (
    action$: ActionsObservable<IAddCustomerLoadAction>,
    store: StateObservable<IStore>,
    {post}: EpicDependencies
): Observable<IAddCustomerSuccessAction | IAddCustomerLoadFailedAction> =>
    action$.ofType(IADD_CUSTOMER_REQUEST.REQUEST)
        .pipe(
            mergeMap((action) =>
                post<LaunchCodeApiResponse<ById<ICustomerResponse>>>(
                    END_POINTS.Customers.ADD_CUSTOMER,
                    action.data,
                    withJsonContentType(store.value)
                )
                    .pipe(
                        map((response: LaunchCodeApiResponse<ById<ICustomerResponse>>): IAddCustomerSuccessAction => {
                            return addCustomerLoadSuccessAction(response.message);
                        }),
                        catchError(() => ActionsObservable.of(addCustomerLoadFailedAction("Unable to load addCustomers")))
                    )
            )
        );