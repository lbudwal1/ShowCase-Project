import { mergeMap, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StateObservable, ActionsObservable, Epic } from "redux-observable";
import { IStore } from "../reducers";
import { withJsonContentType } from "../epicUtils";
import { EpicDependencies } from "../store";
import { END_POINTS } from "../endpoints";
import { ById, LaunchCodeApiResponse } from "../../reactComponents/shared/publicInterfaces";
import { IAirportResponse, IAIRPORT_REQUEST } from "./airportConstants";
import { IAirportLoadAction, IAirportLoadFailedAction, IAirportSuccessAction, airportLoadFailedAction, airportLoadSuccessAction } from "./airportActions";

export const airportEpic: Epic = (
    action$: ActionsObservable<IAirportLoadAction>,
    store: StateObservable<IStore>,
    {post}: EpicDependencies
): Observable<IAirportSuccessAction | IAirportLoadFailedAction> =>
    action$.ofType(IAIRPORT_REQUEST.REQUEST)
        .pipe(
            mergeMap((action) =>
                post<LaunchCodeApiResponse<ById<IAirportResponse>>>(
                    END_POINTS.AIRPORTS.AIRPORT_LIST,
                    action.data,
                    withJsonContentType(store.value)
                )
                    .pipe(
                        map((response: LaunchCodeApiResponse<ById<IAirportResponse>>): IAirportSuccessAction => {
                            return airportLoadSuccessAction(response.objectsArray);
                        }),
                        catchError(() => ActionsObservable.of(airportLoadFailedAction()))
                    )
            )
        );