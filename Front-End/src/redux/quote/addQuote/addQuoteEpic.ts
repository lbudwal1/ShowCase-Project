import { mergeMap, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StateObservable, ActionsObservable, Epic } from "redux-observable";
import { IStore } from "../../reducers";
import { withJsonContentType } from "../../epicUtils";
import { EpicDependencies } from "../../store";
import { END_POINTS } from "../../endpoints";
import { ById, LaunchCodeApiResponse } from "../../../reactComponents/shared/publicInterfaces";
import { IADD_QUOTE_REQUEST } from "./addQuoteConstants";
import { IAddQuoteLoadAction, IAddQuoteLoadFailedAction, IAddQuoteSuccessAction, addQuoteLoadFailedAction, addQuoteLoadSuccessAction } from "./addQuoteActions";
import { IQuoteResponse } from "../quoteConstants";

export const addQuoteEpic: Epic = (
    action$: ActionsObservable<IAddQuoteLoadAction>,
    store: StateObservable<IStore>,
    {post}: EpicDependencies
): Observable<IAddQuoteSuccessAction | IAddQuoteLoadFailedAction> =>
    action$.ofType(IADD_QUOTE_REQUEST.REQUEST)
        .pipe(
            mergeMap((action) =>
                post<LaunchCodeApiResponse<ById<IQuoteResponse>>>(
                    END_POINTS.Quotes.ADD_QUOTE,
                    action.data,
                    withJsonContentType(store.value)
                )
                    .pipe(
                        map((response: LaunchCodeApiResponse<ById<IQuoteResponse>>): IAddQuoteSuccessAction => {
                            return addQuoteLoadSuccessAction(response.message);
                        }),
                        catchError(() => ActionsObservable.of(addQuoteLoadFailedAction("Unable to load addQuotes")))
                    )
            )
        );