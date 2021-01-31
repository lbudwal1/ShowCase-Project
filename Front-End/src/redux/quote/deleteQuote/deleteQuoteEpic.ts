import { mergeMap, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StateObservable, ActionsObservable, Epic } from "redux-observable";
import { IStore } from "../../reducers";
import { withJsonContentType } from "../../epicUtils";
import { EpicDependencies } from "../../store";
import { END_POINTS } from "../../endpoints";
import { IDELETE_QUOTE_REQUEST } from "./deleteQuoteConstants";
import { IDeleteQuoteLoadAction, IDeleteQuoteLoadFailedAction, IDeleteQuoteSuccessAction, deleteQuoteLoadFailedAction, deleteQuoteLoadSuccessAction } from "./deleteQuoteActions";
import { LaunchCodeApiResponse } from "../../../reactComponents/shared/publicInterfaces";

export const deleteQuoteEpic: Epic = (
    action$: ActionsObservable<IDeleteQuoteLoadAction>,
    store: StateObservable<IStore>,
    {post}: EpicDependencies
): Observable<IDeleteQuoteSuccessAction | IDeleteQuoteLoadFailedAction> =>
    action$.ofType(IDELETE_QUOTE_REQUEST.REQUEST)
        .pipe(
            mergeMap((action) =>
                post<LaunchCodeApiResponse<string>>(
                    END_POINTS.Quotes.DELETE_QUOTE,
                    action.data,
                    withJsonContentType(store.value)
                )
                    .pipe(
                        map((response: LaunchCodeApiResponse<string>): IDeleteQuoteSuccessAction => {
                            return deleteQuoteLoadSuccessAction(action.data);
                        }),
                        catchError(() => ActionsObservable.of(deleteQuoteLoadFailedAction()))
                    )
            )
        );