import { mergeMap, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StateObservable, ActionsObservable, Epic } from "redux-observable";
import { IStore } from "../reducers";
import { withJsonContentType } from "../epicUtils";
import { EpicDependencies } from "../store";
import { END_POINTS } from "../endpoints";
import { ById, LaunchCodeApiResponse } from "../../reactComponents/shared/publicInterfaces";
import { ITransportationResponse, ITRANSPORTATION_REQUEST } from "./transportationConstants";
import { ITransportationLoadAction, ITransportationLoadFailedAction, ITransportationSuccessAction, transportationLoadFailedAction, transportationLoadSuccessAction } from "./transportationActions";

export const transportationEpic: Epic = (
    action$: ActionsObservable<ITransportationLoadAction>,
    store: StateObservable<IStore>,
    {post}: EpicDependencies
): Observable<ITransportationSuccessAction | ITransportationLoadFailedAction> =>
    action$.ofType(ITRANSPORTATION_REQUEST.REQUEST)
        .pipe(
            mergeMap((action) =>
                post<LaunchCodeApiResponse<ById<ITransportationResponse>>>(
                    END_POINTS.Customers.TRANSPORTATION,
                    withJsonContentType(store.value)
                )
                    .pipe(
                        map((response: LaunchCodeApiResponse<ById<ITransportationResponse>>): ITransportationSuccessAction => {
                            return transportationLoadSuccessAction(response.objectsArray);
                        }),
                        catchError(() => ActionsObservable.of(transportationLoadFailedAction("Unable to load transportations")))
                    )
            )
        );