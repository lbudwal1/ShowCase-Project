import { mergeMap, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StateObservable, ActionsObservable, Epic } from "redux-observable";
import { IStore } from "../reducers";
import { withJsonContentType } from "../epicUtils";
import { EpicDependencies } from "../store";
import { END_POINTS } from "../endpoints";
import { ById, LaunchCodeApiResponse } from "../../reactComponents/shared/publicInterfaces";
import { IQuoteResponse, IQUOTE_REQUEST } from "./quoteConstants";
import { IQuoteLoadAction, IQuoteLoadFailedAction, IQuoteSuccessAction, quoteLoadFailedAction, quoteLoadSuccessAction } from "./quoteActions";

export const quoteEpic: Epic = (
    action$: ActionsObservable<IQuoteLoadAction>,
    store: StateObservable<IStore>,
    {post}: EpicDependencies
): Observable<IQuoteSuccessAction | IQuoteLoadFailedAction> =>
    action$.ofType(IQUOTE_REQUEST.REQUEST)
        .pipe(
            mergeMap((action) =>
                post<LaunchCodeApiResponse<ById<IQuoteResponse>>>(
                    END_POINTS.Quotes.QUOTE_LIST,
                    action.data,
                    withJsonContentType(store.value)
                )
                    .pipe(
                        map((response: LaunchCodeApiResponse<ById<IQuoteResponse>>): IQuoteSuccessAction => {
                            return quoteLoadSuccessAction(response);
                        }),
                        catchError(() => ActionsObservable.of(quoteLoadFailedAction("Unable to load quotes")))
                    )
            )
        );